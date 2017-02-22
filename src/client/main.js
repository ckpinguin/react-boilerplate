import React from 'react';
import ReactDOM from 'react-dom';
import ProfilePage from '../components/ProfilePage/ProfilePage';
import './index.styl';

const mount = document.getElementById('root');
const profilePage = <ProfilePage/>;

ReactDOM.render(profilePage, mount);
