import React from 'react';
import VoteList from '../VoteList/VoteList';
import VoteComposer from '../VoteComposer/VoteComposer';

export default class VoteController extends React.Component {
    /**
    @constructor
    @param props with 'allVotes' to be used in the respective state
    */
    constructor(props) {
        super(props);

        this.state = {
            allVotes: props.allVotes,
            currentVoteId: null,
            composerActive: false
        };
        this.setCurrentVote = this.setCurrentVote.bind(this);
        this.registerVote = this.registerVote.bind(this);
        this.addVote = this.addVote.bind(this);
        this.activateVoteComposer = this.activateVoteComposer.bind(this);
        this.deactivateVoteComposer = this.deactivateVoteComposer.bind(this);
    }

    /**
    @type Event handler
    @param vote (object)
    @desc Setting the state variable 'currentVoteId'. Respects the fact that
        the VoteComposer component is active, so nothing
        happens then to the list, vote should not be empty and the composer
        should not be active
    */
    setCurrentVote(vote) {
        if (vote) console.log(`Setting current vote: ${vote.id}`);
        const { composerActive } = this.state;
        this.setState({currentVoteId: (vote && !composerActive) ? vote.id : null});
    }

    /**
    @type internal
    @see registerVote
    @param vote (object) The vote for which we count a new choice
    @param choice (object) The choice that was voted for
    @return object newVote
    @desc Takes a 'vote' and a 'choice' object in that vote and returns a copy
        of that vote with the corresponding choice.count incremented by 1.
    */
    registerChoice(vote, choice) {
        console.log(`Registering choice: ${choice.id}`);
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
    @type Event handler
    @see VotingComponent
    @param vote (object) The vote whose state will be updated
    @param choice (object) The choice that was chosen on the vote
    @desc Replaces state object 'allVotes', calls @see registerChoice(vote, choice)
        to get a new vote object back with incremented choice.count
        for the corresponding 'vote' object.
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

    /**
    @type Event handler
    @from VoteComposer
    @param vote (object) The newly created vote
    @desc Adds a new vote to the state 'allVotes'
    */
    addVote(vote) {
        const { allVotes } = this.state;
        // Create a new object and "append" the new vote to it
        this.setState({allVotes: [...allVotes, vote]});
    }

    /**
    @type Event handler
    @desc Activates the vote composer component
    */
    activateVoteComposer() {
        this.setState({
            currentVoteId: null,
            composerActive: true
        });
    }

    /**
    @type Event handler
    @desc Deactivates the vote composer component
    */
    deactivateVoteComposer() {
        this.setState({
            composerActive: false
        });
    }

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
