import Sequelize from 'sequelize';
import {dd} from '../toolbox';

var sequelize = new Sequelize('voteapp', 'voteapp', 'voteapp', {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

var Vote = sequelize.define('vote', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    }
});

var Choice = sequelize.define('choice', {
    choiceTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    count: {
        type: Sequelize.INTEGER,
        length: 6
    }
});

Choice.belongsTo(Vote);
Vote.hasMany(Choice);

const PostgresVoteDatabase = {
    // TODO: This looks awful and does not work right, please learn more about Promises
    initialize() {
            Vote.sync({force: true})
            .then(function() {
                return Choice.sync({force: true});
            })
            .then(function() {
                return Promise.all([
                    Vote.create({title: 'Test1', description: 'Desc1'}),
                    Choice.create({choiceTitle: 'Choice 1', count: 12, voteId: 1}),
                    Choice.create({choiceTitle: 'Choice 2', count: 4, voteId: 1})
            ]);
        }).catch(function(err) {
            return err;
        });
    },

    getAllVotes(callback) {
        return Vote.findAll({include: [Choice]}).then((votes, err) => callback(err, votes));
    },

    getVoteById(id, callback) {
        return Vote.findById(id, {include: [Choice]}).then((vote, err) => callback(err, vote));
    },

    store(vote, callback) {
        return Vote.findById(vote.id, {
            include: [
                {
                    model: Choice,
                    as: 'choices'
                }
            ]
        }).then(function(resVote) {
            dd(resVote.choices[0], 'resVote.choices', 'PostgresVoteDatabase.store()');
            // TODO: Make this dynamic and don't break API of VoteServer.js!
            //let count = resVote.choices[0].count;
            resVote.choices[0].updateAttributes({count: 120})
            //return .update(
                .then(function(res) {
                    callback(null, res);
                }).catch((err) => callback(err, null));
        });
    },

    // I have to break the API here for relational db's sake :(
    getChoiceById(id) {
        return Choice.findById(id);
    },

    storeChoice(choice, callback) {
        dd(choice.count, 'choice.count', 'PostgresVoteDatabase.storeChoice()');
        Choice.create(choice).then((result, err) => callback(err, result)).catch((err) => callback(err, null));
    }

};

export default {
    create(callback) {
        // callback is defined error-first (nodejs standard)
        return callback(PostgresVoteDatabase.initialize(), PostgresVoteDatabase);
    }
};
