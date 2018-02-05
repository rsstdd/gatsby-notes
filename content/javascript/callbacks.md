---
title: "Closures and Callbacks"
cover: "https://s3.amazonaws.com/rsstdd-portfolio/js.png"
date: "02/02/2018"
category: "tech"
tags:
    - programming
    - javascript
    - closures
---

# Closures and Callbacks

Functions are the foundation of applications and are particularly important in JavaScript because JavaScript supports first-class functions, functions as objects, runtime function definition, etc. Because of this, you can use JavaScript functions in interesting ways. JavaScript uses _lexical scoping_, which means that functions are executed using the variable scope that was in effect when they are defined and not the variable scope that is in effect when they are invoked, and because of this, _closures_ exist in JavaScript. Closures are commonly used to give objects data privacy and are also __used to feed data to event handlers or callbacks, which might get triggered after the containing function has finished__.   

## Terms:
* __Closure__ - Closures are functions that have references to independent (free) variables. These are functions that have reference and access to variables in the outer environment. Put another way, closures are a function that has access to the scope where it was created. Therefore, a closure stores function state, even after the function has returned.
  - Using closures, you can have a function that returns a function.
  - Every execution context has a space in memory where variables and functions created inside of it live. When the execution context goes away, the memory is still there before garbage collection takes care of it. Any Functions invoked afterwards have access to the outer lexical environment reference. Even though the execution context may be gone (it has popped off the stack), any inner function still has reference to the outer execution context's memory though the scope chain - even if it is removed from the stack.
  - Closures are a feature of the JavaScript programming language, and it does not matter _when_ a function is invoked. The javaScript engine assures that the scope is intact.
* __Free Variables__ - variables that are used locally but defined in an enclosing scope.
* __Callbacks__ - Callbacks are functions that you pass as arguments to be invoked when the callee has finished its task. Usually, callbacks are passed to event handlers, Ajax requests, and timers.
* __First-Class Functions__ - First-class functions (or function literals) treat functions as first-class objects. Essentially this means that functions are __Objects.__ Because of this, the language supports:
  - constructing new functions during the execution of a program
  - storing functions in data structures
  - passing functions as arguments to other functions
  - adding properties to functions
  - returning functions as the values of other functions
  - First-Class functions are Objects with a type and behavior. First-Class functions can be dynamically built, passed around like any other object, and also invoked. Everything you can do with other types, you can do with functions (assign them to variables, pass them around, and create them 'on-the-fly').
* __Function Expression__ - An __expression__ is a unit of code that results in a value (does not have to be saved  to a variable), then a __function expression__ is a function that returns a value. A function expression is a component of a larger expression syntax, which is usually a variable assignment (think named function expressions) but can, however, remain anonymous. A good way to spot a function expression is that it will not be defined with the keyword `function`. Because JavaScript functions are objects, you can have both function expressions and function declarations.
  - function expressions are not hoisted because variable declarations are initially set to undefined.
  - Functional programing and function expressions
* __Lexical environment__ - JavaScript uses _lexical scoping_, which means that variables declared outside of a function are global variables and are visible everywhere in a program while variables declared inside of a function have function scope and are visible only to code that appears inside that function.
* __Higher-Order Function__ - A higher-order function either accepts a function as an argument or returns a function. Higher-Order functions are possible because functions are first-class. They are objects. In other words, a higher-order function is a function that consumes or returns functions as data. Lamdas (a function that returns data/function expressions) get passed to and/or returned from higher-order functions.
  - Higher-Order functions treat functions as data. They take either a function as an argument or return a function as a result.


### Let's build a Callback.
```js
function saySomething() {
  const something = 'Callback';

  setTimeout(() => {
      console.log(something);
    }, 3000);
}

saySomething();
```
That's it.

This uses function expressions and closures and callbacks. You are passing a function as a parameter. Since you are creating the function inside of the argument, you are taking advantage of a function expression.

## Resources:

[Alicia, Anthony. "Understanding the Weird Parts" _Udemy_](https://www.udemy.com/understand-javascript/learn/v4/t/lecture/2258228?start=0)

["Closures." _MDN_.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

[JavaScript: The Definitive Guide](https://www.amazon.com/JavaScript-Definitive-Guide-David-Flanagan/dp/0596101996/ref=sr_1_2?ie=UTF8&qid=1487718265&sr=8-2&keywords=javascript+the+definitive+guide)

[Elliot, Eric. "Programming JavaScript applications"](https://www.amazon.com/Programming-JavaScript-Applications-Architecture-Libraries-ebook/dp/B00LAHNPUE/ref=sr_1_1?s=books&ie=UTF8&qid=1487718330&sr=1-1&keywords=programming+javascript+applications)

[Callback Hell](http://callbackhell.com/)

[JavaScript is Sexy](http://javascriptissexy.com/understand-javascript-callback-functions-and-use-them/)
