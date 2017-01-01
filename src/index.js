import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout/Layout';
import VoteController from './components/VoteController/VoteController';
import './assets/favicon.ico';
import './index.styl';

const allVotes = [{
    'id': 'vote_1',
    'title': 'It\'s a test!',
    'description': 'Favourite programming language',
    'choices': [
        {
            id: 'choice_1',
            title: 'JavaScript',
            count: 60
        }, {
            id: 'choice_2',
            title: 'Java',
            count: 4
        }, {
            id: 'choice_3',
            title: 'Go',
            count: 40,
        }, {
            id: 'choice_4',
            title: 'C',
            count: 20,
        }
    ]
}, {
    'id': 'vote_2',
    'title': 'For the soup!',
    'description': 'Favourite soup',
    'choices': [
        {
            id: 'choice_1',
            title: 'Noodle Soup',
            count: 6
        }, {
            id: 'choice_2',
            title: 'Ramen',
            count: 14
        }, {
            id: 'choice_3',
            title: 'Letter soup',
            count: 2,
        }, {
            id: 'choice_4',
            title: 'Slimey soup',
            count: 90,
        }
    ]
}];

const mainComponent = <VoteController allVotes={allVotes}/>;
ReactDOM.render(
    <Layout>{mainComponent}</Layout>,
        document.getElementById('root'));
