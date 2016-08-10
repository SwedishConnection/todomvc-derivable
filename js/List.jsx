import React from 'react';
import nomut from 'immutable';
import {isHidden} from './utils';
import {toggleAllCompleted} from './actions';
import Item from './Item.jsx'

const List = ({todos, showing, isAllCompleted}) => {
    return (
        <section className='main' style={{display: todos.size === 0 ? 'none': 'block'} }>
            <input className='toggle-all'
                type='checkbox'
                checked={isAllCompleted}
                onChange={() => toggleAllCompleted(isAllCompleted)}
            />
            <ul className="todo-list">
                {todos
                    .filter(v => !isHidden(v, showing))
                    .map((v,k) => Item(v, k))
                    .toArray()}
            </ul>
        </section>
    );
};

List.propTypes = {
    todos: React.PropTypes.instanceOf(nomut.Map).isRequired,
    showing: React.PropTypes.string.isRequired,
    isAllCompleted: React.PropTypes.bool.isRequired
};


export default List;