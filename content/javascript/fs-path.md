---
title: "File System, Path Modules, process.argv, Streams, & Pipes"
cover: "https://s3.amazonaws.com/rsstdd-portfolio/nodejs.png"
date: "02/02/2018"
category: "tech"
tags:
    - programming
    - javascript
    - node
---

# File System, Path Modules, process.argv, Streams, & Pipes

## Intro
In this section, we are going to explores the __File System__. While working with the filesystem, we will use some of the concepts that we've seen before, including asynchronous JavaScript, libuv, buffers and callbacks. Before we get into some examples, however, there are a few bases to cover. We will briefly discuss the Path Module, Buffers, and the global Process Module. And I'll try to describe the relevance of every section.

## File System
File I/O is provided by wrappers around standard POSIX (Portable Operating System Interface - a standards specified by IEEE for maintaining compatibility between operation systems) functions. All Node.js file system methods have asynchronous and synchronous forms. The difference between these two methods is delimited with the addition of the word "sync" in the method name for, as you might guess, the synchronous versions. Any method with the name "sync" in the name will return the value directly and prevent Node.js from executing any other code. It will block.

To use the file system module, import the fs module into your file with the following function: `const fs = require('fs');` As we've seen before, this will return the fs object that has many useful methods that allow us to work with the lower-level operating system. One such method is `fs.readFileSync()`.

### Asynchronous File System Method:

Let's take a look at how to use the synchronous method to read a file:

```js
const fs = require('fs');

// arguments: path (same directory) + filename + encoding
const myFile = fs.readFileSync(___dirname + '/myfile.txt', 'utf8');

console.log(myFile);
```

>Note:
  `__dirname` refers to the directory where the file being executed resides.

---

### Syntax:

`fs.readFileSync(file[, options]);`

#### Parameters:
* `file`: String | Buffer | Integer
  - filename or file descriptor
* `options`: Object | String
  - `encoding`: String | Null (the default = 'utf8')
  - `flag`: String | default = `'r'`
    * 'r' - Open file for reading. An exception occurs if the file does not exist.
    * 'r+' - Open file for reading and writing. An exception occurs if the file does not exist.
    * 'w' - Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
    * 'w+' - Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists).
    * 'a' - Open file for appending. The file is created if it does not exist.
    * 'a+' - Open file for reading and appending. The file is created if it does not exist.

#### Return Value:
If the encoding option is specified, the return value is a __string.__ Otherwise, the return value will be a __buffer.__

If you are using the synchronous form, any exceptions will immediately be thrown. Use `try/catch` to handle exceptions or allow them to bubble up.

---

> ### Note:
 When the `fs.readSync` method is called, it accepts a buffer as an argument. It loads the contents of the file into the buffer because the buffer can manage binary data. Because this is the synchronous version of the method, the program will wait while the buffer fills and returns the content before moving on. This synchronous method could be useful if you were trying to load a configuration file.

>### Regarding Buffers:
* Before ES6, JavaScript did not have the ability to deal with bytes, which is necessary to work with the file system.
* Instead, it handles binary-handling tasks with a binary buffer implementation, which is exposed as a JavaScript API under the buffer pseudo-class.
* [More information about buffers can be found here.](./buffers.md)

---

It bears repeating that in most cases, you will not want to use the synchronous version of the `readfile` method. It is useful, however, to see that the synchronous operation is a blocking operation.

Let's take a look at the asynchronous form.

### Asynchronous File System Method:

The asynchronous form takes a completion callback as its last argument. The arguments passed to the completion callbacks depend on the particular method used. The first argument to any method is always reserved for an exception, which is a standard pattern in Node.js. If the operation was completed successfully, then the first argument will be `null` or `undefined`.

> There is no guaranteed ordering with asynchronous methods. Therefore, when completion order matters, chain callbacks.

```js
'use strict';

const fs = require('fs');

fs.readFile('/etc/paths', 'utf8', (err, data) => {
  if (err) throw err;

  console.log(data);
});
```

### Syntax:

`fs.readFile(file[, options], callback);`

#### Parameters:
* `file`: String | Buffer | Integer (filename or descriptor)
  - filename or file descriptor
* `options`: Object | String
  - `encoding`: String | Null (the default = 'utf8')
  - `flag`: String | default = `'r'`
    * 'r' - Open file for reading. An exception occurs if the file does not exist.
    * 'r+' - Open file for reading and writing. An exception occurs if the file does not exist.
    * 'w' - Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
    * 'w+' - Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists).
    * 'a' - Open file for appending. The file is created if it does not exist.
    * 'a+' - Open file for reading and appending. The file is created if it does not exist.
