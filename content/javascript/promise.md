---
title: "Promises: You'll probably be asked about this in an interview"
cover: "https://s3.amazonaws.com/rsstdd-portfolio/js.png"
date: "02/02/2018"
category: "tech"
tags:
    - programming
    - javascript
    - promises
---

# Promises

[Are you a visual learner? Take a look at this project by Nicolás Bevacqua.](https://github.com/bevacqua/promisees)

----

## Definition

A __promise__ is an object used for asynchronous computations. It represents a value that may be available now, in the future, or never. Essentially, a promise is an object that stores information about whether asynchronous events have happened and what the outcome is.

## Advantages of a Promise

  1. Separate success handling logic from the error handling logic
  2. Avoid callbacks and callback hell
  3. Offers a concise way to work with asynchronous JavaScript code.

## Syntax

* ES6 Promises are instances of the built-in `Promise` and are created by calling `new Promise` with a single function as an argument.

```javascript
  new Promise( /* executor */ function(resolve, reject) { . . .} );
```

### Parameters

* __Executor__
  * A function with the arguments __resolve__ and __reject__. This function is immediately invoked by the Promise implementation, passing __resolve__ and __reject__ functions.
  * The executor starts an asynchronous operation.
* `resolve` and `reject` are callable functions that take an argument which represents the event's details. Calling either `resolve` or `reject` will mark the promise as resolved and cause any handlers to be run.

**NOTE:** A promise can be resolved with the state of another promise, and this is why the function is called `resolve()` and not `fulfill()`.

***

## A Promise's Possible States:
* Promises are created inside of asynchronous functions and then returned.
* Success and failure handlers are attached to the promise.
* A Promise has three possible states:
  * __Pending__ - not fulfilled or rejected (unresolved)
  * __Fulfilled__ - the operation completed successfully (resolved)
  * __Rejected__ - the operation has failed (resolved)
* A promise can only represent one event and it can only be in one state at a time. Each function (`reject(), resolve(), fulfill()`) permanently changes the state of the promise. Once a promise is resolved, its state can not be reverted.
* A new Promise is initially in a Pending state. It can either be _fulfilled_ with a value or _rejected_ with an error. When this happens, the associated handlers are queued up by a promise's `.then()` method.
  * Note that __race conditions__ are avoided because handlers attached to a promise in a fulfilled or rejected state will also be called.

## Handling Success or Failure
* A promise is resolved when the asynchronous operation has completed. To access the result of the callback, use the `.then()` method to register a handler. These callbacks will be invoked with the result of the executor when the promise is fulfilled.
* If a promise is rejected, you can access the error by using the  `.catch()` method to register a callback.
  * Alternatively, a rejection handler can be used as a second parameter in the `.then()` callback.
* `.then()` will always return a promise. Therefore, you can chain them and still have "flat" code.

## Chaining Promises

* You can chain promises by using consecutive`.then()` methods. Return values will be provided as an argument to the next `.then()` when it is chained.

```javascript
invokePromise()
  .then((promiseValue) => {
    return 'I am a return value'
  })
  .then((returnValueStr) => {
    console.log(returnValueStr);  // I am a return value
  })
  .catch((err) => {
    console.error(err);
  });.
```
* If the promise's `.then()` method returns another promise, the next `.then()` method is called once the promise resolves. If the promise is rejected, the `.catch()` method is invoked.

```javascript
invokePromise()
  .then((promiseValue) => {
    return invokeAnotherPromise()
  })
  .then((anotherPromiseValue) => {
    console.log(anotherPromiseValue);
  })
  .catch((err) => {
    console.error(err);
  });
```
* If an error is thrown in a promise, the the next `.catch()` method (or the next `.then()` with a rejection handler) handles the error.

```javascript
invokePromise()
  .then((promiseValue) => {
    throw new Error('Boo')
  })
  .then((anotherPromiseValue) => {
    // Never called
  })
  .catch((err) => {
    console.error(err);  // Boo
  });
```
*  `return` goes to the next `.then()`, and `.throw()` goes to the next `.catch()`.
* A good pattern is to put a `.catch()` on the end of every `.then()` chain.

### Diagram of Promise

```text

 new Promise(executor)          then(onFulfilled)                  New Promise()
┌──-----------─┐             ┌──-------------------──┐            ┌──────-------─┐
│              │             │                       │─ fulfill ─▶│              │
│              │── fulfill ─▶│                       │   return   │              │
│              │             │                       │            │              │
│              │             │                       │─  reject -▶│              │
│              │             └───────────────────────┘    throw   │              │
│  Pending     │                                                  │              │
│              │             ┌── catch(onRejected) ──┐            │              │
│              │             │                       │─ fulfill ─▶│              │
│              │             │                       │   return   │              │
│              │── reject ──▶│                       │            │              │
│              │             │                       │─  reject ─▶│              │
└───--─────────┘             └───────────────────────┘   throw    └────────────-─┘
```

## Creating Promises

Promises are created through the `Promise` constructor function. The promise accepts a callback with two arguments: `resolve` and `reject`. Both are functions: `resolve` gets executed when the promise is fulfilled, `reject` gets executed when the promise is rejected. In the `then` callback, the first argument refers to `resolve`, and the second refers to `reject`.

```js
var myPromise = new Promise(function(resolve, reject) {
  var time = 10000;
  setTimeout(() => {
    return time < 5000 ? resolve() : reject();
  }, time);
})
.then(() => "That was quick";
}, () => "Still Waiting"
});
```

## Error Handling
In native promises, developers can catch errors with the `catch` method.

### Syntax
```js
  p.catch(onRejected);

  p.catch((reason) => {
    //rejection
  })
```

### Parameters
* __onRejected__ - `onRejected` is a function that is called when the promise is rejected. This function has one argument: __resason__.
  * The promise returned by catch() is rejected if `onRejected` throws an error or returns a Promise which is itself rejected; otherwise, it is resolved.

***

## Promise.all([promise1, promise2, ...])
* `Promise.all` takes an array of promises and returns a promise that resolves when _all_ of its arguments (promises) have resolved or is rejected when _any_ of its arguments are rejected. Once all promises are resolved, one callback is fired.
  * The return value is an array containing the results of every promise.
* Use this for running animations concurrently or multiple DB requests concurrently.

### Syntax
`Promise.all` waits for all fulfillments (or the first rejection).

```javascript
const p1 = Promise.resolve(3);
const p2 = 1337;
const p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([p1, p2, p3]).then(values => {
  console.log(values); // [3, 1337, "foo"]
});
```

***

## Promise.resolve(value)
* `Promise.resolve(value)` returns a promise that is resolved with the given value. If the value has a `.then()` method, the returned promise will follow that "thenable", adopting its eventual state. Otherwise, the returned promise will be fulfilled with the value.
* Useful when you need a promise and don't have one - when you're building an array of promises to pass to `Promise.all`, or if the argument to a function is a promise or a value.

### Syntax

```javascript
Promise.resolve(value);
Promise.resolve(promise);
Promise.resolve(thenable);
```
#### Examples: Resolving thenables and throwing Errors:
```javascript
// Resolving a thenable object
const p1 = Promise.resolve({
  then: function(onFulfill, onReject) { onFulfill('fulfilled!'); }
});
console.log(p1 instanceof Promise) // true, object casted to a Promise

p1.then(function(v) {
    console.log(v); // "fulfilled!"
  }, function(e) {
    // not called
});

// Thenable throws before callback
// Promise rejects
const thenable = { then: function(resolve) {
  throw new TypeError('Throwing');
  resolve('Resolving');
}};

const p2 = Promise.resolve(thenable);
p2.then(function(v) {
  // not called
}, function(e) {
  console.log(e); // TypeError: Throwing
});

// Thenable throws after callback
// Promise resolves
const thenable = { then: function(resolve) {
  resolve('Resolving');
  throw new TypeError('Throwing');
}};

const p3 = Promise.resolve(thenable);
p3.then(function(v) {
  console.log(v); // "Resolving"
}, function(e) {
  // not called
});
```

## Promise.reject(value)
* The `Promise.reject(reason)` method returns a `Promise` Object that is rejected with the given reason. It's useful to make `reason` an instance of `Error`.
* The return value is a `Promise` that is rejected with the given reason.
* Useful when you want to process error objects in a `catch` handler but do not want to return a _successful_ promise afterward.

### Examples:
```javascript
Promise.reject(new Error('fail')).then(function(error) {
  // not called
}, function(error) {
  console.log(error); // Stacktrace
});
```
***

## Resources:
[jamesknelson.com](http://jamesknelson.com/grokking-es6-promises-the-four-functions-you-need-to-avoid-callback-hell/)

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

[Promises - In Wicked Detail](http://www.mattgreer.org/articles/promises-in-wicked-detail/)

[Promises/A+ specification](https://promisesaplus.com/)

[The Evolution of Asynchronous JavaScript](https://blog.risingstack.com/asynchronous-javascript/)

[JavaScript Promises David Walsh Blog](https://davidwalsh.name/promises)
