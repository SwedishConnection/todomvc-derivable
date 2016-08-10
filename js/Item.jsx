import React from 'react';
import {onEnter} from './utils';
import {toggleCompleted, markEdit, remove, setName} from './actions';

const Item = ({name, completed, editing}, id) => {
    return (
        <li key={id} 
            className={(editing ? 'editing': '') + (completed ? ' completed ' : '')}>
            <div className='view'>
                <input className='toggle'
                    type='checkbox'
                    checked={completed}
                    onChange={() => toggleCompleted(id)} />
                <label onDoubleClick={() => markEdit(id)}>{name}</label>
                <button className='destroy' 
                    onClick={() => remove(id)}></button>
            </div>
            <input className='edit'
                defaultValue={name}
                onBlur={e => setName(id, e.target.value)}
                onKeyPress={onEnter(e => e.target.blur())}
                onFocus={e => e.target.select()}/>
        </li>
    );
}

Item.propTypes = {
    name: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    completed: React.PropTypes.bool.isRequired,
    editing: React.PropTypes.bool.isRequired
};

export default Item;