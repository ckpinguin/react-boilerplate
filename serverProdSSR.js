require('babel-register');

import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import ProfilePage from './src/components/ProfilePage/ProfilePage';

const app = express();
const ip = 'localhost';
const port = 3000;

/* Serve static */
app.use('/public', express.static(__dirname + '/dist'));
//app.use(express.static(__dirname + '/dist/media'));

/* Server render */
app.use(handleRender);

function handleRender(req, res) {
    const html = renderToString(<main><ProfilePage/></main>);
    res.send('<!doctype html>\n' + renderToString(<HTML html={html}/>));
}

const HTML = ({html}) => (
    <html>
        <head>
            <link rel="shortcut icon" href="/public/media/favicon.ico"/>
            <link rel="stylesheet" type="text/css" href="/public/style.css"/>
        </head>
        <body>
            <div id="root" dangerouslySetInnerHTML={{
                __html: html
            }}/>
            <script src="/public/vendor.js"/>
            <script src="/public/bundle.js"/>
        </body>
    </html>
);

function renderPage(html) {
    return `
    <!doctype html>
    <html>
      <head>
        <title>React Example</title>
        <link rel="stylesheet" type="text/css" href="/public/style.css" />
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="/public/vendor.js" />
        <script src="/public/bundle.js" />
      </body>
    </html>
    `;
}

app.listen(port, ip, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`listening on ${ip}:${port}`);
});
