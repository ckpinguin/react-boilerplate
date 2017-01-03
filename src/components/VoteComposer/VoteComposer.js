import React from 'react';
import styles from './styles.styl';

/**
@type Helper
@desc Creates an empty choice object
*/
function emptyChoice() {
    return {
        id:     `choice_${Date.now()}`,
        count:  0,
        title:  null
    };
}

/**
@type Helper
@desc Creates an empty vote object
*/
function emptyVote() {
    return {
        id:             `vote_${Date.now()}`,
        title:          '',
        description:    '',
        formCompleted:  false,
        choices:        [emptyChoice()]
    };
}

export default class VoteComposer extends React.Component {
    /**
    @constructor
    @param props with 'active' flag,'onActivate', 'onDeactivate' and
            'onSave' event handlers
    */
    constructor(props) {
        super(props);

        this.state = {
            vote: emptyVote()
        };
        this.activateIfNeeded = this.activateIfNeeded.bind(this);
        this.save = this.save.bind(this);
        this.close = this.close.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChoiceChange = this.onChoiceChange.bind(this);
    }

    /**
    @type Helper
    @desc Closes the active form.
    */
    close() {
        const { onDeactivate } = this.props;
        this.setState(emptyVote());
        onDeactivate();
    }

    /**
    @type Helper
    @desc Saves and closes the new vote form.
    */
    save() {
        const { onSave } = this.props;
        const { vote } = this.state;
        const newVote = {
            ...vote,
            // get rid of the empty choice from our "pool"
            choices: vote.choices.slice(0, -1)
        };
        onSave(newVote);
        this.close();
    }

    /**
    @type Helper
    @desc Saves and closes the new vote form.
    */
    activateIfNeeded() {
        const { onActivate, active } = this.props;
        if (!active) {
            onActivate();
        }
    }

    /**
    @type Helper
    @desc Decides if the voting form is sufficiently filled
    @return boolean
    */
    isFormCompleted() {
        const { active } = this.props;
        const { vote: { title, description, choices } } = this.state;
        const choicesCount = choices.length;

        let formCompleted =
            active && title && description && choicesCount > 1;

        if (formCompleted) {
            // if all (except the last empty one) choices are filled
            // the form is complete
            formCompleted = choices.every(
                (c, ix) => ix === choicesCount - 1 || c.title
            );
        }
        return true;
    }

    /**
    @type Event handler
    @param event
    @desc Copies the current vote object and adds a new field name/value to it
        then sets current state object 'vote' to this new object
    */
    onChange(event) {
        const { name: fieldName, value: fieldValue } = event.target;
        const { vote } = this.state;
        // copy the existing vote
        const newVote = {
            ...vote,
            // ES6 "computed property" as the fieldName will be the choice item
            [fieldName]: fieldValue
        };
        this.setState({
            vote: newVote
        });
    }

    /**
    @type Event handler
    @param choiceIx (int): the index of the changed choice
    @param title (string): the new title of the changed choice
    @desc creates a new choice option in the corresponding choice object and
        then replaces the corresponding choice object in the current vote
        object (state).
    */
    onChoiceChange(choiceIx, title) {
        const { vote } = this.state;
        const choices = vote.choices;
        const choice = choices[choiceIx];

        const newChoice = {
            ...choice,
            title
        };

        const newChoices =
            choices.map(c => (c.id === choice.id ? newChoice : c));

        // create choice if the last field was empty before something
        // has been entered in it
        if (!choice.title && newChoice.title
                && choiceIx === (choices.length -1)) {
            newChoices.push(emptyChoice());
        }

        this.setState({
            vote: {
                ...vote,
                choices: newChoices
            }
        });
    }

    /**
    @type Helper
    @desc Renders the inactive form
    */
    renderInactiveForm() {
        return (
            <div className={[styles.row, styles.voteComposer, styles.spacer].join(' ')}
                onClick={this.activateIfNeeded}>
                <h1 className={styles.title}>
                    <span className={styles.emphasis}>
                        What do <b>you</b> want to know?
                    </span>
                    <div className={styles.badge}>Add voting</div>
                </h1>
                <p>Click here to leave your own question.</p>
            </div>
        );
    }

    /**
    @type Helper
    @desc Renders the active form
    */
    renderActiveForm() {
        const { vote: { title, description, choices }} = this.state;
        const formCompleted = this.isFormCompleted();

        return (
            <div className={[styles.row, styles.voteComposer, styles.spacer].join(' ')}>
                <div className={styles.head}>
                    <h1 className={styles.title}>
                        <input  className={styles.title} autoFocus
                                name="title"
                                type="text"
                                placeholder="What do you want to know?"
                                value={title}
                                onChange={this.onChange}/>
                    </h1>
                    <input  className={styles.description}
                            name="description"
                            type="text"
                            placeholder="Describe your question in one sentence here"
                            value={description}
                            onChange={this.onChange}/>
                </div>
                <div className={styles.composeBody}>
                    {choices.map((c, ix) => {
                        const keyAndName = `choices_${ix}`;
                        return (
                            <input  className={styles.choice}
                                    type="text"
                                    key={keyAndName}
                                    name={keyAndName}
                                    placeholder={`Choice #${(ix + 1)}`}
                                    onChange={
                                        (event)=>{this.onChoiceChange(ix, event.target.value);}}
                            />
                        );
                    })}
                    <div className={styles.buttonBar}>
                        <a className={formCompleted ? styles.button :
                            styles.button + ' ' + styles.disabled}
                            onClick={formCompleted ? this.save : null}>Save</a>
                        <a className={styles.button} onClick={this.close}>Cancel</a>
                    </div>
                </div>
            </div>
        );
    }

    /**
    @type Render function
    @desc Renders the active or inactive form upon the props.active boolean
    */
    render() {
        const {active} = this.props;
        if (!active) {
            return this.renderInactiveForm();
        }
        return this.renderActiveForm();
    }
}

VoteComposer.propTypes = {
    active:         React.PropTypes.bool,
    onSave:         React.PropTypes.func.isRequired,
    onActivate:     React.PropTypes.func.isRequired,
    onDeactivate:   React.PropTypes.func.isRequired
};
