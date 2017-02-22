import React from 'react';
import NavBar from '../NavBar/NavBar.js';
import selfie from '../../assets/selfie.jpg';

export default function ProfilePage() {
    return <div>
        <NavBar/>
        <h1>All About Me or so...!</h1>
        <p>I like movies and blah blah blah blah blah</p>
        <div>
            <img src={selfie}/>
        </div>
    </div>;
}
