import React from 'react';
import VoteList from '../VoteList/VoteList';
import VoteComposer from '../VoteComposer/VoteComposer';
import { dd } from '../shared/toolbox';

export default class VoteController extends React.Component {
    /**
    * @constructs VoteController
    * @param {Object} props - Properties with 'allVotes' to be used
    * in the respective state
    */
    constructor(props) {
        super(props);

        this.state = {
            allVotes: props.allVotes,
            //currentVoteId: null,
            //composerActive: false
        };
        this.setCurrentVote = this.setCurrentVote.bind(this);
        this.registerVote = this.registerVote.bind(this);
        this.addVote = this.addVote.bind(this);
        this.activateVoteComposer = this.activateVoteComposer.bind(this);
        this.deactivateVoteComposer = this.deactivateVoteComposer.bind(this);
    }

    /**
    * Event handler, setting the state variable 'currentVoteId'. Respects the fact that
    * the VoteComposer component is active, so nothing
    * happens then to the list, vote should not be empty and the composer
    * should not be active
    * @param {Object} vote - the new currentVote
    */
    setCurrentVote(vote) {
        if (vote) dd('VoteController.setCurrentVote()', vote, 'vote');
        const { composerActive } = this.state;
        this.setState({currentVoteId: (vote && !composerActive) ? vote.id : null});
    }

    /**
    * Helper, takes a 'vote' and a 'choice' object in that vote and returns
    * a copy of that vote with the corresponding choice.count incremented by 1.
    * @see registerVote()
    * @param {Object} vote - The vote for which we count a new choice
    * @param {Object} - The choice that was voted for
    * @return {Object} newVote
    */
    registerChoice(vote, choice) {
        dd(choice.id, 'choice.id', 'registerChoice()');
        // Construct an updated vote object
        const newVote = {
            ...vote, // object spread (ES6)
            choices: // overwrite the choices of the above object spread,
            // because we save the count in the corresponding choice itself
                vote.choices.map((c) => c.id !== choice.id ? c :
                {...c, count: c.count + 1 }
            )
        };
        return newVote;
    }

    /**
    * Event handler, replaces state object 'allVotes',
    * calls @see registerChoice(vote, choice)
    * to get a new vote object back with incremented choice.count
    * for the corresponding 'vote' object.
    @see VotingComponent
    @param {Object} vote - The vote whose state will be updated
    @param {Object} choice - The choice that was chosen on the vote
    */
    registerVote(vote, choice) {
        dd(vote.id, 'vote.id', 'registerVote()');
        const { allVotes } = this.state;
        const newVotes = allVotes.map(
                (v)=>v.id !== vote.id ? v : this.registerChoice(v, choice)
            );
        this.setState({
            allVotes: newVotes
        });
    }

    /**
    * Event handler, adds a new vote object to the state 'allVotes'
    * @param {Object} vote - The newly created vote
    */
    addVote(vote) {
        dd(vote.id, 'vote.id', 'addVote()');
        const { allVotes } = this.state;
        // Create a new object and "append" the new vote to it
        this.setState({allVotes: [...allVotes, vote]});
    }

    /**
    * Event handler, activates the vote composer component
    */
    activateVoteComposer() {
        dd(null, null, 'activateComposer()');
        this.setState({
            currentVoteId: null,
            composerActive: true
        });
    }

    /**
    * Event handler, deactivates the vote composer component
    */
    deactivateVoteComposer() {
        this.setState({
            composerActive: false
        });
    }

    /**
    */
    render() {
        const { allVotes, currentVoteId, composerActive } = this.state;
        return (
        <div>
            <VoteList   allVotes={allVotes}
                        currentVoteId={currentVoteId}
                        // select vote
                        onSelectVote={this.setCurrentVote}
                        // Collapse the opened vote and render the list sagain from here
                        onDismissVote={()=>{this.setCurrentVote(null);}}
                        onRegisterVote={this.registerVote}
            />
            <VoteComposer   active={composerActive}
                            onDeactivate={this.deactivateVoteComposer}
                            onActivate={this.activateVoteComposer}
                            onSave={this.addVote}
            />
        </div>
        );
    }
}

VoteController.propTypes = {
    allVotes: React.PropTypes.array.isRequired
};
