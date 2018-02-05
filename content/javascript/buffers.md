---
title: "Buffers"
cover: "https://s3.amazonaws.com/rsstdd-portfolio/nodejs.png"
date: "02/02/2018"
category: "tech"
tags:
    - programming
    - javascript
    - node
---
# Buffers

[Node.js Bufffer Docs](https://nodejs.org/api/buffer.html#buffer_class_method_buffer_from_buffer)

__Buffers__ are not, as I was told at Galvanize, a "big, string-like thing that will make no sense to you."

__Let's do better.__

A simple definition of a buffer is a temporary holding place for data that is being moved form one place to another. And it is important to note that buffers are intentionally limited in size because we want to move data quickly.

Before we begin, I need a quick aside to put this into perspective. A __stream__ is a sequence of data made available over time. In other words, streams are pieces of data that eventually combine into a whole. Just like water flowing through a stream, data flows through a stream as it is being passed from one process to another or from one computer to another. Streams, when combined with buffers, allow us to process data "as we go".

The example that most of us can reason with is streaming video content. Let's say you would like to watch a video/movie over the internet. If you attempted to download the movie it would be time consuming. However, when you stream a movie, you're download chunks of a movie and watching it at the same time. You're still downloading the movie, but you're now able to download, process, and watch at the same time by using streams and buffers.

A buffer collects data in a limited allocation of memory to allow you to process that data as it continues to stream from one process to another or from one computer to another.

That was a bit of a tangent, but I wanted to give you an Idea about where I was heading. Again, Buffers are areas in memory that will temporarily store data and allow us to subsequently process said data in chunks.

## Terms
* __Data Buffer__ - A data buffer is a region of physical memory storage that is used to _temporarily_ store data while it is being moved from one place to another. The buffer stores data as it is retrieved from an input device or immediately before it is sent to an output device. It can also be used when data is to be moved between processes within a computer.
* __Binary Data__ - data that is stored in sets of 0s and 1s
  * Core tenant of the math that computers are based on. Each one or zero is called a __bit__ or __binary digit__. 010101 = 2^3, 2^2, 2^1, 2^1 = 0 + 4 + 0 + 1 = 5 Binary is base 2 representation of a number.
* __Character Set__ - A representation of characters as numbers or a defined list of characters that are recognized by computer hardware and software and where each character is represented by a number (Unicode and ASCII).
* __Character Encoding__ - How characters are actually stored in binary. How many bits are used to represent each number. The more bits, the more chars, the more sophisticated language/characters you can represent. The numbers, or __code points__, of a character set are converted and stored in binary. Character encoding is a representation of characters by some kind of encoding system like bit patterns, octets, natural numbers, UTF-8, data storage, etc.

    |     h    |     e    |              l              |     l    |     o    |
    |:--------:|:--------:|:---------------------------:|:--------:|:--------:|
    |          |          |     Char Set  (unicode)     |          |          |
    |    104   |    101   |             108             |    108   |    111   |
    |          |          | Char Encoding       (utf-8) |          |          |
    | 01101000 | 01100101 |           01101100          | 01101100 | 01101111 |


---

## JavaScript and Buffers

Prior to the introduction of the `TypedArray` in ES6, JavaScript did not have a way to read or manipulate streams of binary data. If you recall, JavaScript was intended to be used to manipulate the DOM, so it was designed to handle unicode-encoded strings, and it excels at that. However, Node.js _does_ need to be able to manipulate binary data when dealing with TCP streams and reading and writing to the filesystem. Initially, Node.js' solution to this problem was to use strings to represent binary data. However, this approach was not ideal, so buffers were incorporated into the language.

The `Buffer` class was introduced as part of the Node.js API to allow JavaScript to interact with octet streams in the context of TCP streams and file system operations.
* Buffers are allocated outside of V8, which means that they are not managed by V8. This allows Node.js to work with memory more directly for better performance.
* The `Buffer` class is a global feature within Node.js and handles binary-handling tasks with a binary buffer implementation, which is exposed as a JavaScript API under the buffer pseudo-class.
* Buffers act somewhat like arrays of integers, but they are not resizable and have methods designed specifically for handling and manipulating binary data.
* the "integers" in a buffer each represent a byte, which means that they are limited to values from 0 - 255.
* Raw data is stored in an instance of the buffer class, which is similar to an array of integers. However, buffers are actually corresponded to raw memory outside of V8. Because of this, it cannot be resized.
* In order to save space and be more readable, the architects of Node.js chose to display __hexadecimal__ numbers instead of binary numbers. Therefore, an 8 digit binary number is represented by a 2 digit hexadecimal number, and that is why you will see a two digit representation of a byte in the buffer.

> Many times data that Node.js developers will be using are from the filesystem or TCP streams, which are octet streams. As we've mentioned before, JavaScript is not well-suited for manipulating this form of data.

### Creating Buffers:
Buffers can be created in a few ways:
* `const buffer = Buffer.alloc(8);`
  * the buffer is initialized with 8 bytes
* `const buffer = Buffer.from('Some Example Test', 'utf-8');`
  * the buffer is initialized to the binary encoding of the first string as defined by the second argument.
* `const buffer = Buffer.from([ 8, 6, 7, 5, 3, 0, 9 ]);`
  * the buffer is initialized to the contents of the array - the contents are integers that represent bytes.

##### Types of Character sets (encoding)
* __ascii__ - Fast but limited to the ascii char set; Null chars will be converted into spaces
* __ucs2__ - Two-byte, little-endian encoding; can encode a subset of unicode. Alias of `utf16le`
* __base64__ - base64 string encoding
* __binary__ - binary string format mentioned earlier - is being depreciated, so avoid using this
* __utf-8__ - Multibyte encoded Unicode Chars. Many web pages use UTF-8

### Writing to Buffers

* `Buffer.from(array)`
  - returns a new Buffer containing a copy of the provided octets.
* `Buffer.from(arrayBuffer[, byteOffset [, length]])`
  - returns a new Buffer that shares the same allocated memory as the given ArrayBuffer.
* `Buffer.from(buffer)`
  - returns a new Buffer containing a copy of the contents of the given Buffer.
`* Buffer.from(string[, encoding])`
  - returns a new Buffer containing a copy of the provided string.
* `Buffer.alloc(size[, fill[, encoding]])`
  - returns a "filled" Buffer instance of the specified size. This method can be significantly slower than `Buffer.allocUnsafe(size)` but ensures that newly created Buffer instances never contain old and potentially sensitive data.
* `Buffer.allocUnsafe(size)` and `Buffer.allocUnsafeSlow(size)`
  - each return a new Buffer of the specified size whose content must be initialized using either `buf.fill(0)` or written to completely.

Buffer instances returned by `Buffer.allocUnsafe()` may be allocated off a shared internal memory pool if size is less than or equal to half Buffer.poolSize. Instances returned by `Buffer.allocUnsafeSlow()` never use the shared internal memory pool.

### Reading from Buffers

##### toString
Calling `toString` an a buffer with the encoding as an argument will transmit the data in a usable format.

```js
buffer.toString('utf-8')
//  => 'Hello world!\u0000�k\t'
```
Because we know the length of the buffer, we can add more arguments to 'stringify' the slice to retrieve the data we are interested in. For example:

```js
buffer.toString('utf-8', 0, 12);

// => 'Hello world!'
```

##### Individual Octets:
You can also set individual bits through an array-like syntax.

---

### Other Buffer Methods

#### Buffer.isBuffer
Method to check if `object` is a buffer

#### Buffer.byteLength(string, encoding)
Method to check the number of bytes required to encode a string with a given encoding.

> Buffer.byteLength !== string.length

#### buffer.length
Will return the length of the buffer and represents the amount of memory that is allocated. Note that it is not the same as the size of the buffer's contents, since a buffer not be filled.

#### buffer.slice(start, end=buffer.length)
This method is similar to Array.prototype.slice but with an important distinction:
* the slice is __not__ a new buffer. It is a reference to a subset of the memory space.
* Therefore, if you modify the slice, you will modify the buffer.


## TL:DR
1. Buffers are a finite amount of data that store hexadecimal representations of raw binary data
2. A Buffer behaves rather like an Array
3. You'll probably never use the Buffer yourself, but hey, now you know.

---

[In the next section, let's discuss HTTP and Being a Web Server](./http-server.md)

---

## Sources

[Holbrook, Josh. 'How to use Buffers in Node.js'. _docs.nodejitsu.com_. 2011.](https://docs.nodejitsu.com/articles/advanced/buffers/how-to-use-buffers/)

[Node.js Docs. Buffers](https://nodejs.org/api/buffer.html#buffer_class_method_buffer_from_buffer)

[Alicea, Anthony. "Learn and Understand NodeJS." _Udemy_. 2017.](https://www.udemy.com/understand-nodejs/learn/v4/overview)

[Mixu's Node book](http://book.mixu.net/node/ch9.html)

---


## Bonus Section:

### ES6 Typed Arrays Are Now a Thing
Typed arrays allow developers to provide structured access to binary data using array-like semantics. The "Type" in the name refers tot a "view" layered on type of the buffer of bits, which is essentially mapping of whether the bits should be viewed as an array of 8-bit signed integers, and so on.

```js
const buffer = new ArrayBuffer(8); // stores raw binary data (64 bits) A feature of Vanilla JS
// buffer is a binary buffer that is 8-bytes long and initialized as 0s
buffer.byteLength;
// 32
// This is the extent to which you can interact with the buffer

// However, you can then layer a "view", which is a kind of typed array
const view = new Int32Array(buffer) // an array that allows you to work with the buffer. Will conver the buffer into the format that you need to work with.
view[0] = 5; // converted into 32 bits
view[1] = 15;
view[2] = 30 // buffer does not have storage space
console.log(view);

// => Int32Array { '0': 5, '1': 15 }
```
View allows you to work with binary data in an easier way (through base 10 numbers)

If you want to learn more, I encourage you to check out [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20%26%20beyond/ch5.md)
