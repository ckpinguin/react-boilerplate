var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

function start(port, voteDatabase) {
    var app = express();

    // configure app to use bodyParser()
    // this will let us get the data from a POST
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    // ROUTES FOR OUR API
    // =============================================================================
    var router = express.Router();
    // GET
    router.get('/', function(req, res) {
        const msg = JSON.stringify({
            message: 'hooraaaay! welcome to our api!'
        }, null, 4);
        res.setHeader('Content-Type', 'application/json');
        res.send(msg);
    });
    // POST
    router.post('/', function(req, res) {
        console.log('Got a POST request for the homepage');
        res.send('Hello POST');
    });
    // DELETE
    router.delete('/del_user', function(req, res) {
        console.log('Got a DELETE request for /del_user');
        res.send('Hello DELETE');
    });
    // This responds a GET request for the /list_user page.
    router.get('/list_user', function(req, res) {
        console.log('Got a GET request for /list_user');
        res.send('Page Listing');
    });
    // This responds a GET request for abcd, abxcd, ab123cd, and so on
    router.get('/ab*cd', function(req, res) {
        console.log('Got a GET request for /ab*cd');
        res.send('Page Pattern Match');
    });

    // REGISTER OUR ROUTES -------------------------------
    // all of our routes will be prefixed with /api
    app.use('/api', router);

    var server = app.listen(3000, '0.0.0.0', function(error) {
        if (error) {
            console.error(error);
        } else {
            var host = server.address().address;
            var port = server.address().port;
            console.info('==> 🌎  Express is Listening on port %s. Visit http://localhost:%s/ in your browser.', host, port);
        }
    });
}

export default {
    start
};
