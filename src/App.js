import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/NavBar';
/**
 * Our profile page class (example)
 * @constructor
 */
export default class ProfilePage extends React.Component {
  constructor() {
    super();
    /* No more auto-binding in ES6! If we need
    prebinding, it should be done here */
    //this.tick = this.tick.bind(this);
  }

  render () {
    return (
      <div>
        <NavBar />
        <h1>All About Me!</h1>
        <p>I like movies and blah blah blah blah blah</p>
        <img src="https://s3.amazonaws.com/codecademy-content/courses/React/react_photo-monkeyselfie.jpg" />
      </div>
    );
  }
}
