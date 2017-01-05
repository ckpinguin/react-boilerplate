require('babel-register'); // babel-transpile all required or imported stuff

const VoteServer = require('./VoteServer.js').default;
const useMongoDb = process.env.USE_MONGODB;

const Database = useMongoDb
    ? require('./db/MongoDbVoteDatabase').default
    : require('./db/InMemoryVoteDatabase').default;

Database.create((err, database) => {
    if (err) {
        throw new Error(`Could not create db: ${err}`);
    }
    console.log('Starting VoteApp...');
    VoteServer.start(3000, database);
});
