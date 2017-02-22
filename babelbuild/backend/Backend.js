'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchJson = fetchJson;
exports.sendJson = sendJson;

require('isomorphic-fetch');

var BACKEND_URL = __API_SERVER_URL__;

function fetchJson(path) {
  var url = '' + BACKEND_URL + path;

  return fetch(url).then(function (response) {
    return response.json();
  }).catch(function (ex) {
    console.error('parsing failed', ex);
  });
}

function sendJson(method, path) {
  var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var url = '' + BACKEND_URL + path;

  return fetch(url, {
    method: method,
    body: JSON.stringify(payload),
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