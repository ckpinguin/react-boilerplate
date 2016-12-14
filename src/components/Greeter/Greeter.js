import React from 'react';
import BaseComponent from '../shared/BaseComponent';

export default class Greeter extends BaseComponent {
    constructor() {
        super();
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

    render() {
        return (
            <div>
                Greeting:
                <input value={this.state.greeting}
                       onChange= {(e) => this.onGreetingChange(e)} />
                   <button onClick={()=>this.onGreetClicked()}>Greet</button>
            </div>
        );
    }
}
