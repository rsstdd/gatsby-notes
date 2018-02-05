---
title: "Socket.io"
cover: "https://s3.amazonaws.com/rsstdd-portfolio/socket.png"
tags:
    - socket.io
    - back end
    - starter
category: "socketio"
date: "02/02/2018"
---

# Socket.io

## Problem:
* HTTP and real-time apps do not go well together because HTTP protocol is stateless and based off a request-response cycle - an HTTP server only reacts upon requests from the client but doesn’t have a stateful, continuous connection to the client
    * stateless - the server does not have to retain session information or status about each communications partner for the duration of multiple requests. HTTP is stateless because the connection between the browser and the server is lost once the transaction ends.
* JS and HTML can talk from client events to the server, but communicating a change on the server to the client is only possible when the client asks the server for the current state.

## Early Solutions
* using the traditional req, res cycle, the browser of each client would poll the server at regular intervals (think set interval) for changes, which gave the impression of ‘real time’ interaction.
* this was expensive on the server and the client in terms of computation
* enter long polling - a client sends a request to the server only once, and then the server keeps this connection open, sending new data whenever it’s available.
    * HTTP not designed for this, so implementations remained hacky:
        * browsers reacted differently when faced with long-running request responses
        * keeping the connection opened usually resulted in inefficient load behavior on the server.

#### __Today we have _WebSockets_: (protocol developed and standardized to overcome failure of HTTP)__
* allow real-time web apps without external web technoo like java applets, flash, or ActiveX
*   __WebSocket__ won't close the connection after sending a message or receiving one. It's essentially "TCP for the web", but with a security model built in the protocol, a fairly rare framing system and UTF-8 encoding (no binary).
    * its a conventional TCP connection between an HTTP server and an HTTP client that is established like an HTTP handshake.
        * The client initializes the connection by sending an `HTT/1.1` request to the server, asking it to turn the connection of this request into a WebSockets connection

        ```
        GET /chat HTTP/1.1
        Host: server.example.com
        Upgrade: WebSocket
        Connection: Upgrade
        Sec-WebSocket-Key:
        dGh1HNhbXBsZSBub25jZQ==
        Origin: http://example.command
        Sec-WebSocket-Protocol: chat,
        superchat
        Sec-WebSocket-Version: 13
        ```

        * If the server supports the WebSocket protocol, it answers like this:

        ```
        GET /chat HTTP/1.1
        Host: server.example.com
        Upgrade: WebSocket
        Connection: Upgrade
        Sec-WebSocket-Accept:
        s3pPLMBiTxaQ9kYGzzhZRbK+Oo=
        Sec-WebSocket-Protocol: chat
        ```

        * this response marks the end of the handshake, and the connection switches to data transfer mode, enabling both sides to transfer data back and forth without any HTTP overhead or additional handshakes, making it a bi-directional, full-duplex communication connection in which both client and server can send messages to one another at any time without having to wait for one another.
* an effort "to provide a mechanism for browser-based applications that need two-way communication with servers that does not rely on opening multiple HTTP connections," as the author Ian Hickson puts it.
* WebSocket takes advantage of the Upgrade header of the HTTP/1.1 specification, which means it's essentially a new protocol for communication:
    * problems:
        * The server has to give special treatment to the WebSocket requests, performing a handshake unique to the WebSocket protocol, and implement its new security system.
        * WebSocket is only supported by the most cutting-edge browser engines on the Desktop, a minority of the web population.
            * ie 11+ and Edge 14; no mobile browsers
* Socket.io uses websockets when it can, and has failovers if the browser does not support it.

## Socket.IO

* The de facto standard library for building WebSocket and Node.js applications
    * provides a Wrapper Library that makes building WebSocket servers convenient
    * provides transparent fallback mechanisms (long polling, etc) for clients that do not support WebSockets.
    * Also includes a client-side library that provides an API for developing the browser part of the Application
* Socket.IO gives you a clean and expressive API on the client and the server that takes care of low-level implementation details.

### Integrating Socket.IO Server Side:

* socket.io is composed of two parts:
    * a server that integrates with (or mounts on) the node.js `HTTP Server: socket.io`
    * a client library that loads on the client side: `socket.io-client`
* attach socket.io to an http server
    * `const server = require('http').Server();`
    * `cosnt io = require('socket.io’)(server);`
        * instantiate socket.io and extend it from our server.
* attach to a port:
    * `var io = require('socket.io')(8080);`
        * when the server is instantiated, we will open a listener for socket.io, meaning our server will listen for pages loaded by the server that has a WebSocket connection instantiated on them.

        ```javascript
        const io = require('socket.io').listen(4000);

        io.sockets.on('connection', (socket) => {
          socket.on('my event', (content) => {
            console.log(content);
          });
        });
        ```

