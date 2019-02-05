/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import path from 'path';
import fs from 'fs';
import Datastore from 'nedb';
import chokidar from 'chokidar';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import serialize from 'serialize-javascript';
import { collectInitial } from 'node-style-loader/collect';
import initializeAppStore from '../app/app';
import { AppRoot } from '../app/components/aeroheim';
import { blogRouter, blogStorePath } from './api/blog';
import logger from './logger';
import webpackAppConfig from '../../webpack.app.config';

const initialStyles = collectInitial();

function logError(err, msg) {
  if (err) {
    logger.log('error', msg);
  }
}

function render(req, res) {
  const store = initializeAppStore();
  const routerContext = {};
  const app = (
    <Provider store={store}>
      <StaticRouter location={req.url} context={routerContext}>
        <AppRoot />
      </StaticRouter>
    </Provider>
  );

  res.send(`
    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>aeroheim</title>
      ${initialStyles}
      <link rel="stylesheet" href="/index.css"/>
      <link rel="icon" type="image/png" href="/favicon-16x16.png" size="16x16">
      <link rel="icon" type="image/png" href="/favicon-32x32.png" size="32x32">
      <link rel="icon" type="image/png" href="/favicon-96x96.png" size="96x96">
    </head>
    <body>
      <div id="root" class="root">${renderToString(app)}</div>
    </body>
      <script>
          window.__INITIAL_STATE__ = ${serialize(store.getState())}
      </script>
      <script src="/app.js"></script>
    </html>
  `);
}

function initializeDatabaseStore(store, storePath) {
  // TODO: clear only data for related store.
  logger.log('info', `Initializing store for: ${storePath}`);
  store.remove({}, { multi: true }, err => logError(err, `Failed to clear db store: ${err}`));
  store.insert(JSON.parse(fs.readFileSync(storePath, 'utf8')), err => logError(err, `Failed to populate db store: ${err}`));
}

function initializeDatabase() {
  const db = {};
  db.blog = new Datastore();
  initializeDatabaseStore(db.blog, blogStorePath);

  const fileWatcher = chokidar.watch('./content/**/*.json');
  fileWatcher.on('change', (file) => {
    const store = path.basename(file, '.json');
    if (store === 'blog') {
      logger.log('info', 'chokidar: blog.json modified');
      initializeDatabaseStore(db.blog, blogStorePath);
    }
  });

  return db;
}

function listen(port) {
  const db = initializeDatabase();
  const app = express();
  app.locals.db = db;
  app.use(logger.logExpress);
  app.get('*.js', (req, res, next) => {
    req.url += '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    next();
  });
  app.use(express.static(path.join(__dirname, '../../dist/')));
  app.use(blogRouter);
  app.get('/favicon*', (req, res) => res.sendFile(path.join(__dirname, '..', req.path)));
  app.get('/index.css', (req, res) => res.sendFile(path.join(__dirname, '..', 'index.css')));
  app.use(render);
  app.listen(port);
}

function listenWebpackDevServer(port, proxyPort) {
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

const PORT = process.env.PORT || 8080;
if (process.env.NODE_ENV === 'production') {
  listen(PORT);
} else {
  listen(PORT - 1);
  listenWebpackDevServer(PORT, PORT - 1);
}
