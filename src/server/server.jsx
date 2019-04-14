/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import serialize from 'serialize-javascript';
import { collectInitial } from 'node-style-loader/collect';
import { initializeAppStore, AppRoot } from '../app/components/aeroheim';
import { blogRouter } from './api/blog';
import { loggerMiddleware } from './logger';
import webpackAppConfig from '../../webpack.app';
import initializeDatabase from './database';

const PORT = process.env.port || 8080;
const initialStyles = collectInitial();
global.__SERVER__ = true;
global.__SERVER_URL__ = `http://localhost:${PORT}`;

const App = ({ store, location }) => (
  <Provider store={store}>
    <StaticRouter location={location} context={{}}>
      <AppRoot />
    </StaticRouter>
  </Provider>
);

async function render(req, res) {
  const store = initializeAppStore();

  // initial render + collect pending requests.
  let renderedApp = renderToString(<App store={store} location={req.url} />);
  await Promise.all(store.getState().ssr.requests);

  // render again after resolving all requests.
  renderedApp = renderToString(<App store={store} location={req.url} />);
  const helmet = Helmet.renderStatic();

  res.send(`
    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>aeroheim</title>
      ${initialStyles}
      ${helmet.meta.toString()}
      <link rel="icon" type="image/png" href="/favicon-16x16.png" size="16x16">
      <link rel="icon" type="image/png" href="/favicon-32x32.png" size="32x32">
      <link rel="icon" type="image/png" href="/favicon-96x96.png" size="96x96">
      <link rel="icon" type="image/png" href="/favicon-512x512.png" size="512x512">
    </head>
    <body>
      <div id="root" class="root">${renderedApp}</div>
    </body>
      <script>
          window.__INITIAL_STATE__ = ${serialize(store.getState())}
      </script>
      <script src="/app.js"></script>
    </html>
  `);
}

function listen(port) {
  const db = initializeDatabase();
  const app = express();
  app.locals.db = db;
  app.use(loggerMiddleware);
  app.get('*.js', (req, res, next) => {
    req.url += '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    next();
  });
  app.use(express.static(__dirname));
  app.use(blogRouter);
  app.get('/favicon*', (req, res) => res.sendFile(path.join(__dirname, '..', 'src', req.path)));
  app.use(render);
  app.listen(port);
}

function webpackDevServerListen(port, proxyPort) {
  const webpackAppDevConfig = webpackAppConfig('dev');

  // proxy all webpack-dev-server requests to the server
  const webpackDevServerOptions = {
    contentBase: './dist',
    hot: true,
    host: 'localhost',
    proxy: { '*': `http://localhost:${proxyPort}` },
  };

  // see https://webpack.js.org/guides/hot-module-replacement/
  WebpackDevServer.addDevServerEntrypoints(webpackAppDevConfig, webpackDevServerOptions);
  new WebpackDevServer(webpack(webpackAppDevConfig), webpackDevServerOptions).listen(port, 'localhost');
}

if (process.env.NODE_ENV === 'production') {
  listen(PORT);
} else {
  listen(PORT - 1);
  webpackDevServerListen(PORT, PORT - 1);
}
