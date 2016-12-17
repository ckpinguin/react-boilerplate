import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout/Layout';
import VotingComponent from './components/VotingComponent/VotingComponent';
import './assets/favicon.ico';
import './index.styl';

const vote = {
    'title': 'It\'s a test!',
    'description': 'Favourite programming language',
    'choices': [
        {
            title: 'JavaScript',
            count: 123,
            percent: 37
        }, {
            title: 'Java',
            count: 4,
            percent: 1
        }, {
            title: 'Go',
            count: 40,
            percent: 15
        }, {
            title: 'C',
            count: 20,
            percent: 7
        }
    ]
};
ReactDOM.render(
    <Layout>
        <VotingComponent vote={vote}/>
    </Layout>,
    document.getElementById('root'));
