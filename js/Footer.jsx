import React from 'react';
import {clear} from './actions';

const Footer = ({totalCount, notCompletedCount, isAllActive}) => {
    return (
        <footer className="footer" style={{display: totalCount === 0  ? 'none': 'block'}}>
            <span className="todo-count">
                <strong>{notCompletedCount}</strong> left
            </span>
            <ul className="filters">
                <li>
                    <a href='#/'>All</a>
                </li>
                <li>
                    <a href='#/active'>Active</a>
                </li>
                <li>
                    <a href='#/completed'>Completed</a>
                </li>
            </ul>
            <button className="clear-completed"
                style={{display: isAllActive  ? 'none': 'block'}}
                onClick={clear}>
                Clear completed
            </button>
        </footer>  
    );
}

Footer.propTypes = {
    totalCount: React.PropTypes.number.isRequired,
    notCompletedCount: React.PropTypes.number.isRequired,
    isAllActive: React.PropTypes.bool.isRequired
};

Footer.defaultTypes = {
    totalCount: 0,
    notCompletedCount: 0,
    isAllActive: false
};

export default Footer;