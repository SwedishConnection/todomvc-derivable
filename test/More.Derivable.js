import {expect} from 'chai';
import nomut from 'immutable';
import {atom, derivation} from 'derivable';



describe('Basic', () => {

    it('No graph until after the first get', () => {
        let num = atom(5);
        let str = atom('cats');

        let combo  = derivation(() => {
            return num.get() + ' ' + str.get();
        });

        // graph not established yet
        expect(num._children.length)
            .to.equal(0);
        expect(str._children.length)
            .to.equal(0);

        // get forces the graph
        expect(combo.get())
            .to.equal('5 cats');

        // bi-directional relationships    
        expect(num._children.length)
            .to.equal(1);
        expect(str._children.length)
            .to.equal(1);
        expect(combo._parents.length)
            .to.equal(2);
    });

    it('No graph until force', (done) => {
        let num = atom(5);
        let str = atom('cats');

        let combo  = derivation(() => {
            return num.get() + ' ' + str.get();
        });
        let reactor = combo.reactor(v => { done(); });

        // no effect on the reactor
        num.set(2);
        
        // can force a graph 
        reactor.force();
    });

    it('Destructuring a big atom', () => {
        let big = atom({
            name: 'Gary',
            likes: ['fishing', 'episodes of Lost'],
            married: false
        });

        let [name, married] = big.derive(['name', 'married']);

        expect(name.get())
            .to.equal('Gary');
    });

    it('Swapping', () => {
        let num = atom(5);

        num.swap((v, factor) => v * factor, 2);

        expect(num.get())
            .to.equal(10);
    });

    it('Validation', () => {
        let num = atom(5)
            .withValidator((v) => typeof v === 'number');

        expect(() => {num.set('2')})
            .to.throw(Error);
    });

    it('Forcing reactors with set', (done) => {
        let num = atom(5);
        let str = atom('cats');

        let combo  = derivation(() => {
            return num.get() + ' ' + str.get();
        });
        let upper  = combo.derive(v => v.toUpperCase());

        var last = 'nobody';
        // using react the reactor is forcably started just not executed on the first change (i.e. get)
        let reactorOne = combo.react(
            v => { 
                last === 'nobody' ? last = 'one' : done();
            }, { skipFirst: true });
        let reactorTwo = upper.react(
            v => { 
                done(); 
            }, { skipFirst: true });
        
        num.set(2);
    });
});