* `callback`: Function
  -  The callback function is called when the file has been read and the contents are ready.
  - Arguments: `(err, data)`
    * `data` is the contents of the file

#### Return Value:
If the encoding option is specified, the return value is an encoded __string.__ Otherwise, the return value will be a __buffer.__ And any specified file descriptor has to support reading.

---

### Encoding
Encoding is an optional parameter that specifies the type of encoding to read the file. Supported encodings include `ascii`, `utf8`, and `base64`. If no encoding is specified, the default encoding is `utf8`.

---
## Asynchronous File System API

| Read & write a file (fully buffered)                      |  Read & write a file (in parts)                             |
|-----------------------------------------------------------|--------------------------------------|
|fs.readFile(filename, [encoding], [callback])              |fs.open(path, flags, [model, callback])|
|fs.writeFile(filename, data, encoding='utf8', [callback])  |fs.read(fd, buffer, offset, length, position, [callback])|
| |fs.write(fd, buffer, offset, length, position, [callback])|
| |fs.fsync(fd, callback)|
| |fs.truncate(fd, len, callback)|
| |fs.close(fd, [callback])|

---

## Streams

# How does node deal with Streams:

## Terms:
* __Stream__ - Streams come from unix and have are a dependable way of composing large system out of small components. Streams are a sequence of chunks of data that can help seperate concerns because they restrict the implementation surface area into a conistent interface that can be reused.
* __Chunk__ - a piece of data being sent through a stream.

It's a good idea to use streams in your Node.js projects because it is faster than using memory buffers for every request that comes in. The user experience suffers because they will have to wait for the whole file to be buffered into memory on the server before the user can receive the content.

> Note: The (req, res) arguments are streams, which means we can write this in a much better way using fs.createReadStream() instead of fs.readFile():

