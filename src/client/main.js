import React from 'react';
import ReactDOM from 'react-dom';
import ProfilePage from '../components/ProfilePage/ProfilePage';

const mount = document.getElementById('root');
const profilePage = <ProfilePage/>;

ReactDOM.render(profilePage, mount);
