import React from 'react';
import BaseComponent from '../shared/BaseComponent';
import VoteList from '../components/VoteList/VoteList';

export default class VoteController extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            allVotes: props.allVotes
        };
        this.__bind(this.setCurrentVote, this.registerVote);
    }

    /**
    setting state of currentVoteId
    */
    setCurrentVote(vote) {
        this.setState({currentVoteId: vote ? vote.id : null});
    }

    /**
    @return object newVote
    @param vote (object) The vote for which we count a new choice
    @param choice (object) The choice that was voted for
    */
    registerChoice(vote, choice) {
        console.log(`Registering choice: ${choice.id}`);
        const newVote = {
            ...vote,
            choices:
                vote.choices.map(c => c.id !== choice.id ? c :
                {...c, count: c.count + 1 }
            )
        };
        return newVote;
    }

    /**
    Setting state of allVotes, calls @see registerChoice(vote, choice) to get
    a new vote object back with updated choice count for the specific vote.
    @param vote (object) The vote whose state will be updated
    @param choice (object) The choice that was chosen on the vote
    */
    registerVote(vote, choice) {
        const { allVotes } = this.state;
        const newVotes = allVotes.map(
                (v)=>v.id !== vote.id ? v : this.registerChoice(v, choice)
            );
        this.setState({
            allVotes: newVotes
        });
    }

    render() {
        const { allVotes, currentVoteId } = this.state;
        return (
        <div>
            <VoteList allVotes={allVotes}
                currentVoteId={currentVoteId}
                onSelectVote={this.setCurrentVote}
                onDismissVote={()=>{this.setCurrentVote(null);}}
                onRegisterVote={this.registerVote}
            />
        </div>
        );
    }
}
VoteController.propTypes = {
    allVotes: React.PropTypes.array.isRequired
};
