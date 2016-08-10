import {atom, derive, derivation} from 'derivable';
import nomut from 'immutable';


// Atoms
const Todos = atom(nomut.Map());

const Showing = atom('All');



// Derivables
const TotalCount = Todos
    .derive(v => v.size);

const NotCompletedCount = Todos
    .derive(v => v.filter(x => !x.completed).size);

const IsAllCompleted = TotalCount
    .and(NotCompletedCount.not())
    .derive(v => v ? true : false);

const IsAllActive = TotalCount
    .is(NotCompletedCount)
    .derive(v => v ? true : false);


// Reactions
Todos.react( x => {
    localStorage['todos-derivable'] = JSON.stringify(x.toJS());
});


// Derivations (bundles)
const AppDerivation = derivation(() => {
    return {
        todos : Todos.get(),
        showing: Showing.get(),
        notCompletedCount : NotCompletedCount.get(),
        isAllCompleted : IsAllCompleted.get(),
        isAllActive: IsAllActive.get()
    };
});


export { AppDerivation, Todos, Showing, NotCompletedCount, IsAllCompleted, IsAllActive };