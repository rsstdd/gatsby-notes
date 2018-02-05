---
title: "CORS - Another must know for interviews"
cover: "https://s3.amazonaws.com/rsstdd-portfolio/nodejs.png"
date: "02/21/2018"
category: "tech"
tags:
    - programming
    - javascript
    - cors
---

# CORS

## Terms

* __CORS__ - _Cross-Origin Resource Sharing_. An HTML5 feature that allows one site to access another site's resources despite having different domains (origin).

* __JSONP__ - _JSON with Padding_. Used to request data from a server residing in a different domain than the client. This enables sharing of data in spite of the same-origin policy.

## Same-Origin Policy Security Model

All of the major web browsers implement the Web Application Security Model outlined by the [w3c](http://www.w3.org) for [Same Origin Policy](http://www.w3.org/Security/wiki/Same_Origin_Policy). This policy is a security concept implemented by web browsers to prevent JavaScript code from making queries against a different origin. In other words, the same-origin policy prevents a web application from obtaining resources form a different domain/origin. The browser only considers resources to be of the same origin if they use the same protocol (http/https), the same port, and the same domain -- even different subdomains will be blocked.

The purpose of this policy is to protect against malicious scripting attacks. Unfortunately, it also prevents non-malicious web applications from accessing resources to improve UI/UX.

To overcome the limitations of the same-origin policy, JSON-P (kind of a hack) and CORS (a new HTML5 feature) can be implemented. With the adoption of CORS, developers can now leverage cross-origin images, stylesheets, scripts, iframes, web fonts, AJAX API calls, videos, scripts, etc to improve web applications.

#### Example of Cross-Origin Request Error
```
XMLHttpRequest cannot load http://localhost:3000. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access.
```

### Circumventing the Same-Origin Policy

The HTML `<script>` tag is able to execute content retrieved from foreign origins. However, services replying with pure JSON data are not allowed to share data across domains, and any attempt to use this data from another domain will result in a JavaScript error. The browser downloads the `<script>` file, evaluate the contents, misinterprets the raw JSON data as a block, and then throws a syntax error. Even if the JSON were interpreted as a JavaScript object literal, the JSON cannot be accessed by the JavaScript running in the browser because there is no variable assignment on the object literal.

#### JSON-P

In the JSONP usage pattern, the URL request pointed to by the `src` attribute in the `<script>` tag returns JSON data, with JavaScript code (usually a function call) wrapped around it. This "wrapped payload" is then interpreted by the browser, and the function that is already defined in the JavaScript environment can manipulate the JSON data. The function invocation to `parseResponse()` is the "P" (the _padding_) around the JSON.

For JSONP to work, a server must reply with a response that includes the JSONP function (many do not). The JSONP function invocation that gets sent back, as well as the payload that the function receives, must be agreed upon by both the client and server.

```HTML
<script type="application/javascript"
        src="http://server.example.com/Users/1234?callback=parseResponse">
</script>
```

JSONP works only for GET requests and is not an effective solution for POSTs, PUTs, and DELETEs of a RESTful server.

JSON-P is an early and limited solution to cross-origin sharing. Fortunately, we have better options now. There are still APIs that use JSON-P, but it's being phased out by the industry in favor of __CORS__.

## CORS Security Model

__CORS__ is a technique for relaxing the same-origin policy, which allows Javascript on the remote web application to consume a REST API served from a different origin. This assumes, of course, that each side (server and client) has allowed for the CORS specification.

* The CORS specification defines two distinct use cases:
  * __Simple requests__ = This use case applies if we use `HTTP` `GET`, `HEAD` and `POST` methods. In the case of `POST` methods, only content types with the following values are supported: `text/plain`, `application/x-www-form-urlencoded`, and `multipart/form-data`.
  * __Preflighted requests__ - When the ‘simple requests’ use case does not apply, a first request (with the HTTP `OPTIONS` method) is made to determine which HTTP request methods are allowed in the context of cross-domain requests.
  * If you add authentication to that request using the `Authentication` header, simple requests automatically become preflighted ones.

The client and server exchange headers to specify behavior regarding cross-domain requests. The following is a list of the specification on the header:
* `Origin`: this header is used by the client to specify which domain the request is executed from. The server uses this to authorize, or not, the cross-domain request.
* `Access-Control-Request-Method`: In the context of preflighted requests, the `OPTIONS` request sends this header to check if the target method is allowed in the context of cross-domain requests.
* `Access-Control-Request-Headers`: within the context of preflighted requests, the `OPTIONS` request sends this header to check if headers are allowed for the target method in the context of cross-domain requests.
* `Access-Control-Allow-Credentials`: this specifies if credentials are supported for cross-domain requests.
* `Access-Control-Allow-Methods`: the server uses this header to tell which headers are authorized in the context of the request. This is typically used in the context of preflighted requests.
* `Access-Control-Allow-Origin`: the server uses this header to tell which domains are authorized for the request.
* `Access-Control-Allow-Headers`: the server uses this header to tell which headers are authorized in the context of the request. This is typically used in the context of preflighted requests.

#### Simple request
In a simple request, the request is executed against the other domain. If the remote resource supports cross domains, the response is accepted. Otherwise, an error occurs

```
+--------------+                           +-------------+
|              |       GET (for example)   |             |
|    Client    +-------------------------> |    Server   |
|              |       Origin header       |             |
|              |                           |             |
|  Different   |                           |             |
|  domain from |                           |   Will      |
|  the server  |                           |   support   |
|              |                           |   CORS      |
|              |                           |             |
|              |       CORS headers        |             |
+--------------+ <-------------------------+-------------+
                         Response
```
Example Request:
```
GET /someData/ HTTP/1.1
Host: someDomain.org
(...)
Referer: http://mydomain.org/example.html
Origin: http://mydomain.org
```

Example Response:

```
HTTP/1.1 200 OK
(...)
Access-Control-Allow-Origin: *
Content-Type: application/json

[JSON Data]
```

#### Preflighted request

If a request is managing user generated data, a simple request is insufficient. Instead, a _preflight_ CORS request is sent in advance of the actual request. In a preflighted request, access permissions are negotiated between the caller and the Web application based on HTTP headers in two phases:

  1. The browser executes an `OPTIONS` request with the same URL as the target request to check that it has the necessary permissions to execute the request.

  2. This `OPTIONS` request then returns headers that identify what is possible to do for the URL. If rights/permissions match, the browser executes the request.

  * Essentially, the preflight request is "asking" the server if it will allow the HTTP request. If the server allows the original request, then it will respond to the preflight request with a 200 status.

```
+---------------------+                   +--------------------+
|                     |   OPTIONS         |                    |
|      Client         +-----------------> |      Server        |
|                     |  Origin header    |                    |
|                     |                   |                    |
|                     |                   |                    |
|     Different       |  CORS headers     +    With support    |
|    domain from      | <-----------------+       of  CORS      |
|     the server      |    Response       +                    |
|                     |                   |                    |
|                     |                   |                    |
|                     |                   |                    |
|                     |                   |                    |
|                     |                   |                    |
|                     | POST (for example)|                    |
|                     +-----------------> |                    |
|                     |  Origin header    |                    |
|                     |                   |                    |
|                     |                   |                    |
|                     |                   |                    |
|                     |   CORS headers    |                    |
|                     | <-----------------+                    |
|                     |     Response      |                    |
|                     |                   |                    |
+---------------------+                   +--------------------+

```

#### Example Header Exchange:
```
OPTION /myresource/ HTTP/1.1
Host: mydomain.org
(...)
Origin: http://test.org
Access-Control-Request-Method: POST
Access-Control-Request-Headers: content-type,accept
```

The corresponding response:

```
HTTP/1.1 200 OK
(...)
Access-Control-Allow-Origin: http://test.org
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: content-type, accept
Access-Control-Max-Age: 1728000
```

Since the `OPTIONS` pre-request succeeds, the browser will then send the actual request:

```
POST /myresource/ HTTP/1.1
Host: mydomain.org
Content-type: application/json
Accept: application/json
(...)
Referer: http://test.org/example.html
Origin: http://test.org

[JSON Data]
```

The corresponding response:

```
HTTP/1.1 200 OK
(...)
Access-Control-Allow-Origin: *
Content-Type: application/json

[JSON Data]

```
** Headers and Diagrams from [#Templier, 2015](http://restlet.com/blog/2015/12/15/understanding-and-using-cors/)

---

## Handling CORS on your Express Server

Although CORS tries to make cross-origin requests possible within the browser, server-side applications must set the right headers in the response.

As you can see, to enable cross-origin sharing, permissions must set on the server. These permissions on the server will tell the browser what is allowed, and the browser then enforces those rules.

For an Express server, that code comes in the form of middleware before the API routes.

##### Express Middleware to Enable CORS:

```javascript
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res, next) => {
  // Handle the get for this route
});

app.post('/', (req, res, next) => {
 // Handle the post for this route
});
```

Let's break that down line-by-line.

```javascript
res.header("Access-Control-Allow-Origin", "*");
// "*" is considered an unsafe practice except in special cases
// where an API is completely public and is expected to
// be consumed by any client.
```

This informs the browser that any other domain can access your API. You will likely want to change the "*" to a fully qualified domain name.

```javascript
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
```

---

This informs the browser which headers are allowed to be sent. If you want to add any additional headers, like a token header, you must add it here.

If you need to whitelist multiple domains, then you will need to make the middleware dynamic so that it will automatically choose what headers to send to the client.

If you only want to serve some routes to clients of all origins, set the `res.hearders` specifically for these routes and omit the `next()`. Instead, just send your response.

```javascript
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.json({data: [1,2,3,4]})
});
```

---

## Configure CORS with an npm Module

The good news is, the [cors](https://www.npmjs.com/package/cors) node module makes configuring  CORS extremely simple. Once installed, it's as simple as including the middleware in your application.

```javascipt
var cors = require('cors')
app.use(cors())
```

Make sure that any Express middleware being used (such as CORS, in this case) is configured before the routes are matched.

Once this is installed, axios on the client will be able to communicate with the API as needed. You will know it is configured correctly when axios is able to get data from the API.

---

## Other Ways Around the Same-Origin Policy

##### Information obtained from [Titarenco, David. _Stack Overflow_. "The Same Origin Policy"](http://stackoverflow.com/questions/3076414/ways-to-circumvent-the-same-origin-policy)

### The document.domain method

* Method type: iframe.

Note that this is an iframe method that sets the value of document.domain to a suffix of the current domain. If it does so, the shorter domain is used for subsequent origin checks. For example, assume a script in the document at `http://store.company.com/dir/other.html `executes the following statement:

`document.domain = "company.com";
`
After that statement executes, the page would pass the origin check with `http://company.com/dir/page.html`. However, by the same reasoning, company.com could not set `document.domain` to `othercompany.com`.

With this method, you would be allowed to execute javascript from an iframe sourced on a subdomain on a page sourced on the main domain. This method is not suited for cross-domain resources as browsers like Firefox will not allow you to change the `document.domain` to a completely alien domain.

Source: https://developer.mozilla.org/en/Same_origin_policy_for_JavaScript

### The Cross-Origin Resource Sharing method

* Method type: __AJAX__.
Cross-Origin Resource Sharing (CORS) is a W3C Working Draft that defines how the browser and server must communicate when accessing sources across origins. The basic idea behind CORS is to use custom HTTP headers to allow both the browser and the server to know enough about each other to determine if the request or response should succeed or fail.

For a simple request, one that uses either GET or POST with no custom headers and whose body is text/plain, the request is sent with an extra header called Origin. The Origin header contains the origin (protocol, domain name, and port) of the requesting page so that the server can easily determine whether or not it should serve a response. An example Origin header might look like this:

Origin: http://www.stackoverflow.com
If the server decides that the request should be allowed, it sends a Access-Control-Allow-Origin header echoing back the same origin that was sent or * if it’s a public resource. For example:

Access-Control-Allow-Origin: http://www.stackoverflow.com
If this header is missing, or the origins don’t match, then the browser disallows the request. If all is well, then the browser processes the request. Note that neither the requests nor responses include cookie information.

The Mozilla team suggests in their post about CORS that you should check for the existence of the withCredentials property to determine if the browser supports CORS via XHR. You can then couple with the existence of the XDomainRequest object to cover all browsers:

```javascript
function createCORSRequest(method, url){
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr){
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined"){
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}

var request = createCORSRequest("get", "http://www.stackoverflow.com/");
if (request){
    request.onload = function() {
        // ...
    };
    request.onreadystatechange = handler;
    request.send();
}
```

Note that for the CORS method to work, you need to have access to any type of server header mechanic and can't simply access any third-party resource.

Source: http://www.nczonline.net/blog/2010/05/25/cross-domain-ajax-with-cross-origin-resource-sharing/

### The window.postMessage method

* Method type: iframe.
`window.postMessage`, when called, causes a `MessageEvent` to be dispatched at the target window when any pending script that must be executed completes (e.g. remaining event handlers if  `window.postMessage` is called from an event handler, previously-set pending timeouts, etc.). The `MessageEvent` has the type message, a data property which is set to the string value of the first argument provided to `window.postMessage`, an origin property corresponding to the origin of the main document in the window calling `window.postMessage` at the time `window.postMessage` was called, and a source property which is the window from which `window.postMessage` is called.

To use `window.postMessage`, an event listener must be attached:
```javascript
    // Internet Explorer
    window.attachEvent('onmessage', receiveMessage);

    // Opera/Mozilla/Webkit
    window.addEventListener("message", receiveMessage, false);
```
And a receiveMessage function must be declared:
```javascript
function receiveMessage(event) {
    // do something with event.data;
  }
```
The off-site iframe must also send events properly via postMessage:

`<script>window.parent.postMessage('foo','*')</script>
`

Any window may access this method on any other window, at any time, regardless of the location of the document in the window, to send it a message. Consequently, any event listener used to receive messages must first check the identity of the sender of the message, using the origin and possibly source properties. This cannot be understated: __Failure to check the `origin` and possibly `source` properties enables cross-site scripting attacks__.

Source: https://developer.mozilla.org/en/DOM/window.postMessage

### The Reverse Proxy method

* Method type: Ajax
Setting up a simple reverse proxy on the server, will allow the browser to use relative paths for the Ajax requests, while the server would be acting as a proxy to any remote location.

If using mod_proxy in Apache, the fundamental configuration directive to set up a reverse proxy is the ProxyPass. It is typically used as follows:

`ProxyPass     /ajax/     http://other-domain.com/ajax/
`
In this case, the browser would be able to request /ajax/web_service.xml as a relative URL, but the server would serve this by acting as a proxy to `http://other-domain.com/ajax/web_service.xml`.

One interesting feature of the this method is that the reverse proxy can easily distribute requests towards multiple back-ends, thus acting as a load balancer.

## For Your Consideration:
1. What is the same origin policy? Why is it enforced?
2. What is JSONP?
3. What is CORS? How is it useful?
4. Why is CORS preferred over JSONP? What advantages does it give us over JSONP?

## Resources

[_MDN_. 'Same-Origin Policy'](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)

[_Spring.io_. 'Understanding CORS'](https://spring.io/understanding/CORS)

[Templier, Thierry. _Restlet Blog_. 'Understanding and using CORS' ](http://restlet.com/blog/2015/12/15/understanding-and-using-cors/)

[_Adobe Developer Connection_: 'Understanding Cross-Origin Resource Sharing (CORS)'](https://www.adobe.com/devnet/archive/html5/articles/understanding-cross-origin-resource-sharing-cors.html)

[_Wikipedia_. 'Cross-Origin resource sharing'](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing#How_CORS_works)

[_Wikipedia_. 'Same-Origin Policy'](https://en.wikipedia.org/wiki/Same-origin_policy)

[_Wikipedia_. 'JSONP'](https://en.wikipedia.org/wiki/JSONP)

[_Security StackExchange_. 'Why is the same origin policy so important?'](http://security.stackexchange.com/questions/8264/why-is-the-same-origin-policy-so-important)

[_MDN_. 'HTTP access control (CORS)'](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)
