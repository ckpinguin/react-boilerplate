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
};
ReactDOM.render(
    <Layout>
        <VotingComponent vote={vote}/>
    </Layout>, document.getElementById('root'));
