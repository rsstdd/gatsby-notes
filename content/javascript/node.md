---
title: "Node.js"
cover: "https://s3.amazonaws.com/rsstdd-portfolio/nodejs.png"
date: "02/02/2018"
category: "tech"
tags:
    - programming
    - javascript
    - node
---

# Node.js

[A Robust List of Node.j Resources](http://stackoverflow.com/questions/2353818/how-do-i-get-started-with-node-js)

## Introduction to Node
Node.js was created in 2009 by Ryan Dahl as an open-source, cross-platform JavaScript runtime environment for developing server tools and applications. Node uses Chrome's V8 engine to create an _event-driven_, _single-threaded_, _non-blocking_ I/O model that makes it lightweight and efficient. Node.js excels in real-time applications that run across distributed devices, and is useful for I/O based programs that need to be fast and/or handle lots of connections. Another benefit of Node.js is that it allows developers to use JavaScript, a language most web developers already know, to write programs (servers) that run directly on operating systems. Although Node.js has some powerful features, it should be avoided when working with CPU intensive applications.

### Terms
#### So what exactly does _event-driven_, _non-blocking_, and _single-threaded_ mean? And what is I/O?
* __Event-Driven__ - Event driven programming is when the application flow control is determined by events or changes in state. It generally has a central mechanism that listens for events and invokes a callback function once an event has been detected. In the case of Node.js, this is the event loop.
* __Non-Blocking__ - non-blocking code refers to operations that __do not block__ further execution until that operation finishes, which means that your program will not hang on a process that has to complete. Instead, commands execute in parallel and use callbacks to signal completion or failure.
* __Single-Threaded__ - A __thread of execution__ is the smallest sequence of programmed instructions that can be managed independently by a scheduler (a part of the OS). It is a kind of lightweight process, an independent execution unit with its own memory area, meaning that it shares memory with every other thread within the same process. Threads were created as an ad hoc extension of the former model to accommodate concurrency [(Teixeira)](#resources). In a single-threaded system, one command is processed at a time. Node.js' performance is attributed to being single-threaded, which bypasses thread context switching. That being said, the _true_ benefit of Node.js is that it is __much__ easier to reason about. Parallel applications are usually faster (they are, after all, performing tasks in parallel), but in a multi-threaded system there is much more complexity to manage. Node.js abstracts multi-threading away from the developer. In the background, Node.js uses a library called libuv to manage thread allocation to I/O tasks related to the operating system.
  * A downside to being single-threaded is that Node.js is not able to easily scale by increasing the number of CPU cores.
* __I/O__ - I/O is short for input/output and describes any program, any operation, or any device that transfers data to or from a peripheral device. Inputs are the signals or data received by a system and outputs are the signals or data sent from it.  
* You'll often hear __Asynchronous__ as well. Asynchronous means, in the case of Node.js, that the server can respond to multiple requests at a time. It’s really a term for a non-blocking task. It will not stop or block any API requests, reading/writing files, or timers, etc. and will respond to all when the response is ready to send accordingly. Working asynchronously allows you to start processing data that does not require the result of the communication while the communication goes on.

> From a developer's point of view, Node.js is single-threaded, but under the hood, Node uses __libuv__ to handle __threading, file system events, implements the event loop, features thread pooling__ etc. In most cases, you won't interact with libuv directly, but you should be aware of it because libuv is really the foundation of Node.js.

---

### Node Architecture
```
      +-------------------------------------------------------+
      |                                                       |
      |                       Node.js API                     |
      |                                                       |
      +------------------------------------+------------------+
      |                                    |                  |
      |         Node.js Bindings           |   C/C++ Addons   |
      |                                    |                  |
      +--------+--------+--------+---------+---------+--------+
      |        |        |        |   http  |   Open  |        |
      |  V8    | LibUv  | c-ares |  parser |   SSL   | zlib   |
      |        |        |        |         |         |        |
      +--------+--------+--------+---------+---------+--------+
```
* __V8__ is Google's open source JavaScript engine built for Google Chrome. It's written in C++ and can run either standalone or embedded into any C++ application.
* [libuv](http://nikhilm.github.io/uvbook/) is a multi-platform C library that provides support for asynchronous I/O based on event loops. It is used to abstract non-blocking I/O operations to a consistent interface across all supported platforms by providing mechanisms to handle file system, DNS, network, child processes, pipes, signal handling, polling and streaming. It also includes a thread pool for offloading work for some things that can't be done asynchronously at the operating system level. It supports epoll, kqueue, Windows IOCP, and Solaris event ports. And although It is primarily designed for use in Node.js, it is also used by other software projects.
  * It was originally an abstraction around libev or Microsoft IOCP, as libev doesn't support Windows. In node-v0.9.0's version of libuv, the dependency on libev was removed
  * Programming Model:
    * async APIs
    * heavy use of callbacks
    * structured Inheritance chain for request types
      * memory based inheritance
  * libuv has a default thread pool size of 4 and uses a queue to manage access to the thread pool.
    * You can increase the size of the thread pool through the `UV_THREADPOOL_SIZE` environment variable, as long as the thread pool is required and created: `process.env.UV_THREADPOOL_SIZE = 10`  
    * The absolute maximum number of threads is 128 [(libuv)](http://docs.libuv.org/en/v1.x/threadpool.html#threadpool)
  * __Features:__
    * Full-featured event loop backed by `epoll`, `kqueue`, `IOCP`, event ports.
    * Asynchronous `TCP` and `UDP` sockets
    * Asynchronous `DNS` resolution
    * Asynchronous file and file system operations
    * File system events
    * `ANSI` escape code controlled `TTY`
    * `IPC` with socket sharing, using Unix domain sockets or named pipes (Windows)
    * Child processes
    * Thread pool
    * Signal handling
    * High resolution clock
    * Threading and synchronization primitives

> Libuv is worth looking into, and a good introduction by Saul Ibarra Corretge can be found [here](http://www.slideshare.net/saghul/libuv-nodejs-and-everything-in-between).

* __c-ares__ - a C library for async `DNS` request, including name resolves. It is intended for applications that need to perform `DNS` queries without blocking, or need to perform multiple DNS queries in parallel.
* __http_parser__ - This is a parser for HTTP messages written in C. It parses both requests and responses, and is designed to be used in performance HTTP applications. It does not make any syscalls nor allocations, it does not buffer data, it can be interrupted at anytime.
* __OpenSSL__: Is an open source implementation of Secure Sockets Layer (SSL v2/v3) and Transport Layer Security (TLS v1) protocols as well as a full-strength general purpose cryptography library. It is based on SSLeay library and built using C. It provides all the necessary cryptography methods like hash, hmac, cipher, decipher, sign and verify methods.
* __Zlib__: Is a general purpose data compression library written in C (creates and reads zip files).

---

### Node Core
In the context of Node.js, "core modules" refer to the modules and bindings that are compiled into Node.js. Core modules are at the heart of Node.js, and the Node.js Bindings, which are written in C++, are a hook into the low-level functionality of C/C++ that handles TCP, HTTP, DNS, and the file system. The Node.js API is relatively small, consisting of about 27 core modules, and is most concerned with operating system tasks. Therefore, Node.js core modules have access to the following functions:

```javascript
* fs.readFile();
* fs.writeFile();
* path.join();
* http.createServer();
* server.listen();
```

Tasks like `readFile` and `writeFile` are called _blocking_ because they take time to complete. They are much slower than operations that use a CPU. For example, during a hard disk operation that takes 10ms to perform, a 1 GHz CPU would have performed ten million instruction-processing cycles.

### Asynchronous Node
All APIs of Node.js are _asynchronous or non-blocking_ (well, sorta. Bear with me.). This means that callbacks and promises are at the core of asynchronous Node.js. A simple definition of a [callback](../../javascript/callbacks) is a function passed as an argument to another function, and [more information about promises can be found here](./promises.md).

A common pattern of event-driven programming is succeed or fail. There are two common implementations of that pattern in Node.js. The first is through __Error-first callbacks__, which are widely used in Node by the core modules as well as most of the modules found on [npm](https://www.npmjs.com/). Although error-first callbacks sound complicated, they are actually quite simple. An error-first callback is simply a callback that accepts an error object as the first argument. If there is no error, the first argument is `null`. The second pattern uses [promises]('./promises.md'), which is an object used for asynchronous computations.

### Note:
* __error-handling__: instead of a `try-catch` block you have to check for errors in the callback
* __no return value__: async functions do not return values; however, values will be passed to the callbacks

> The focus of this will be understanding that async actions are completed through callbacks and __The Event Loop__.

---

### Event Driven Programming
__Event-driven programming__ is a programming paradigm in which the flow of the program is dictated by events (changes in state), including user actions, sensor outputs, or messages from other programs or threads. In this paradigm, every command is event based, which means that the program revolves around a loop that polls for input or data (or state change). When an event occurs, a callback is invoked. JavaScript is well suited to this programming style because it has first-class functions and closures.

In Node.js, events are emitted for every action, function, or job performed. Events in Node.js are similar to browser side events except on the server side, events are emitted by Node.js `EventEmitter` objects. According to the [Node.js documentation](#resources), "much of the Node.js core API is built around an idiomatic asynchronous event-driven architecture in which certain kinds of objects (called "emitters") periodically emit named events that cause Function objects ("listeners") to be called."

Node.js also employs an event loop, which is a construct that performs two tasks: __event detection__ and __event handler triggering__. The event loop detects which events just happened and also determines which event callback to invoke once an event has happened. The event loop is responsible for scheduling asynchronous operations and facilitates the event-driven programming paradigm in which the flow of the program is determined by said events [(Norris)](#resourses). In other words, applications act on events, and Node.js implements this through two mechanisms: the __event loop__ and the `EventEmitter` that listens for events and invokes a callback function once an event has been detected (i.e. state has changed) [(maxogden)](#resources).

Although V8 is single-threaded, the underlying C++ API of Node.js is not, which means that whenever we call something that is an I/O operation, Node relies on __libuv__ to run code concurrently with our javascript code. Once this thread (form _libuv_) receives a value, it awaits for data or throws an error, and then the provided callback is called with the necessary parameters.

  > Remember: in Node.js, there are two separate kinds of events. There are __system events__, which are lower-level events that are handed by libuv, and __custom events__, which originate from the `EventEmitter`. The `EventEmitter` is used by many of Node.js' core modules, including `Server`, `Socket`, and  `http`.

JavaScript code sometimes wraps calls to the C++ side of Node. Often, when an event occurs in libuv, it generates a custom event to make  it easier to manage our code and decide what code should run when that event happens. This makes it seem as though system events and custom events are the same. They are not.  

Node.js implements an event-driven approach by attaching listeners to events. When those events fire, the listener executes the provided callback. Whenever you call `setTimeout`, `http.get`, or `fs.readFile`, Node.js uses libuv to send these operations to a different thread. This allows V8 to keep executing code synchronously on the main thread. Node invokes the callback when the counter has run down or the I/O operation/http operation has finished. Therefore, you can read a file while processing a request in your server, and then make an http call based on the read contents without blocking other requests from being handled.

Node.js only provides __one thread and one call stack__, so when another request is being served as a file is read, its callback will need to wait for the stack to become empty.

To understand how this works, you must understand the __event loop__ and the __task queue__.

[Philip Roberts provides an excellent explanation of the JavaScript call stack and event loop as it exists in the browser.](https://youtu.be/8aGhZQkoFbQ) If you are not familiar with the way events occur in the browser, I suggest you start here.

Now, let's take a closer look at the Node.js event loop.

---

## The Event Loop In a little more detail
The Node.js event loop is actually the libuv I/O loop. It runs semi-infinitely under a single thread, and the JavaScript program code running in this thread is executed synchronously. The event loop follows the rather usual single-threaded asynchronous I/O approach: all (network) I/O is performed on non-blocking sockets, which are polled using the best mechanism available on the given platform: `epoll` on Linux, `kqueue` on OSX, and other BSDs, event ports on SunOS and `IOCP` on Windows [(libuv)](http://docs.libuv.org/en/v1.x/design.html). On each iteration, the loop will block while waiting for I/O activity on sockets that have been added to the _poller_ and callbacks will be fired indicating socket conditions (readable, writable hangup). Therefore, handles are able to read, write, or perform the desired I/O operation.


When Node.js starts, it initializes the event loop, processes the provided script or drops into the REPL. This may make asynchronous API calls, schedule timers, or call `process.nextTick()`. It then begins processing the event loop.

Every call that involves an I/O operation requires a callback to be registered. Certain functions and modules, usually written in C/C++, support asynchronous I/O. When asynchronous events are invoked, they are assigned a thread from the thread pool by libuv. This allows the program to perform multiple I/O operations in parallel with the main thread. When an I/O operation completes, its callback is pushed onto the event queue where it will be executed as soon as all other callbacks on that queue are invoked. In other words, every time a system call takes place, that event will be delegated to the event loop along with a callback function, or listener. When a thread in the thread pool completes a task, it is picked up by the main thread, which executes the registered callback. The main thread is _not_ tied up and keeps synchronously executing code. Since callbacks are handled synchronously on the main thread, long lasting computations and other CPU-bound tasks will block the entire event loop until completion.

Below is a digram of the components of Node.js' event loop. Here, each Box represents a "phase" of the event loop.  The event loop visits each of these in turn and executes code at each stage. When Node.js starts, the program initializes the event loop, processes the provided input script (or drops into the `REPL`) which may make async API calls, schedule timers, or call `process.nextTick()` before processing the event loop.

### Event loop's order of operations:
```

  +------->   +---------------------+
  |           | (Update Loop Time)  |
  |           +---------------------+
  |
  | +---------+     No   +-------------+
  | |   END   |  <------ | Loop Alive? |
  | +---------+          +-------------+
  |                Yes
  |                 |  
  |                 V                 
  |           +---------------------+
  |           |   Run Due Timers    |
  |           +---------------------+
  |  
  |           +---------------------+
  |           |   Call Pending      |    
  |           |    callbacks        |
  |           +---------------------+
  |
  |           +---------------------+
  |           |   Idle, prepare     |
  |           +---------------------+
  |
  |           +---------------------+
  |           |        Poll         | <-------------------+
  |           +---------------------+         +-----------|-----------+
  |                                           |                       |
  |           +---------------------+         |       Incoming:       |
  |           | Check Handle Cbks   |         |      Connections,     |
  |           +---------------------+         |       data, etc.      |
  |                                           |                       |
  |           +---------------------+         +-----------------------+
  +-----------+   close callbacks   |
              +---------------------+

```
__It's hard to capture everything in a diagram, so in addition:__
* callbacks scheduled via `process.nextTick()` are run at the end of a phase of the event loop before transitioning to the next phase. This creates the potential to unintentionally starve the event loop with recursive calls to `process.nextTick()`.
* __Call Pending Callbacks__ is where callbacks are queued to run that are not handled by any other phase (e.g. a callback passed to `fs.write()`).

It is important to know that each phase has a FIFO queue of callbacks to execute. When the event loop enters a particular phase, any operations specific to that phase are executed until the queue is empty or the maximum number of callbacks has been executed. When either of these things have happened, the event loop progresses to the next phase.

Any operations in any phase may schedule more operations and new events processed in the __poll__ phase are queued by the kernel, __poll__ events can be queued while polling events are being processed. If a callback is long-running, the __poll__ phase is likely to exceed the timer's threshold.

### [Phases of the Event Loop](#resources):

#### 1. Update Loop Time
In this phase, the loop concept of "now" is updated. The event loop catches the current time at the start of the event loop tick (an iteration of the loop) in order to reduce the number of time-related system calls.

#### 2. Is the Loop Alive?
Then, if the loop is still alive, an iteration, or 'tick' is started. Otherwise, the loop will exit immediately. A loop is considered to be alive if the loop has active and ref'd handles, active requests, or closing handles [(libuv)](http://docs.libuv.org/en/v1.x/design.html).

#### 3. __Timers__
`uv_run_timers()`
In this stage, timers are run. Timers execute callbacks scheduled by `setTimeout()` and `setInterval()`. Timers will run as early as they can be scheduled after the specified amount of time has passed. By default, when a timer is scheduled, the Node.js event loop will continue running as long as the timer is active. In other words, all active timers that are scheduled for a time before the loop's concept of _now_ have their callbacks called.

  * A timer specifies the threshold after which a provided callback may be executed. Note that the operating system's scheduling or the running of other callbacks may delay timers.

> Also, it is technically the __poll__ phase that dictates when timers are executed. To prevent the poll phase from starving the event loop, libuv has a maximum before it stops polling for more events.

  * `process.nextTick()`  is called at the end of the current tick until the `nextTick` queue is empty.
    * This allows you to completely defer a callback to a new stack to be invoked at the next _tick_. This means that the function that called `nextTick` has to return - along with its parent and all the way up to the root of the stack. Afterwards, when the loop is trying to execute new events, your nextTick'ed function will be there in a new stack.
  * `setImmediate()` is called at the start of the next tick. (Therefore, `nextTick` tasks can add things to the current tick indefinitely, which will prevent other operations from executing. In contrast, `setImmediate` tasks can only add things to the queue for the next tick).

#### 4. __Call Pending Callbacks__
`uv_run_pending()`
In this phase, pending callbacks are called. For the most part, all I/O callbacks are invoked immediately after polling for I/O. However, there are cases in which invoking such a callback is deferred for the next loop iteration since __I/O__ may or may not be blocking. If the previous iteration deferred any I/O callback it will be run at this point.

During the I/O callbacks phase, almost all callbacks are executed. However, there are exceptions including close callbacks, ones scheduled by timers, and `setImmediate()`.
* Some system operations such as types of `TCP` errors, like `ECONNREFUSED` which occur when attempting to connect, will be queued to execute during the I/O callbacks phase.

#### 5. __Idle, Prepare__
`uv_run_idle()`
`uv_run_prepare()`
Idle handle callbacks are called. Despite the name, idle handles are run on every iteration and is active. This phase is used internally, and an [interesting discussion can be found on StackOverflow.](http://stackoverflow.com/questions/39132618/node-js-why-are-idle-and-prepare-phases-only-used-internally)

#### 6. __Poll__
`uv_io_poll()`
First, the poll timeout is calculated. Before blocking for I/O the loop calculates the amount of time it should block. This time is determined through the following calculations:
  * If the loop was run with the `UV_RUN_NOWAIT` flag, the timeout is 0.
  * If the loop is going to be stopped (`uv_stop()` was called), the timeout is 0.
  * If there are no active handles or requests, the timeout is 0.
  * If there are any idle handles active, the timeout is 0.
  * If there are any handles pending to be closed, the timeout is 0.
  * If none of the above cases matched, the timeout of the closest timer is taken, or if there are no active timers, the loop will run indefinitely.

At this point the loop will block for I/O for the timeout calculated by the poll timeout. All I/O related handles that were monitoring a given file descriptor for a read or write operation get their callbacks called at this point.

I/O events are then handled by libuv via `epoll`/`kqueue`/`IOCP` on Linux/Mac/Windows respectively. When the OS notifies libuv that I/O has happened, it invokes the appropriate handler in JS. A given tick of the event loop may process zero or more I/O events. If a tick takes a long time, I/O events will queue in an operating system queue.

During the __poll__ phase, scripts for timers whose threshold has elapsed are executed. Then new I/O events are retrieved.
* The poll phase executes scripts for timers whose threshold has elapsed and process events in the __poll__ queue, and completes those tasks in that order.
* When the event loop enters the poll phase and there are no timers scheduled, one of two things will happen.
  * If the poll queue is not empty, the event loop will iterate through its queue of callbacks and execute them synchronously until the queue is empty or the system-dependent hard limit is reached.
  * if the poll queue is empty, one of two more things will happen:
    * If scripts have been scheduled by `setImmediate()`, the event loop will end the poll phase and continue to the check phase to execute those scheduled scripts.
    * If scripts have not been scheduled by `setImmediate()`, the event loop will wait for callbacks to be added to the queue, then execute them immediately.
  * Once the __poll queue__ is empty, the event loop will check for timers whose time thresholds have been reached. If one or more timers are ready, the event loop will wrap back to the __timers__ phase to execute those timers' callbacks.

#### 7. Check handle callbacks are called
`uv_run_check()`
Check handles get their callbacks called right after the loop has blocked for I/O. Check handles are essentially the counterpart of prepare handles [(libuv)](http://docs.libuv.org/en/v1.x/design.html).

 During the __check__ phase, `setImmediate()` callbacks are invoked.
  * The __check__ phase allows callbacks to be invoked immediately after the poll phase has completed. If the __poll__ phase becomes idle and scripts have been queued with `setImmediate()`, the event loop can continue to the __check__ phase rather than waiting.

> `setImmediate()` is a special timer that runs in a separate phase of the event loop. It uses a libuv API that schedules callbacks to execute after the poll phase has completed.

* Typically, the event loop will reach the __poll__ phase where it will wait for incoming connections, requests, etc. However, if a callback has been scheduled with `setImmediate`, and the __poll__ becomes idle, it will end and continue to the check phase rather than waiting for __poll__ events.  

#### 8. __Close Callbacks__
`uv_run_closing_handles()`
When a socket or handle is closed abruptly, e.g. `socket.on('close', ...)`, the close event is emitted in this phase.
  * If a socket or handle is closed abruptly (e.g `socket.destroy()`), the `close` event will be emitted in this phase. Otherwise, it will be emitted via `process.nextTick()`.

  * If a handle was closed by calling `uv_close()` it will get the close callback called.

#### 9. Special cases
If the loop was run with `UV_RUN_ONCE`, it’s possible that no I/O callbacks were fired after blocking for I/O, but since some time has passed, there may be timers that are due. At this point, those timers get their callbacks called.

#### 10. Iteration ends
If the loop was run with either the `UV_RUN_NOWAIT` or the `UV_RUN_ONCE` modes, the iteration is ended and `uv_run()` will return. If the loop was run with `UV_RUN_DEFAULT` the event loop will continue from the start if it is still alive, otherwise it will also end.

#### `Process.nextTick()`
`process.nextTick()` is not technically part of the event loop, but it is part of the asynchronous API. `nextTickQueue` processes after the current operation completes regardless of the current phase of the event loop.

If used incorrectly, `nextTick()` can prevent the Event Loop from reaching the __Poll__ phase.

> Between each iteration (tick) of the event loop, Node.js checks if it is waiting for any asynchronous I/O or timers  and exits it there are not any more events.

#### `process.nextTick()` vs `setImmediate()`
`process.nextTick()` is invoked on the same phase that it was called whereas `setImmediate()` fires in the following tick.

Take a look at the [documentation](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/) for more detail.

> Note [Another diagram and explanation of the event loop can be found here.](http://stackoverflow.com/questions/26740888/how-node-js-event-loop-model-scales-well)

---

As you can see, the event loop iterates over the phases, which can be thought of as a "list" of events and callbacks of completed operations. If a process requires I/O, the libuv delegates the operation to the thread pool. The assigned threads from the  pool and the I/O operations are executed asynchronously. The event loop will then continue to execute items in the event queue. Once the I/O operation is complete, the corresponding callback is queued (in the event queue) for processing. The event loop then executes the callback and provides the results.

> __Note__: libuv uses a thread pool to make asynchronous file I/O operations possible, but network I/O is always performed in a single thread synchronously. Unlike network I/O, there are no platform-specific file I/O primitives that libuv can rely on. Therefore, blocking file I/O operations are run by the thread pool. Three types of operations are run in this pool: __Filesystem opertions, DNS functions (getaddrinfo and getnameinfo), and User Specified code via uv_queue_work()__.

[If you're interested in viewing the libuv event loop, that's here](https://github.com/libuv/libuv/blob/v1.x/src/unix/core.c#L332-L372)

Another important concept to understand how Node.js implements event-driven architecture is the `EventEmitter`.

---

## The EventEmitter (JavaScript Custom Events)
The `EventEmitter` base clas accommodates the _Observer Pattern_. According to [Norris](#resources), the `EventEmitter` was created to simplify the interaction with the event loop. The `EventEmitter` was created as a generic wrapper to facilitate creating event-based APIs. To understand how Node handles events, we're going to build our own event emitter. (Albeit a simple version).

In this example, we will create an object called `Emitter` that will have two methods, `on` and `emit`. The `on` method will have two arguments, `type` and `listener`, which will be used to register an event listener. In order to access the values of `events`, the key to the Emitter object will be assigned to the `type`. And the listener will be an array of functions. We can then invoke the listeners by calling the `emit` method. This provides a clean way of controlling logic in the code.  

```javascript
function Emitter() {
  this.events = {};
}

Emitter.prototype.on = function(type, listener) {
  this.events[type] = this.events[type] || [];
  this.events[type].push(listener);
}

Emitter.prototype.emit = function(type) {
  if (this.events[type]) {
    this.events[type].forEach((listener) => {
      listener();
    });
  }
};

module.exports = Emitter;

```

Now, to use the Emitter:

```javascript

const Emitter = require('./emitter');

const emtr = new Emitter();

emtr.on('haiku', function() {
  console.log('Climb Mount Fuji');
});

emtr.on('haiku', function() {
  console.log('But slowly, slowly!');
});

console.log('O snail');
emtr.emit('haiku');

```
This program will produce one of [Kobayashi Issa's haikus](https://www.wikiwand.com/en/Kobayashi_Issa):
```
O Snail
Climb Mount Fuji,
But slowly, slowly!
```

In this example,
 1. The `on` method is invoked with the type `'haiku'` and the listener `function() {console.log('Climb Mount Fuji')}` as arguments. It assigns the type as the property name, and then pushes the listener into an array as a value.
 2. Another `on` method is called with the same type and a similar function is pushed pushed to the array.
 3. `'O snail'` is logged to the console.
 4. Finally, the `emit` method is invoked with the type 'haiku'.
  * The emit method finds the 'haiku' as a property of the event object, and then loops through the array and invokes the listener at every index.

You can easily find the Node.js EventEmitter by looking into the Node core modules in the `lib` directory in the `events.js` file. It is much more robust than the one we just built, but the idea is the same, including an `emit`, and `on` function.

To use node's event emitter:
```javascript
  const Emitter = require('events');
  const emtr = new Emitter();
```
* Just like in our example, the Node module's `on` method takes a string (type) and a function (listener), and the `emit` method is also invoked with the type name.

* When the `EventEmitter` object emits an event, all of the functions attached to that event are invoked _asynchronously_. Any values returned by the called listeners are _ignored_ and will be discarded [(Node)](https://nodejs.org/dist/latest-v6.x/docs/api/events.html).

Although this technique is useful for concisely controlling the logic of our programs, it has one drawback: [Magic Strings](https://www.wikiwand.com/en/Magic_string). A simple definition of a __magic string__ is a string that has some special meaning in the code. This is problematic because it is easy for typos to cause difficult to find bugs.
  * A good workaround is to assign this to a variable in a config file (`./config/evntCnfg.js`)[(Alicea)](#references).

  ```javascript
  module.exports = {
    events: {
      HAIKU: 'haiku',
      FILESAVED: 'filesaved'
    }
  }  
  ```
  ```javascript
  const Emitter = require('./emitter');
  const evntCnfg = require('./config').events;

  const emtr = new Emitter();

  emtr.on(evntCnfg.HAIKU, function() {
    console.log('Climb Mount Fuji');
  });

  emtr.on(evntCnfg.HAIKU, function() {
    console.log('But slowly, slowly!');
  });

  console.log('O snail');
  emtr.emit(evntCnfg.HAIKU);

  ```
  [(Alicea)](#references)

> Note: Event emitters are not asynchronous in nature. It often appears to be asynchronous because it is regularly used to signal the completion of asynchronous operations, but the `EventEmitter` API is synchronous. Meaning, listeners will be executed synchronously in the order that they were added before any execution can continue in statements following the call to emit [Norris](#resources).

### EventEmitter APIs

* `EventEmitter.prototype.setMaxListeners`
* `EventEmitter.prototype.getMaxListeners`
* `EventEmitter.prototype.emit`               (publish)
* `EventEmitter.prototype.addListener`        (subscribe)
* `EventEmitter.prototype.on = EventEmitter.prototype.addListener`
* `EventEmitter.prototype.once`
* `EventEmitter.prototype.removeAllListeners`
* `EventEmitter.prototype.listeners`
* `EventEmitter.prototype.listenerCount`

---

##### TL;DR:
* There is at most one event handler running at any given time.
* Any event handler will run to completion without being interrupted.
* JavaScript is a single-threaded, non-blocking, asynchronous language.
* V8 has:
  1. A single call stack
  2. A single thread (one call stack; one thing at a time)
    * returning things pops them off the stack.
  3. Heap - where memory allocation happens
* Event Loop:
  1. callback queue
  2. Other APIs and stuff
* EventEmitters are objects that fake events.

---

[Now, let's take a look at Node.js' Module system. ](./module.md)

---

## Resources:

[Haverbeke, Marijn. "Eloquent JavaScript: A Modern Introduction to Programming." _No Starch Press._](http://eloquentjavascript.net/20_node.html)

["maxogden." The Art of Node. "github.com/maxogden/art-of-node"](https://github.com/maxogden/art-of-node)

[Nodejs.org](https://nodejs.org/en/)

[Teixeira, Pedro. "Professional Node.js: Building JavaScript Based Scalable Software." _Wrox_.  2012. ](https://www.amazon.com/Professional-Node-js-Building-Javascript-Scalable/dp/1118185463/ref=sr_1_1?ie=UTF8&qid=1486686418&sr=8-1&keywords=%5BProfessional+Node.js%3A+Building+JavaScript+Based+Scalable+Software%5D%28%29)

[Halliday, "substack" James. "The Stream Handbook" _github.com/substack/stream-handbook_. 2015.](https://github.com/substack/stream-handbook#introduction)

[Norris, Trevor. "Understanding the Node.js Event Loop." _The odesource Blog_. 2015.](https://nodesource.com/blog/understanding-the-nodejs-event-loop/)

[Raoof, Abdel. 'Introduction to Node.js.' _abdelraoof.com_. 2015.](http://abdelraoof.com/blog/2015/10/19/introduction-to-nodejs/)

[Alicea, Anthony. "Learn and Understand NodeJS." _Udemy_. 2017.](https://www.udemy.com/understand-nodejs/learn/v4/overview)

["Node.js." _Wikipedia_. 2017.](http://www.wikiwand.com/en/Node.js)

["Observer Pattern." _Wikipedia_. 2017.](https://www.wikiwand.com/en/Observer_pattern)

[mscdex. "How Node.js event loop model scales well."  _StackOverflow_](http://stackoverflow.com/questions/26740888/how-node-js-event-loop-model-scales-well)

[simen github](https://github.com/simenkid/talks)

[simen talk](https://www.slideshare.net/simenli/nodejs-event-loop-eventemitter)

[Burgess, Andrew. "Using Node's Event Module." _envatotuts+_.](https://code.tutsplus.com/tutorials/using-nodes-event-module--net-35941)

---
