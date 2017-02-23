import React from 'react';
import ReactDOM from 'react-dom';
import ProfilePage from '../components/ProfilePage/ProfilePage';
import './index.styl';

const mount = document.getElementById('root');
const profilePage = <ProfilePage/>;

ReactDOM.render(profilePage, mount);

if (module.hot) {
    module.hot.accept('../components/ProfilePage/ProfilePage', () => {
        // If you use Webpack 2 in ES modules mode, you can
        // use <App /> here rather than require() a <NextApp />.
        const NextApp = require('../components/ProfilePage/ProfilePage').default;
        ReactDOM.render(
            <NextApp/>, mount
            );
    });
}
