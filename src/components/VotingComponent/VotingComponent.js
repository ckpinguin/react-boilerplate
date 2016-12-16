import styles from './styles.styl';
import BaseComponent from '../shared/BaseComponent';
import React from 'react';

export default class VotingComponent extends BaseComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { vote } = this.props;
        return (
            <div className={styles.row, styles.votingRow, styles.spacer}>
                <div className={styles.head}>
                    <h1 className={styles.title}>{vote.title}
                        <div className={styles.badge}>
                            {vote.totalVotes} Votes
                        </div>
                    </h1>
                </div>
            </div>);
    }
}
VotingComponent.propTypes = {
    vote: React.PropTypes.object.isRequired
};
