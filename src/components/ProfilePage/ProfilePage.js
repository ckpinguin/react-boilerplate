import React from 'react';
import NavBar from '../NavBar/NavBar.js';
import selfie from '../../assets/selfie.jpg';


export default function ProfilePage() {
    return <div>
        <NavBar/>
        <h1>All About Me or so..., Mamma Mio...!</h1>
        <p>I like movies and blah blah blah blah blah</p>
        <div>
            <img src={selfie}/>
        </div>
    </div>;
}


// Using a class here for HMR update problems sake
/*
export  class ProfilePageClass extends React.Component {
    render() {
        return (
            <div>
                <NavBar/>
                <h1>All About Me or so, Mamma mio....!</h1>
                <p>I like movies and blah blah blah blah blah</p>
                <div>
                    <img src={selfie}/>
                </div>
            </div>
        );
    }
}*/
