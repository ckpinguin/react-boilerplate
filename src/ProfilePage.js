import React from 'react';
import NavBar from './components/NavBar/NavBar.js';
import Button from './components/Button/Button';
import Greeter from './components/Greeter/Greeter';
import VotingComponent from './components/VotingComponent/VotingComponent';
import ChoiceBar from './components/ChoiceBar/ChoiceBar';
import BouncingBall from './components/BouncingBall/BouncingBall';
import selfie from './assets/selfie.jpg';

export default function ProfilePage() {
    const vote = {
        'title': 'It\'s a test!'
    };
    return <div>
        <NavBar/>
        <VotingComponent vote={vote}/>
        <ChoiceBar title="JavaScript" count={123} percent={37}/>
        <h1>All About Me or so...!</h1>
        <Greeter maxLength={10}/>
        <p>I like movies and blah blah blah blah blah</p>
        <Button text="A super cool button"/>
        <div>
            <img src={selfie}/>
        </div>
    </div>;
}
