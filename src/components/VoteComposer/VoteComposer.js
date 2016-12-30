import React from 'react';
import BaseComponent from '../shared/BaseComponent';

export default class VoteComposer extends BaseComponent {
    constructor(props) {
        super(props);

        this.bind(this.activateIfNeeded, this.save, this.close);
    }

    close() {
        const { onDeactivate } = this.props;
        onDeactivate();
    }

    save() {

    }

    render() {
        return <div />;
    }
}
