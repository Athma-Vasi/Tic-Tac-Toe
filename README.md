# Tic-Tac-Toe

Tic-Tac-Toe as part of The Odin Project curriculum

[Click here to view live project](https://athma-vasi.github.io/odin-Library/)

## Things I learned

### Scope, Closure, Hoisting, and `this`

To better understand factory functions and IIFEs, I first had to learn scope, closure and `this`. Scope can be thought of as a series of bubbles that each act as a container in which identifiers (variables, functions) are declared that we have access to when a piece of code is running, and this nesting is defined at author-time.

A closure is the combination of a function bundled together with references to its surrounding state, allowing access to an outer function's scope from its inner function. Lexical scope means that scope is defined by author-time decisions of where functions are declared.

Hoisting is when variable and function declarations are moved from where they appear in the normal flow to the top of the code, per scope. Function declarations are hoisted first, then variable declarations, and these come before assignments.

`this` is a binding that is made when the function is invoked and what it references is determined entirely by the call-site (always one stack before currently executing function) where the function is called, not where it is declared, and not author-time binding but run-time binding. Order of precedence: `new` binding > explicit binding (`call`, `apply`) > implicit binding (`.` method calls) > default binding (!'use strict' ? `this` points to global object : undefined)

### Factory functions

I learned the differences and similarities between factory function pattern and constructors and used it to create a new
Player object when called. The rest of the game logic was bound inside IIFEs.

### IIFE Module Pattern

I wrapped all functions inside an IIFE where the function name is directly bound inside of the IIFE and not in the global scope, avoiding polluting the enclosing function scope or global namespace.