* Bind to the TCP port; As soon as the server is running, it listens to incoming WebScoket connections.
* The connection event is triggered as soon as a new client connects
* The server then listens for incoming messages on this connection, logging the content of any message it receives.
* __The event name is arbitrary__ - it’s a label the client gives the messages it sends, and it is used to distinguish among different types of messages within an application.
* A WebSocket connection is created by connecting to the server.
* This socket is then used to emit (send) a message with the label my event (arbitrary event name) to the server.
* This triggers the listener in the server code and results in the message being logged to the console.
* Piggyback the Socket.IO server on a regular Node.js HTTP server and serve the HTML through this HTTP server.
  ```javascript
  const http = require('http').createServer(handler);
  const io = require('socket.io').listen(httpd);
  const fs = require('fs');

  httpd.listen(4000);

  function handler(req, res) {
    fs.readFile(_dirname + '/index.html', (err, data) => {
        if (err) {
          res.writeHead(500);
          return res.end('Error loading index.html');
        }
      });

    res.writeHead(200);
    res.end(data);
  }

  io.sockets.on('connection', (content) => {
    socket.on('my event', (content) => {
      console.log(content);
    });
  });
  ```

## Socket.IO on the Client (index.html):
```javascript
    <script src="/socket.io/socket.io.js"></script>
    <script>
          var socket = io.connect('http://localhost:4000');
          socket.on('news', function (data) {
            console.log(data);
            socket.emit('my other event', { my: 'data' });
          });
    </script>
```

##### HTML
```HTML
<html>
  <head>
    <title>Socket.io Example Application</title>
    <script src="http://localhost:4000/socket.io/socket.io.js"></script>
    <script>
      const socket = io.connect('http://localhost:4000');
      socket.emit('my event', 'Hello, Haters.');
    </script>
  </head>
  <body>
  </body>
</html>
```
* The WebSocket server links to the HTTP server and listens to certain requests
* whenever a client requests anything below /socket.io.js script, Socket.IO handles these requests by returning the socket.io.js script or setting up a WebSocket connection. Any other request receives the index.html file as a response.

* Socket.IO
    * enables real-time bidirectional event-based communication
* refer to everyone connected:
```
    io.on('connection', (socket) => {
      socket.emit('hi');
    });

    io.emit('hi, everyone’);
```

### CDN Delivery

`  <script src="https://cdn.socket.io/socket.io-1.0.0.js"></script>`

* socket.io-stream

  ```javascript
  const fs = require('fs');
  const io = require('socket.io')(3000);
  require('socket.io-stream')(io);
  io.on('connection', function(socket){
        io.emit(fs.createReadStream('file.jpg'));
  });
  ```
    * The client side will receive a Stream object that emits data events

## With Express Framework
  ```javascript
  Server (app.js)
  var app = require('express').createServer();
  var io = require('socket.io')(app);

  app.listen(80);

  app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
  });

  io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
  });
  ```

## Sending Data to the Client
* all data transactions in socket.io will be handled with callbacks
    * with the __on method__
        * on method is used to map a method name to an anonymous function
        * the on method uses the listener on the WebSocket connection for the method name and when it is found it executes the mapped anonymous function.
    * the __emit method__
        * sends the mapped method name to the client or the server.
        * two arguments - the mapped method name and the data to be fed to the anonymous function
  ```javascript        
    const listener = io.listen(server);
    listener.sockets.on('connection', function(socket){
        socket.emit('message', {'message': 'hello world'});
      });
  ```
* when the listener gets a call for the ‘connection’ action, we will perform the function that follows it.
* When the ‘connection’ action is called, we trigger an emit action that will send a “message” action to the client.
* The Message action will send the JSON object `{‘message’: ‘hello world’}`
* the connection action is triggered when `io.conection( )` is executed on `socket.html`

## Collecting Data from the Client

    ```javascript
    const socket = io.connect();

      socket.on('message', function(data){
          console.log(data.message);
      });
    ```
* the on method on the client side (the above code) collects data from the server
* But we could just as easily produce this content through a normal page load or ajax call. We want the actions transmitted through our socket connection to be continuous.

## Sending Data From the Client to the Server

* Set up an `emit` function and an `on` listener. This time the emit will be on the client side and the listener will be on the server side.
* __Client Side:__
    * emit event to be triggered every time a key is pressed inside that text area.
    * `String.fromCharCode(e.charCode)`
        * takes the char code of the key that triggered the event and converts it back to a string of the char associated with that code number.

    ```javascript
    <script>
      var socket = io.connect();
      socket.on('date', function(data){
        $('#date').text(data.date);
      });

      $(document).ready(function(){
        $('#text').keypress(function(e){
          socket.emit('client_data', {'letter': String.fromCharCode(e.charCode)});
        });
      });
      </script>
    ```

* __Server side:__

    ```javascript
    var listener = io.listen(server);
    listener.sockets.on('connection', function(socket){

      //send data to client
      setInterval(function(){
        socket.emit('date', {'date': new Date()});
      }, 1000);

      // receive client data
      socket.on('client_data', function(data){ // <— listener for the client_data emit call
        process.stdout.write(data.letter); // <— writes a letter inside the JSON to the server console
      });                                                          
    });
      // writes to stdout without inserting new line chars
    ```


## Resources

[socket.io](https://github.com/socketio/socket.io)

[Professional Node.js: Building JavaScript Based Scalable Software](https://www.amazon.com/Professional-Node-js-Building-Javascript-Scalable/dp/1118185463/ref=sr_1_1?ie=UTF8&qid=1486686418&sr=8-1&keywords=%5BProfessional+Node.js%3A+Building+JavaScript+Based+Scalable+Software%5D%28%29)
