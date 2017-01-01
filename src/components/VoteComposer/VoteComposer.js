import React from 'react';
import BaseComponent from '../shared/BaseComponent';
import styles from './styles.styl';

export default class VoteComposer extends BaseComponent {
    /**
    @constructor
    @param props with 'active' flag,'onActivate', 'onDeactivate' and
            'onSave' event handlers
    */
    constructor(props) {
        super(props);
        this.bind(this.activateIfNeeded, this.save, this.close);
    }

    /**
    Closes the active form.
    */
    close() {
        const { onDeactivate } = this.props;
        onDeactivate();
    }

    /**
    Saves and closes the new vote form.
    */
    save() {
        const { onSave } = this.props;
        onSave();
        this.close();
    }

    /**
    Saves and closes the new vote form.
    */
    activateIfNeeded() {
        const { onActivate, active } = this.props;
        if (!active) {
            onActivate();
        }
    }

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

    renderActiveForm() {
        return (
            <div className={[styles.row, styles.voteComposer, styles.spacer].join(' ')}>
                <div className={styles.head}>
                    <h1 className={styles.title}>
                    <input  className={styles.title} autoFocus
                            name="title"
                            type="text"
                            placeholder="What do you want to know?"/>
                            </h1>
                    <input  className={styles.description}
                            name="description"
                            type="text"
                            placeholder="Describe your question in one sentence here"/>
                </div>
                <div className={styles.composeBody}>
                    <input  className={styles.choice}
                            type="text"
                            key="choice_1"
                            name="choice_1"
                            placeholder="choice #1"
                    />
                    <div className={styles.buttonBar}>
                        <a className={styles.button} onClick={this.save}>Save</a>
                        <a className={styles.button} onClick={this.close}>Cancel</a>
                    </div>
                </div>
            </div>
        );
    }

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
