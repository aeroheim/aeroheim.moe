
import webpack from 'webpack';
import webpackConfig from '../../webpack.dev';
import WebpackDevServer from 'webpack-dev-server';
import express from 'express';
import path from 'path';
import fs from 'fs';
import chokidar from 'chokidar';
import Datastore from 'nedb';
import { logger, log } from './logger';
import { blogRouter, blogStorePath } from './api/blog';

// SSR dependencies
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { App, initializeStore } from '../app/components/aeroheim';
import serialize from 'serialize-javascript';
import { collectInitial } from 'node-style-loader/collect';
const initialStyleTag = collectInitial();   // critical styles for SSR - from node-style-loader
global.server = true;                       // set global flag for SSR

function logError(err, msg)
{
    if (err)
    {
        log('error', msg);
    }
}

function initializeStoreFromDisk(store, path)
{
    log('info', `Initializing store for: ${path}`);

    // TODO: clear only data for related store.
    store.remove({}, { multi: true }, (err) => logError(err, `Failed to clear db store: ${err}`));
    store.insert(JSON.parse(fs.readFileSync(path, 'utf8')), (err) => logError(err, `Failed to populate db store: ${err}`));
}

function renderPage(html, preloadedState)
{
    return `
        <!doctype html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>aeroheim</title>
          ${initialStyleTag}
          <link rel="stylesheet" href="/index.css"/>
          <link rel="icon" type="image/png" href="/favicon-16x16.png" size="16x16">
          <link rel="icon" type="image/png" href="/favicon-32x32.png" size="32x32">
          <link rel="icon" type="image/png" href="/favicon-96x96.png" size="96x96">
        </head>
        <body>
            <div id="root" class="root">${html}</div>
        </body>
            <script>
                window.__PRELOADED_STATE__ = ${serialize(preloadedState)}
            </script>
        </html>
    `;
}

function renderAppOnServer(req, res)
{
    // TODO: not sure if context is needed.
    const context = {};
    const store = initializeStore();
    const app = (
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <App/>
            </StaticRouter>
        </Provider>);

    const html = renderToString(app);
    const preloadedState = store.getState();
    res.send(renderPage(html, preloadedState));
}

function listen(port)
{
    // initialize db and watch for changes
    const db = {};
    db.blog = new Datastore();
    initializeStoreFromDisk(db.blog, blogStorePath);
    const watcher = chokidar.watch('./content/**/*.json');
    watcher.on('change', (file) => 
    {
        console.log(file);
        const storeName = path.basename(file, '.json');
        if (storeName === 'blog')
        {
            log('info', 'chokidar: blog.json modified');
            initializeStoreFromDisk(db.blog, blogStorePath);
        }
    });

    // initialize express server and apply routes/middleware
    // TODO: single source output directory variable 'dist' and import it
    const app = express();
    app.locals.db = db;
    app.use(logger);
    app.get('*.js', (req, res, next) =>
    {
        req.url = req.url + '.gz';
        res.set('Content-Encoding', 'gzip');
        res.set('Content-Type', 'text/javascript');
        next();
    });
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.use(blogRouter);
    app.get('/favicon*', (req, res) => res.sendFile(path.join(__dirname, 'src', req.path)));
    app.get('/index.css', (req, res) => res.sendFile(path.join(__dirname, 'src', 'index.css')));
    app.use(renderAppOnServer);

    // server ready
    app.listen(port);
}

function webpackDevServerListen(port)
{
    const webpackDevServer = new WebpackDevServer(webpack(webpackConfig[0]), 
    {
        hot: true,
        historyApiFallback: true,
        proxy: 
        {
            '*' : `http://localhost:${port - 1}`
        },
    });

    webpackDevServer.listen(port, 'localhost');
}

const PORT = process.env.PORT || 8080;
const PROD = process.env.NODE_ENV === "production";

if (PROD)
{
    // Run only the backend on production. It will serve the frontend on request.
    listen(PORT);
}
else
{
    // Run the backend server and the frontend using webpack-dev-server. While the frontend server
    // is still configured to proxy all requests back to the backend, using webpack-dev-server allows 
    // for Hot Module Replacement to be utilized for the frontend.
    listen(PORT - 1);
    webpackDevServerListen(PORT);
}