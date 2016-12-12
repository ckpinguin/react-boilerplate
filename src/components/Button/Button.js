import React from 'react'
import BaseComponent from '../shared/BaseComponent';
import styles from './styles.styl'

export default class CoolButton extends React.Component {
  render() {
    return (
      <button className={styles.red}>{this.props.text}</button>
    )
  }
}