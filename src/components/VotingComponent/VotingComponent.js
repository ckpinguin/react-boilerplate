import React from 'react';
import BaseComponent from '../shared/BaseComponent';
import ChoiceBar from '../ChoiceBar/ChoiceBar';
import styles from './styles.styl';

export default class VotingComponent extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            vote: props.vote
        };
    }

    registerChoice(c) {
        console.log(`Registering choice: ${c.id}`);
        const {vote} = this.state;
        const newVote = {
            ...vote,
            choices:
                vote.choices.map(choice => choice.id !== c.id ? choice :
                {...choice, count: choice.count + 1 }
            )
        };
        this.setState({vote: newVote}); // triggers rendering
    }

    render() {
        const {vote} = this.state;
        const totalVotes = vote.choices.reduce((prev, curr) =>
                            prev + curr.count, 0);
        return (
            <div className={[styles.row, styles.votingRow,
                styles.spacer].join(' ')}>
                <div className={styles.head}>
                    <h1 className={styles.title}>
                        {vote.title}
                        <div className={styles.badge}>{totalVotes} Votes</div>
                    </h1>
                    <div className={[styles.description, styles.emphasis].join(' ')}>
                        {vote.description}
                    </div>
                    <div>{vote.choices.map(choice => <ChoiceBar key={choice.id}
                        percent={choice.count * (100 / totalVotes)}
                        // with ()=> notation our handler is bound correctly
                        onClickHandler={()=>this.registerChoice(choice)}
                        {...choice} />)}
                    </div>
                </div>
            </div>
        );
    }
}
VotingComponent.propTypes = {
    vote: React.PropTypes.object.isRequired
};
