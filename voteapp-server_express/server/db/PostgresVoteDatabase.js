import Sequelize from 'sequelize';
import pg from 'pg';

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
    user: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    }
});

var Choice = sequelize.define('choice', {
    title: {
        type: Sequelize.STRING
    },
    count: {
        type: Sequelize.INTEGER,
        length: 6
    }
});

Choice.belongsTo(Vote);
Vote.hasMany(Choice);

const PostgresVoteDatabase = {
    // TODO: This looks awful!
    initialize(loadData) {
        return Vote.sync({force: false}).then(function() {
            return Choice.sync({force: false});
        }).then(function() {
            if (loadData) {
                return Vote.create({title: 'Test1', description: 'Desc1'});
            }
        }).then(function() {
            if (loadData) {
                return Choice.create({title: 'Choice 1', count: 12, voteId: 1});
            }
        }).catch(function(err) {
            throw err;
        });
    },

    getAllVotes(callback) {
        return Vote.findAll({include: [Choice]}).then((votes, err) => callback(err, votes) // callback defined as error-first
        );
    },

    getVoteById(id, callback) {
        return Vote.findById(id).then((vote, err) => callback(err, vote) // callback defined as error-first
        );
    },

    store(vote, callback) {
        if (!vote.id) {
            vote.id = pg.Types.ObjectId().toString();
            const postgresVote = new vote;
            return postgresVote.save(function(err, newVote) {
                if (err)
                    return callback(err);
                return callback(null, newVote.snapshot());
            });
        }

        find({
            'id': vote.id
        }, vote, {
            'new': 'true'
        }, function(err, update) {
            if (err) {
                return callback(err);
            }
            return callback(null, update.snapshot());
        });

    }
};

export default {
    create(callback) {
        // callback is defined error-first (nodejs standard)
        return callback(PostgresVoteDatabase.initialize(true), PostgresVoteDatabase);
    }
};
