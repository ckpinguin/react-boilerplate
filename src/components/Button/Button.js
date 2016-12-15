import React from 'react';
import styles from './styles.styl';

export default function CoolButton(props) {
    return <button className={styles.green}>{props.text}</button>;
}
