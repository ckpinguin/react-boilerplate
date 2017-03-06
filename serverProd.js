require('babel-register');

import express from 'express';

const app = express();
const ip = '0.0.0.0';
const port = 3000;

/* Serve static */
app.use('/', express.static(__dirname + '/dist'));
//app.use(express.static(__dirname + '/dist/media'));

app.listen(port, ip, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`listening on ${ip}:${port}`);
});
