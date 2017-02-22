'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchJson = fetchJson;
exports.sendJson = sendJson;

require('isomorphic-fetch');

require('babel-polyfill');

// for Promises in older browsers

//const BACKEND_URL = __API_SERVER_URL__;
var BACKEND_URL = 'http://mdbserver:3000';

function fetchJson(path) {
    var url = '' + BACKEND_URL + path;

    console.info('Backend: fetchJson ' + path);
    return fetch(url) // Returns a Promise
    .then(function (response) {
        return response.json();
    }).catch(function (ex) {
        console.error('parsing failed', ex);
    });
}

function sendJson(method, path) {
    var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var url = '' + BACKEND_URL + path;

    console.info('Backend: sendJson ' + method + ' ' + path);
    return fetch(url, { // Returns a Promise
        method: method,
        body: JSON.stringify(payload, null, 4),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        return response.json();
    }).catch(function (ex) {
        console.error('parsing failed', ex);
    });
}