import React from 'react'
import BaseComponent from '../shared/BaseComponent';
import styles from './styles.styl'

export default class CoolButton extends BaseComponent {
  render() {
    return (
      <button className={styles.green}>{this.props.text}</button>
    )
  }
}
