import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import List from './List.jsx';
import nomut from 'immutable';


const App = ({todos, showing, notCompletedCount, isAllCompleted, isAllActive}) => {
    return (
        <div>
            <Header />
            <List todos={todos} showing={showing} isAllCompleted={isAllCompleted}/>
            <Footer totalCount={todos.size} 
                notCompletedCount={notCompletedCount} 
                isAllActive={isAllActive}/>
        </div>
    );
};

App.propTypes = {
    todos: React.PropTypes.instanceOf(nomut.Map).isRequired,
    showing: React.PropTypes.string.isRequired,
    notCompletedCount: React.PropTypes.number.isRequired,
    isAllCompleted: React.PropTypes.bool.isRequired,
    isAllActive: React.PropTypes.bool.isRequired
};

App.defaultTypes = {
    todos: nomut.Map(),
    showing: 'All',
    notCompletedCount: 0,
    isAllCompleted: false,
    isAllActive: false
};


export default App;