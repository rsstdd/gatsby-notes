---
title: "HTTP Webserver"
cover: "https://s3.amazonaws.com/rsstdd-portfolio/nodejs.png"
date: "02/02/2018"
category: "tech"
tags:
    - programming
    - javascript
    - node
---

## HTTP Webserver

### Terms:

* [__Protocol__](https://www.wikiwand.com/en/Protocol) - a defined set of rules and regulations that determine how data is transmitted in telecommunications and computer networking. Both the client and the server are programmed to understand and use that particular set of rules. It's similar to two people from different countries agreeing on a standard language.
* [__TCP__](https://www.wikiwand.com/en/Transmission_Control_Protocol) - Transmission Control Protocol is one of the main protocols of the internet protocol suite. TCP provides reliable, ordered, and error checked delivery of a stream of octets between applications running on hosts communicating by an IP network. that defines how to sent that information. Transmission Control Protocol accepts data from a data stream, divides it into chunks, and adds a TCP header creating a TCP segment. The TCP segment is then encapsulated into an Internet Protocol (IP) datagram, and exchanged with peers via sockets.
* [__IP__](https://www.wikiwand.com/en/Internet_Protocol) - Internet Protocol is the principal communications protocol in the Internet protocol suite for relaying data across network boundaries. IP delivers packets from the source host to the destination host based on the IP addresses in the packet headers. IP defines packet structures that encapsulate the data to be delivered. It also defines addressing methods that are used to label the data with source and destination information.
* [__HTTP__](https://www.wikiwand.com/en/Hypertext_Transfer_Protocols) - The Hypertext Transfer Protocol is an application protocol for distributed, collaborative, and hypermedia information systems. It is the format for data being transferred via TCP/IP and is the core of sending information on the web. HTTP functions as a request-response protocol in the client-server computing model.
* [__Network Socket__](https://www.wikiwand.com/en/Network_socket) - A network socket is an internal endpoint for sending or receiving data at a single node in a computer network. It is a representation of this endpoint in the networking software (protocol stack), such as an entry in a table (listing communication protocol, destination, status, etc.), and is a form of system resource.
* [__Port__](https://www.wikiwand.com/en/Port_(computer_networking)) - In the internet protocol suite, a port is an endpoint of communication in an operating system. It is a logical construct that identifies a specific process or a type of network service. A port is always associated with an IP address of a host and the protocol type of the communication. Thus, it completes the destination or origination network address of a communication session.
* [__MIME type__](https://www.wikiwand.com/en/Media_type) - Multipurpose Internet Mail Extensions is a two-part identifier for file formats and format contents transmitted on the internet and is a standard for specifying the type of Data being sent. Some examples include: application/json, text/html, img/jpeg, etc..

## Request Response Cycle (Client Server Model)
```bash
+-------------------+       Standard Format           +-------------------+
|     IP            |+------------------------------> |     IP            |
| 209.85.128.0      |           Request               | 74.125.224.72     |
|                   |                                 |                   |
|     Browser       |  <-- Socket --|http, ftp...|--->|  Server/Node.js   |
|     Ask for       |                                 |     perform       |
|     services      |                                 |     services      |
|                   |       Standard Format           |                   |
|                   |<------------------------------+ |  Node.js: port:80 | <-- port number
+-------------------+          Response               +-------------------+

```
---

## HTTP_PARSER
The http-parser code that is part of Node.js core, can be found at [joyent/http-parser](https://github.com/nodejs/http-parser). It is a C program that takes html, and parses both request and responses. From the Node.js README:

>The parser is designed to be used in performance HTTP applications. It does not make any syscalls nor allocations, it does not buffer data, it can be interrupted at anytime. Depending on your architecture, it only requires about 40 bytes of data per message stream (in a web server that is per connection).

This, along with the [http_server.js](https://github.com/nodejs/node/blob/master/lib/_http_server.js), allows us to write Node.js web servers.

---

## Request
### An HTTP request is composed of the following parts:
1. A method (or verb)
2. A path
3. An HTTP version
4. Key-value headers
5. And an optional body

#### An example of what an HTTP request:
```
GET / HTTP/1.1
Accept: */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Host: localhost:8000
User-Agent: HTTPie/0.9.3
```
---

## Response
### An HTTP response is composed of the following parts:
1. An HTTP version
2. A status code
3. Key-value Headers
4. And an optional Body

### An example of what an HTTP response:
```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 11
Content-Type: text/plain
Date: Mon, 13 Jun 2016 04:28:36 GMT
Hello world
```

---

## Initializing a server:

```javascript
const http = require('http');

const server = http.createServer((req, res) => { // On every request/response interaction, the server will do something
  res.writeHead(200, 'Content-Type', 'text/plain'); // Defines how we are sending data to the client
  res.end('Hello world'); // End fn ends the implements the stream; grab the buffer data and send data
});

const port = process.env.PORT || 8000; // Map to a port. Default 8000 in this case
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
```

A Node.js server is created with one callback. The server object has an emit method that takes two arguments, request and response.
* For each HTTP request that arrives, the callback is invoked with two arguments —- request and response.
  * The callback's first (request) argument will contain the incoming HTTP request as an `http.IncomngMessage` object
  * The callback's second (response) argument will contain an empty outgoing HTTP response as an `http.ServerResponse` object.
* The goal of the callback is to correctly fill in the response object based on the information in request object

---


## Resources

[Node Docs: http.IncomingMessage](https://nodejs.org/dist/latest-v6.x/docs/api/http.html#http_class_http_incomingmessage)

[Node Docs: http.ServerResponse](https://nodejs.org/dist/latest-v6.x/docs/api/http.html#http_class_http_serverresponse)

[Alicea, Anthony. "Learn and Understand NodeJS." _Udemy_. 2017.](https://www.udemy.com/understand-nodejs/learn/v4/overview)

[Mixu's Node book](http://book.mixu.net/node/ch11.html)
