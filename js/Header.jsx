import React, {Component} from 'react';
import {onEnter} from './utils';
import {add} from './actions';


class Header extends Component {

    constructor() {
        super();

        this.state = {
            name : ''
        };
    }

    render() {
        let that = this;

        return (
            <header className="header">
                <h1>todos</h1>
                <input className="new-todo"
                        placeholder="What needs to be done?"
                        value={that.state.name}
                        onChange={ e => { that.setState({ name: e.target.value }) } }
                        onKeyPress={onEnter((e) => {
                            add(e.target.value);
                            that.setState({name: ''});
                        })}
                        autoFocus={true}
                />
            </header>    
        );
    }
}

export default Header;