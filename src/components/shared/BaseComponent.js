import React from 'react';

/**
 * A base class with some helping functionality
 * like auto-binding etc.
 * @constructor
 */
export default class BaseComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * Binds given methods to the actual instance.
   * This is re-Introducing auto-binding even in ES6
   * @constructor
   * @param {string} methods - The methods to be bound.
   */
  _bind(...methods) {
    methods.forEach( (method ) => this[method] = this[method].bind(this) );
  }

}
