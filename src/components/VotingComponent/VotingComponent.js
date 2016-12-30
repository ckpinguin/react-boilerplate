import React from 'react';
import ChoiceBar from '../ChoiceBar/ChoiceBar';
import styles from './styles.styl';

export default function VotingComponent({key, vote, onDismissVote, onRegisterChoice}) {
    const choices = vote.choices;
    const totalVotes = vote.totalVotes;
    return (
        <div className={[styles.row, styles.votingRow, styles.spacer].join(' ')}>
            <div className={styles.head}>
                <h1 className={styles.title}>
                    {vote.title}
                    <div className={styles.badge}>{totalVotes}
                    Votes</div>
                </h1>
                <div className={[styles.description, styles.emphasis].join(' ')}>
                    {vote.description}
                </div>
                <div>
                    {choices.map(choice => <ChoiceBar key={key}
                        percent={choice.count * (100 / totalVotes)}
                        onClickHandler={() => onRegisterChoice(choice)}
                        onDismissHandler={() => onDismissVote}
                        {...choice}/>
                    )}
                        </div>
                    </div>
                    </div>
    );

}
VotingComponent.propTypes = {
    key:                React.PropTypes.string.isRequired,
    vote:               React.PropTypes.object.isRequired,
    onDismissVote:      React.PropTypes.func.isRequired,
    onRegisterChoice:   React.PropTypes.func.isRequired
};
