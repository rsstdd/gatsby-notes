---
title: "Seattle Area Interview Questions Spring 2017"
cover: "https://s3.amazonaws.com/rsstdd-portfolio/bierdstadt.png"
date: "02/21/2018"
category: "tech"
tags:
    - programming
    - javascript
    - interview
---

# Seattle Area Interview Questions Spring 2017

## Snap! Raise.

### cohesion  & coupling?

### Explain 0n + 1

### What is Active Record?

### Explain the difference between a hash and an array?

### Can you write SQL raw queries?

### Are you familiar with the different SQL joins?

### What is OOP?
[Read more here](./oop.md)

### Explain Prototypical inheritance in JS

### What is your dev environment?

### Do you use Github’s GUI or do you stick to the command line?

---

## Migo

### Does Knex handle Connection Pooling?

Yes, knex.js handles connection pooling by using the [generic pool library](https://github.com/coopernurse/node-pool). The connection pool has a default setting of  2 and a max of 10 for the MySQL and PG libraries, but it uses a single connection for sqlite3 because of problems with handling multiple connections on a single file. Developers can configure the pool size by passing a pool option as one of the keys in the initialize block (seen below). If you ever need to explicitly remove the connection pool, you may use knex.destroy( [callback] ). You can use knex.destroy by passing a callback or by chaining as a promise, not both.  
Example of pool configuration in the initialize block:
```JavaScript
		const knex = require('knex')({
			client: 'mysql',
			connection: {
				host : '127.0.0.1',
				user : 'your_database_user',
				password : 'your_database_password',
				database : 'myapp_test'
			},
			pool: { min: 0, max: 7 }
			});
```
### What are generators?

[Read more here](https://github.com/rsstdd/learn_web_dev/blob/master/iterators_generators_asyncawait.md)

Generators are part of the ES6 Specification and allow developers to postpone the execution of a function, complete other computations and then return to complete the execution. In other words, a generator is a function that can pause and resume execution. Some of the best applications of generators are implementing iterables and blocking on asynchronous function calls. Each pause/resume cycle of a generator allows for two-way message-passing. The generator can return a value, and the controlling code that resumes it can send a value back in.
### What is a promise?

[Read more here](https://github.com/rsstdd/learn_web_dev/blob/master/promise.md)

A promise is an object used for asynchronous computations. It represents a value that may be available now, in the future, or never. Essentially, a promise is an object that stores information about whether asynchronous events have happened as well as the outcome of those events. A promise has three possible states: pending, fulfilled, and rejected and can only be in one state at a time. Another benefit of promises is the separation of error handling from success handling. Promises are also useful because they can be chained with the .then( ) method, which allows asynchronous code to remain "flat" (which is why we hate callbacks).

### What is Async / await?

[Read more here](https://github.com/rsstdd/learn_web_dev/blob/master/iterators_generators_asyncawait.md)

Async / await is a part of the ES7 specification, and are currently only available with a transpiler like babel.
This async function can be used by including the 'async' keyword before the function declaration, which will allow the use of the 'await' keyword inside of the newly created async function. Async / await is similar to generators in that it suspends execution in the function context until the promise resolves, and if the awaited expression is not a promise, it is cast into a promise.

### Other than a Promise, what are some ways to handle async actions?

Callbacks, Generators, and async / await are all relatively new ways that JavaScript handles asynchronous actions.

### What is CORS?

[Read more here](https://github.com/rsstdd/learn_web_dev/blob/master/node/cors.md)

Cross Origin Resource sharing is an HTML5 feature that allows one site to access another site's resources despite having different domains. This feature was implemented to overcome the limitations of the same-origin policy. Previously, JSON-P (kind of a hack) was used to get around the same-origin policy. With the adoption of CORS, developers can now leverage cross-origin images, stylesheets, scripts, iframes, web fonts, AJAX API calls, videos, scripts, etc to improve web applications.

### __How do you get around CORS?__

[Read more here](https://github.com/rsstdd/learn_web_dev/blob/master/node/cors.md)

To prevent CORS, restrict the access headers that your server responds with. If the question is how do you get around the same-origin policy, the answer is through CORS or JSON-P.

### __How are you storing the data from your Arduinos?__

[Read more here](https://github.com/rsstdd/learn_web_dev/blob/master/node/socketio.md)

The data from the Arduino is being "stored" or transferred by a stream.
If your sensors were being controlled from a single board, how would you distinguish the data between the different sensors?
What is one of the biggest technical challenges you think Migo will face?
What do you think of when you think of a computer?

---

## Azuqua

### Solve a pretty straightforward nested looping problem, but optimize it to have a smaller big O

### Use their internal software to implement an API call and parsing of the data

### Use pointers to traverse through nested objects that can have either arrays or pure objects. (Similar to how underscore works). Think of edge cases where your code might break

## Microsoft

### Write binary search with recursion and then with loops

### Design an experiment to show that code you wrote is successful at its goal of improving the user’s ability to accomplish a task / how you could make a profit off of it

### Write an algorithm to determine if two string are anagrams of one another (hash table)

### Write an algorithm that returns the number of palindromes in a string. This is easy to do in O(n^2), but it can be done in O(n) if you’re thoughtful about how you loop through the string. (Algo, not DS problem)

>They asked us to post our questions on glassdoor, so more should be here soon: https://www.glassdoor.com/Overview/Working-at-InConsulting-EI_IE1309800.11,23.htm
