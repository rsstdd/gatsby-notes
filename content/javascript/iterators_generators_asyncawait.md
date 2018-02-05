---
title: "The Future of Asynchronous JavaScript"
cover: "https://s3.amazonaws.com/rsstdd-portfolio/js.png"
date: "02/02/2018"
category: "tech"
tags:
    - programming
    - javascript
    - asynchronous
---

# Future of Asynchronous JavaScript

## Iterators
* An __iterator__ is an object that is able to access individual items from a collection while tracking its current position within that sequence. In JavaScript, an iterator is an object that provides a `.next()` method which returns the next item in the sequence along with two properties: `done` and `value`.
* Once created, an iterator object can be used explicitly by repeatedly calling  `.next()`.
* Use an iterator to:
  1. Implement a utility that produces a new unique identifier each time it's requested
  2. Produce an infinite series of values that rotate through a fixed list
  3. Attach an iterator to a database query result to pull new rows one at a time.
* With iterators, you can control behavior one step at a time.

### Examples:

```javascript
function makeIterator(array) {
  const nextIndex = 0;

  return {
   next: () => {
     return nextIndex < array.length ?
       {value: array[nextIndex++], done: false} :
       {done: true};
    }
  };
}
```

Once initialized, the `.next()` method can be called to access key-value pairs from the object in turn:

```javascript
var it = makeIterator(['yo', 'ya']);
console.log(it.next().value); // 'yo'
console.log(it.next().value); // 'ya'
console.log(it.next().done);  // true
```

To iterate through a string:

```javascript
var greeting = "hello world";

var it = greeting[Symbol.iterator]();

it.next();      // { value: "h", done: false }
it.next();      // { value: "e", done: false }
..
```

## Generators & yield
* JavaScript Generators are a part of the ES6 Specification.
* Generators allow you to postpone the execution of a function, complete other computations and then return to complete the execution. In other words, a generator is a function that can pause and resume execution.
* The best use case for generators are:
  * Implementing iterables
  * Blocking on asynchronous function calls
* Each pause/resume cycle in mid-execution allows for two-way message-passing. The generator can return a value, and the controlling code that resumes it can send a value back in.
* Generator objects conform to both the _iterable_ protocol and the _iterator_ protocol.

#### Syntax

```javascript
function *gen() {
  yield 1;
  yield 2;
  yield 3;
}

const g = gen(); // "Generator { }"

g.next(); // { value: 1, done: false }
```

* Uses a _generator_ function that, when called, returns an _iterator object_.
  * When a generator function is called, it doesn't run. You must iterate through it manually.
  * With the iterator object, one can iterate through the function.
  * Call the `.next()` method of the iterator object to continue the execution of the function. When `.next()` is called, the function continues where it left off and executes until it hits a pause. Additionally, an object that contains information about the state of the generator is returned.
    * This object has a `value` and a `done` property.
    * The `value` property is the current iteration value, which can be anything. The `done` property is a boolean, which indicates that the generator is finished running.
  * If you specify a `return` value in a generator, it will be returned in the last _iterator object_.
  * Every iteration through the generator function __yields__ a value where paused.
  * One can pause a generator function with the `yield` keyword.

### Yield
Generators have a new keyword that signals the pause point: `yield`

##### Syntax
```javascript
yield[[expression]]
```
* Calling `next()` starts the generator, and it runs until it hits a `yield`. When it encounters a `yield`, it returns the object with `value` and `done`, where `value` has the __expression__ value.
* The yielded value will be returned in the generator and it continues. It's also possible to receive a value from the iterator object in a generator (next(val)), then this will be returned in the generator when it continues.
* `yield` is meant for lazy sequences (one thing at a time) and iterators not specifically for asynchronous programming.
* Furthermore, `yield` is not just a pause point, but an expression that returns a value when pausing the generator.
* Context is preserved across suspensions and resumptions.

    ```javascript
    function *foo() {
      while (true) {
        yield Math.random();
      }
    }
    ```

* Whenever `.next()` is called on a generator, four events will suspend execution in the generator, returning an `IteratorResult` to the caller of `.next()`
  * `yield` <-- expression evaluates and returns _next_ value in sequence
  * `return` <-- returning to the last value in the sequence
  * `throw` <-- arrests execution of the generator
  * reaching the end `{ done: true }`
    * when the generator has iterated over a sequence, calling `.next()` will have no effect and return `{ done: true }`

## Async / await
* ES7 introduces Async functions, which are currently only available with a transpiler like babel.
* Use the `async` keyword before the function declaration, which will allow the use of the `await` keyword inside of the newly created async function.
* It is similar to generators in that it suspends execution in the context until the promise resolves. If the awaited expression is not a promise, it is cast into a promise. Again, it always returns a promise.

```javascript
async function save(Something) {  
  try {
    await Something.save()
  } catch (ex) {
    //error handling
  }
  console.log('success');
}
```

### Error Handling
* Just like with generators, it's a good idea to wrap `await` in `try` / `catch` so that you can capture and handle errors in awaited promises from within the `async` function.



## Resources

[Understanding JavaScript's async await](https://ponyfoo.com/articles/understanding-javascript-async-await)

[ES6 Generators in Depth](https://ponyfoo.com/articles/es6-generators-in-depth)

[The Evolution of Asynchronous JavaScript](https://blog.risingstack.com/asynchronous-javascript/)

[You Don't Know JS: ES6 & Beyond](https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20%26%20beyond/ch3.md)

[ES6 generators in depth](http://www.2ality.com/2015/03/es6-generators.html)
