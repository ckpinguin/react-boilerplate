import React from 'react';
import BaseComponent from '../shared/BaseComponent';
import styles from './styles.styl';

export default class Greeter extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            greeting: ''
        };
    }

    onGreetingChange(event) {
        this.setState({greeting: event.target.value});
    }

    onGreetClicked() {
        alert(`Hello, ${this.state.greeting}`);
        this.setState({greeting: ''});
        // this.inputField a to native DOM element when set
        if (this.inputField) {
            this.inputField.focus();
        }
    }

    getCharsRemaining() {
        return this.props.maxLength - this.state.greeting.length;
    }

    hasRemainingChars() : boolean {
        return this.getCharsRemaining() > 0;
    }

    isGreetingValid() : boolean {
        return this.state.greeting.length > 0 && this.getCharsRemaining() >= 0;
    }

    render() {
        const greetingValid = this.isGreetingValid();
        return (
            <div>
                Greeting:
                <input className={greetingValid ? styles.valid : styles.invalid}
                    value={this.state.greeting}
                    onChange={(e) => this.onGreetingChange(e)}
                    ref={(c) => this.inputField = c} // set native ref
                />
                <span style={{
                    color: this.hasRemainingChars()
                        ? 'green'
                        : 'red'
                }}>
                    {this.getCharsRemaining()}
                </span>
                <button disabled={!greetingValid} onClick={() => this.onGreetClicked()}>
                    Greet
                </button>
            </div>
        );
    }
}
Greeter.propTypes = {
    maxLenth: React.PropTypes.number.isRequired
};