Stream.js is the core module that defines stream behavior. Streams are event emitters. Any streams that are created have access to 'on' or 'commit.' There is an old stream code and new stream code. There are readable streams, writable streams (send data but can't read), Duplex (read and write) transform (change the data as it moves through), and Passthrough streams. You have types of streams and they all do something a little different. Each type of Streams are an abstract class (type of constructor you never work directly with but inherit from). In other words, Streams will be always custom objects.

## Stream Prototype Chain
Event Emitter --> Stream --> Readable, writeable, etc. Stream --> Custom Streams

## Clarification on Readable/Writable Streams
```bash
+-------------------+           Readable              +-------------------+
|                   |   +-------------------------->  |                   |
|                   |           Request               |                   |
|                   |                                 |                   |
|      Browser      |                                 |  Server/Node.js   |
|                   |                                 |                   |
|                   |                                 |                   |
|                   |         Writeable               |                   |
|                   |   <-------------------------+   |                   |
+-------------------+         Response                +-------------------+

```
Node can only write or read from a stream.

## Example

```js
fs.createReadStream = function(path, options) {
  return new Readstream(path, options);
};
```

`fs.createReadStream` is a specialized type of read only stream. It implements getting and working with data. The stream that it inherits from supplies the rest.

```js
const fs = require('fs');

const writeable = fs.createReadStream(__dirname + 'greet.txt', { encoding: 'utf8', highWaterMark: 32 * 1024 }); // options: encoding
const writable = fs.createWriteStream(__dirname + 'greetCopy.txt', { encoding: 'utf8', highWaterMark: 32 * 1024 });

readable.on('data', (chunk) => {
  console.log(chunk);
  writeable.write(chunk)
})

```

stream will fill a buffer with the contents. If the contents are the same size or smaller than the buffer, you will get pieces of the data at a time. Specifically, you'll get the size of the buffer. When it emits an event and runs the listener, it will pass the data.

Listening to the Data event (remember, a stream is an event emitter), starts the stream. Read from the readable and write to the writeable.

* __highWaterMark__ - Lets you determine the size of the buffer.

The `writeable.write(chunk)` is so common there is a built-in way of doing it.

## Pipes

__pipe__ a way of connecting two streams by writing to one stream what is being read from another. In node.js you pipe from a readable stream to a writeable. Pipes can be chained as long as streams are writeable and readable. Additonally, using `pipe()` has other benefits. It handles backpressure automatically, preventing Node.js from buffering chunks into memory needlessly when the client is on a slow/high-latency connection [(Halliday)](#references).

Node.js implemented a method called pipe on readable streams (`_stream_readable.js`). It takes a chunk and a destination for that chunk. Essentially, this is the same thing. It looks for the data event on the readable, and then writes that chunk to the destination. In addition, `pipe()` returns a value, the destination of the writeable stream/where the data has been sent.


```js
const fs = require('fs');

const readable = fs.createReadStream(__dirname + 'greet.txt');
const writable = fs.createWriteStream(__dirname + 'greetCopy.txt');

readable.pipe(writeable); // will return writeable

```
This is the same code as before except we are using the pipe to redirect the stream. The pipe is more concise way of using streams.

This gets better when you can chain the stream while working with a duplex or transform stream.  

```js
const fs = require('fs');
const zlib = require('zlib'); // allows you to implement a compressed file. gzip file

const readable = fs.createReadStream(__dirname + '/greet.txt');
const writable = fs.createWriteStream(__dirname + '/greetCopy.txt');
const compressed = fs.createWriteStream(__dirname + '/greet.txt.gz')

const gzip = zlib.createGzip(); // readable and writeable. Compressed file from a stream.

readable.pipe(writeable); // will return writeable. Only writeable
readable.pipe(gzip).pipe(compressed); //
```
Read from greet.txt
on every chunk pipe to writeable
on every chunk pipe from writeable to compressed.

This is called __method chaining__ - when methods return methods, which allow you to keep adding/invoking methods. If the method returns the parent object, this would be called 'cascading.'

Streams can send data anywhere, including databases, or over an internet connection. This is a better way to handle data because it saves on memory by minimizing the amount of buffers that we have to work with. As developers, we should tend toward asynchronous method and streams. If you stray from this, have a good reason for it.

---
### There are 5 kinds of streams:
1. __readable__ - produce data that can be fed into writeable, transform, or duplex stream through `.pipe()`.
2. __writeable__ - a stream that you can `.pipe()` to but not from.
3. __transform__ - A certain type of duplex stream (readable and writeable); however, the output is calculated from the input. Also called through streams, which are simple readable/writeable filters that transform input and produce output.
4. __duplex__ - readable/writeable and both ends of the stream engage in a two-way interaction
5. __classic__ - Olden streams that appeared in Node.js 0.4.

### [I Highly Recommend Reading James Halliday's Stream-Handbook as it is a thorough reference. ](https://github.com/substack/stream-handbook/blob/master/readme.markdown)

---

## Path Module:
A collection of utilities that allow developers to work with file and directory paths. The path module does not perform any I/O operations. i.e. it doesn’t consult the filesystem to see whether or not the path is valid. This module contains several helper functions to make path manipulations easier.
* The default operation of the path module varies based on the operating system on which a Node.js application is running. In other words, when Node.js is on a Windows machine, the `path` module assumes that Windows-style paths are being used. This is indispensable when building cross-platform applications.

### path.join([...paths])
This function takes a variable number of arguments, joins them together, and normalizes the path.

__Arguments:__
* `...paths` String <-- A sequence of Path Segments
  * If any of the path segments are not a string, a  `TypeError` is thrown.

__Return Value:__
* `String`

The `path.join()` method joins all given `path` segments using the platform specific separator as a delimiter before normalizing the resulting path. A common use of `join` is to manipulate paths when serving urls.

Zero-length __path__ segments are ignored. If the joined path string is a zero-length string, then `'.'` will be returned.

#### Example:
  ```javascript
  const path = require('path');

  path.join('/a/.', './//b/', 'd/../c/')

   // => a/b/c
  ```

## Process Module
Each Node.js process has built-in functionality that can be accessed through the global `process` module. This `process` module does not have to be required because it is a 'wrapper' around the currently executing process, and many of the methods it exposes are actually wrappers around calls into some of Node.js' core C libraries.

__There are several methods made available through the process object, including:__

1. exit
2. beforeExit
3. uncaughtException
4. Signal Events

## process.argv
* The `process.argv` property returns an `<Array>` containing the command line arguments passed when a Node.js process was launched.
  * First element = `process.execPath`
  * Second element = path to the JS file being executed
  * Any remaining elements = any additional command line arguments

For Example, assuming the following script for process-args.js:
  ```js
  // print process.argv

  process.argv.forEach(val, index) => console.log(`${index}: ${val}`);

  ```
Would generate:
  ```
    0: /usr/local/bin/node
    1: /Users/mjr/work/node/process-2.js
    2: one
    3: two=three
    4: four
  ```

---

## [Continue to Building an HTTP Server](./http-server.md)

## Resources

[Node Docs: Path](https://nodejs.org/api/path.html)

[Node Docs: File System](https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback)

[Alicea, Anthony. "Learn and Understand NodeJS." _Udemy_. 2017.](https://www.udemy.com/understand-nodejs/learn/v4/overview)

[Mixu's Node book](http://book.mixu.net/node/ch11.html)

[James Halliday's Stream Handbook](https://github.com/substack/stream-handbook/blob/master/readme.markdown)

---
