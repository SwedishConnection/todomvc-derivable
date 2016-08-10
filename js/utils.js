
const onEnter = (fn) => {
    return ev => {
        if (ev.which === 13) {
            fn(ev);
        }
    }
};

const isHidden = (todo, flag) => {
    return ((flag === 'Active' && todo.completed) || (flag === 'Completed' && !todo.completed))
};


let id = 0;
const nextId = () => {
    return id++;
}


export { onEnter, isHidden, nextId };