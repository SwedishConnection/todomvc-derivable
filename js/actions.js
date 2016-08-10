import {Todos, Showing} from './store';
import {nextId} from './utils';


const add = (name) => {
    Todos.swap(
        (a, n) => {
            if (n.trim().length === 0) {
                return a;
            } else {
                return a.set(nextId(), {name, completed: false, editing: false});
            }
        }, 
        name
    );
};

const remove = (id) => {
    Todos.swap(
        (a, i) => {
            if (a.has(i)) {
                return a.delete(i);
            }

            return a;
        }, 
        id
    );
}


const setShowing = (name) => {
    if (name.match('(All|Active|Completed)')) {
        Showing.set(name);
    }
};

const edit = (a, k, fn) => {
    if (a.has(k)) {
        return a.update(k, fn);
    }

    return a;
};


const toggleCompleted = (id) => {
    Todos.swap(
        edit, 
        id,
        (n) => {let {name, completed, editing} = n; return {name, completed: !completed, editing: editing}; }
    );
};

const markEdit = (id, flag=true) => {
    Todos.swap(
        edit, 
        id,
        (n) => {let {name, completed, editing} = n; return {name, completed: completed, editing: flag};}
    );
};


const setName = (id, name) => {
    if (name.trim().length === 0) {
        remove(id);
    } else {
        Todos.swap(
            edit, 
            id,
            (n) => {let {a,completed,c} = n; return {name, completed: completed, editing: false};}
        );
    }
};

const clear = () => {
    Todos.swap(
        (a) => {
            return a
                .filter(x => !x.completed);
        }
    );
};

const toggleAllCompleted = (flag) => {
    Todos.swap(
        (a, v) => {
            return a
                .map(x => {let {name, c, editing} = x; return {name, completed: v, editing: editing};});
        },
        !!!flag
    );
};


export {add, remove, clear, setShowing, toggleCompleted, toggleAllCompleted, markEdit, setName};