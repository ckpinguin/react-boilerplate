import React from 'react';
import BaseComponent from '../shared/BaseComponent';

export default class NavBar extends BaseComponent {
  constructor() {
    super();
    /* No more auto-binding in ES6! If we need
    prebinding, it should be done here */
    //this.tick = this.tick.bind(this);
  }

  render() {
    var pages = ['home', 'blog', 'pics', 'bio', 'art', 'shop', 'about', 'contact'];
    var navLinks = pages.map(function(page){
      return (
        <a href={'/' + page}>
          {page}
        </a>
      );
    });

    return <nav>{navLinks}</nav>;
  }
}
