---
title: "Automated JavaScript Testing"
cover: "https://s3.amazonaws.com/rsstdd-portfolio/js.png"
date: "02/02/2018"
category: "tech"
tags:
    - programming
    - javascript
    - testing
---


# Automated JavaScript Testing

## Resources:
[mock-fs](https://www.npmjs.com/package/mock-fs) - module that allows Node’s built-in fs module to be backed temporarily in-memory. It's a mock file system. allows you to test against a set of mock files and directories.

[Chai Assertion Library](http://chaijs.com/api/assert/) - BDD/TDD assertion library for node and the browser that can be paired with any js testing framework

[Mocha](https://mochajs.org/) - JavaScript test framework running on Node.js and Browser, making async testing  simple. Tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases

[nock](https://github.com/node-nock/nock) - HTTP mocking and expectations library for Node.js that can be used to test modules that perform HTTP requests in isolation

[supertest](https://github.com/visionmedia/supertest) - HTTP assertions made easy. The motivation with this module is to provide a high-level abstraction for testing HTTP, while still allowing you to drop down to the lower-level API provided by superagent.

[Istanbul](https://www.npmjs.com/package/istanbul) - Yet another JavaScript code coverage tool that computes statement, line, function and branch coverage with module loader hooks to transparently add coverage when running tests. Supports all JavaScript coverage use cases including unit tests, server side functional tests
* npm run coverage
* $ open coverage/lcov-report/javascript-test-coverage/index.html

## Terms:
* __Unit Tests__ - tests that isolate specific pieces of code. Helpful during development because when a unit test fails, we can isolate the area of code where the bug is.
  * Tests are done on functions
  * thus, you need stubs, or functions that return an expected output.
  * type of white box testing, or writing tests with knowledge of the internal workings of code we are testing
* __Integration Tests__ - broader in scope, integration tests make no attempt to understand the inner workings of a function - also called black box testing (verify that a program works without peering into a module’s inner structures. Info is passed in via its inputs and assertions are made on the information passed out of the module)
  * meant to test the overall functionality of a function, module, or API
  * work on larger pieces of code
  * If the test passes, the software works. if it fails, it’s not apparent where the bug is
  * Verify functional, performance, and reliability requirements placed on the major use cases of a program
* ensures that multiple parts of a use case work together as a developer expects

## Mocha and Chai
* Each test handles a specific aspect of functionality for a particular function
* mocha groups these tests into a suite, which helps in understanding the overall functionality and then ideally the specific aspect to look at.

## [Chai Assertion Library](http://chaijs.com/api/assert/)
__Chai__ - is an assertion library. Essentially, an assertion is a statement that is always expected to evaluate to true. If false, an error is thrown If a test is finishes with no errors thrown, the test is considered successful.
  * assertions can be used in code to maintain expectations, but we often see them in tests. Chai offers many methods in performing our checks.
  * For equality checks, it has the strictEqual method, which is ===

First parameter is the _actual_ result. This is the part that your code generates. The second parameter is what you expect your code to produce. This is important for messaging in the test suite
  * assert.strictEqual(actual, expected[, message]);
  * For objects and arrays, strictEqual will not test the content inside the object or array. It will only test the reference. Chai offers a different method, deepEqual to handle this check.
  ```javascript
    'use strict';

    const assert = require('chai').assert;
    const { suite, test } = require('mocha');
    const { toSentence } = require('../index');

    suite('toSentence function', () => {
      test('converts to a sentece without oxford comma specified', () => {
        assert.strictEqual(toSentence('', '', '', false), ', and .');
        assert.strictEqual(toSentence('Huey', 'Dewey', 'Louie', false), 'Huey, Dewey and Louie.')
      });

      test('converts to a sentence with oxford comma specified', () => {
        assert.strictEqual(toSentence('', '', '', true), ', , and .');
        assert.strictEqual(toSentence('Huey', 'Dewey', 'Louie', true), 'Huey, Dewey, and Louie.')
      });
    });


  ```

## Asynchronous Testing
* each test function allows you to specify a 'done' parameter - if the parameter is not specified, it will wait until the function completes.
* request-promise - a request library
* The test is not complete until the done argument is called. If the done argument is called with an error, the test has failed.

### Removing Variability
* to keep tests consistent, we need to stub our request using nock
    * `$ npm install —save-dev nock`
    * __nock__ - the library intercepts requests and produces expected responses.
    * nock’s docs

__TDD__
1. Add a test
2. Run All tests to ensure new test fails
3. Write the code. Refactor if needed
4. Run tests
5. repeat

__TDD example:__
* mocha allows code to be run before and after each suite is run (using before and after); it also allows before and after each test (using beforeEach and afterEach)

1. Save testing modules to dev dependencies.
2. Crate a Test file.
3. Pull in Your own code/various parts of the testing framework like expect
4. these will like in ./node_modules/.bin, add scripts to make this easier to access.

### Integration test example:
```javascript
'use strict'

const { assert } = require('chai');
const { suite, test } = require('mocha');
const Binary = require('../Binary');

suite('Binary', () => {
  test('Converts to zero decimal by default'. () => {
    const binary = new Binary();
    const actual = binary.toDecimal();
    const expected = 0;

    assert.strictEqual(actual, expected);
  });

  test('converts to one decimal', () => {
    const binary = new Binary();
    const actual = binary.toDecimal();
    const expected = 1;

    assert.strictEqual(actual, expected);
  });

  test('converts to two decimal', () => {
    const binary = new Binary('10');
    const actual = binary.toDecimal();
    const expected = 2;

    assert.strictEqual(actual, expected);
  });

  test('converts to 42 decimal', () => {
    const binary = new Binary('101010');
    const actual = binary.toDecimal();
    const expected = 42;

    assert.strictEqual(actual, expected);
  });
});
```
