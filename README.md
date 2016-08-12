# todomvc-derivable
This flavor of [Todo MVC](http://todomvc.com/) uses [React](https://facebook.github.io/react/) and a way to amplify state with [DerivableJS](https://github.com/ds300/derivablejs).  The creator of Derivable is David Sheldrick.  At the time of writing, Sheldrick works at Futurice which presented Derivable in a weekly online [meetup](https://www.youtube.com/watch?v=NmHRcC_l-14).  Sheldrick has a bunch of examples and tests for Derivable.  There is already a working example called **todo** that implements Todo MVC in React with Derivable.  What is different here is that the actual components are broken out and there are utilities for stores, actions etc. which resembles how React projects are structured.   Most of the components are stateless except for the Header and Derivable.  The latter is a higher order wrapper for the actual Application component.  It bundles derivables from a _common_ store (i.e. model) that are important for the top level component and reacts to changes which renders the Application.  Actions that interact with derivables (i.e. stuff in the store) are grouped together in one spot.

Why is Derivable interesting?  We did a [blog](https://medium.com/@matthew47671280/derivablejs-and-reactjs-63dcaf064117#.wqc7i4f9n) with more detail.

Javascript primitives are amplified as derivables and called atoms (mutable).  These atoms can be composed into new derivables (non-mutable).  We can either get the value of derivable or react to value changes.  The Derivable component reacts to a bundle of derivables.  The reacting processes is tied to the mounting and unmounting of the component.  This makes it easy to tie different models together and create custom views.  It is an approach that plays nicely with React.  Especially, when using stateless components.

There are some extra test cases that highlight times in DerivableJS.  These can be run with:

    node node_modules\mocha\bin\mocha --compilers .:.\test\compiler.js .\test\More.Derivable.js

Andrey Popp has a [nice set of higher order components](https://github.com/andreypopp/react-derivable) for DerivableJS.
