import 'isomorphic-fetch';
import 'babel-polyfill';

//const BACKEND_URL = __API_SERVER_URL__;
const BACKEND_URL = 'http://localhost:3000';

export function fetchJson(path) {
    const url = `${BACKEND_URL}${path}`;

    return fetch(url)
    .then(response => response.json())
    .catch(ex => { console.error('parsing failed', ex); });
}

export function sendJson(method, path, payload={}) {
    const url = `${BACKEND_URL}${path}`;

    return fetch(url, {
        method:  method,
        body:    JSON.stringify(payload, null, 4),
        headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .catch(ex => { console.error('parsing failed', ex); });

}
