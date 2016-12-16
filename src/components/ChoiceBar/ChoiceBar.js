import React from 'react';
import styles from './styles.styl';

export default function ChoiceBar({title, count, percent}) {
    return(
        <div className={styles.choiceBar}>
            <div className={styles.progress} style={{'width': percent + '%'}}>
                <div className={styles.choiceBarTitle}>{title}</div>
            </div>
            <div className={styles.choiceBarBadge}>{count}</div>
        </div>
    );
}
ChoiceBar.propTypes = {
    title:      React.PropTypes.string.isRequired,
    count:      React.PropTypes.number.isRequired,
    percent:    React.PropTypes.number.isRequired
};
