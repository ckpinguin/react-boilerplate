import React from 'react';
import BaseComponent from '../shared/BaseComponent';
import ChoiceBar from '../ChoiceBar/ChoiceBar';
import styles from './styles.styl';

export default class VotingComponent extends BaseComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const {vote} = this.props;
        return (
            <div className={[styles.row, styles.votingRow, styles.spacer].join(' ')}>
                <div className={styles.head}>
                    <h1 className={styles.title}>
                        {vote.title}
                        <div className={styles.badge}>
                            {vote.totalVotes}
                            Votes
                        </div>
                    </h1>
                    <div className={[styles.description, styles.emphasis].join(' ')}>
                        {vote.description}
                    </div>
                    <div>{vote.choices.map(c => <ChoiceBar key={c.id} {...c}/>)}
                    </div>
                </div>
            </div>
        );
    }
}
VotingComponent.propTypes = {
    vote: React.PropTypes.object.isRequired
};
