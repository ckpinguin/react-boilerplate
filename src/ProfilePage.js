import React from 'react';
import NavBar from './components/NavBar/NavBar.js';
import Button from './components/Button/Button';
import selfie from './assets/selfie.jpg';
/**
 * Our profile page class (example)
 * @constructor
 */
export default class ProfilePage extends React.Component {
  constructor() {
    super();
    /* No more auto-binding in ES6! If we need
    prebinding, it should be done here or even better,
    use our BaseComponent's _bind method */
    //this.tick = this.tick.bind(this);
  }

  render () {
    return (
      <div>
        <NavBar />
        <h1>All About Me or so...!</h1>
        <p>I like movies and blah blah blah blah blah</p>
        <Button text='A super cool button'/>
        <div>
          <img src={selfie} />
        </div>
      </div>
    );
  }
}
