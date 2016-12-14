import React from 'react';
import BaseComponent from '../shared/BaseComponent';

export default class Greeter extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            greeting: ''
        }
    }

    onGreetingChange(event) {
        this.setState({greeting: event.target.value});
    }

    onGreetClicked() {
        alert(`Hello, ${this.state.greeting}`);
    }

    getCharsRemaining() {
        return this.props.maxLength - this.state.greeting.length;
    }

    hasRemainingChars() {
        return this.getCharsRemaining() > 0;
    }

    isGreetingValid() {
        return this.state.greeting.length > 0 && this.getCharsRemaining() >= 0;
    }

    render() {
        return (
            <div>
                Greeting:
                <input value={this.state.greeting}
                       onChange={(e)=>this.onGreetingChange(e)} />
                <span>{this.getCharsRemaining()}</span>
                <button disabled={!this.isGreetingValid()} onClick={()=>this.onGreetClicked()}>Greet</button>

            </div>
        );
    }
}
