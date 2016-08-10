import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'director';
import {AppDerivation} from './store';
import {setShowing} from './actions';
import App from './App.jsx';


const makeDerivable = (Wrapped, Derivation) => {
    class Derivable extends Component {
        constructor() {
            super();

            this.state = Derivation.get();
        }

        componentDidMount() {
            let router = Router({
                '/': setShowing.bind(null, 'All'),
                '/active': setShowing.bind(null, 'Active'),
                '/completed': setShowing.bind(null, 'Completed')
            });

            router.init('/');
        }

        componentWillMount() {
            this.Reactor = Derivation
                .reactor(v => {
                    this.setState(v);
                });
            this.Reactor.start();
        }

        componentWillUnmount() {
            this.Reactor.stop();
        }

        render() {
            return (
                <Wrapped {...this.state} />
            );
        }
    }

    return Derivable;
};

const Derivable = makeDerivable(App, AppDerivation);



ReactDOM.render(
    <Derivable />,
    document.getElementById('todoapp')
);
