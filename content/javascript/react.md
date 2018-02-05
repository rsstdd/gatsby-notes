---
title: "React"
cover: "https://s3.amazonaws.com/rsstdd-portfolio/react.png"
date: "02/02/2018"
category: "tech"
tags:
    - programming
    - javascript
    - React.js
---

# React.js

In the words of Facebook, __[React.js](https://facebook.github.io/react/)__ is a declarative, efficient, and flexible JavaScript library for building user interfaces. Your components tell React what you want to render - then React efficiently updates and renders just the right components when your data changes. In other words, React is a JavaScript library for building sophisticated user interfaces for large, dynamic web applications. It works by building a hierarchy of components and then inserts them into the DOM. Whenever a component’s state changes, React will re-build the component hierarchy and update the DOM. Conceptually, it’s like refreshing the page.

The core themes behind React are component hierarchies and one-way data binding. React provides a hierarchy of components that encapsulate presentation, state, and behavior, and data is bound one-way, which means that React doesn't have a mechanism to allow the view to change the document. The view can only raise events that the component responds to. In other words, only changes to state are immediately propagated to the presentation through component hierarchies and one-way data binding. Using these tools, developers can create unique HTML elements that have customized functionality. If you're familiar with Angular, you can think of them as being close to Angular directives that you can nest.

React provides a template language called JSX and some function hooks to essentially render HTML. React components allow you to create HTML tags that can contain custom functionality. Reusing components is a key idea behind React. Furthermore, each instantiated component receives its own scope, which allows you to reuse your components as many times as you would like without worrying about variable collisions and other typical scope-sharing conflicts

---

## Terms
* __Component__ - encapsulated code that handles presentation, state, and behavior. Components produce HTML. It knows how it should look and act given its current underlying information.
    * Developer creates React Elements. Usually larger parts of the user interface which contain both the structure and functionality and you can nest these components to create the presentation layer of the application.
    * responsible for translating raw data into rich HTML
        * the props and the state together constitute the raw data that the HTML output derives from.
* __React Elements__ - JS objects that represent HTML elements. they do not exist in the browser. Instead, they represent browser elements such as an h1, div, or section.
* __The Virtual DOM__ - a JS tree of React elements and components. React renders the virtual DOM to the browser to make the user interface visible. It then observes the virtual DOM for changes and automatically mutates the browser DOM to match the virtual DOM.
    * When state changes, React re-renders the component to the virtual DOM. The new Virtual DOM is compared with the previous virtual DOM; React then isolates what has changed and updates the browser DOM.
* __JSX__ - an XML-like syntax extension to ECMAScript without any defined semantics. It’s not intended to be implemented by engines or browsers. It’s not supposed to incorporate JSX into the ECMAScript specification itself. It is intended to be used by various preprocessors to transform these tokens into standard ECMAScript.
    * A JavaScript syntax extension that looks similar to HTML that lets you create ReactElement objects using an HTML-like syntax and a transpiler.
    * a technique for creating React elements and components. Each React component can be written in JavaScript with `React.DOM.h1(null, ‘Hello’);`, but JSX is easier to read and write and it’s compiled into JavaScript anyway.
    * JSX allows you to write vanilla HTML that then gets processed down into createElements.
* __Props__ - Props are the data that gets passed into the component as element attributes. Somewhere else in the app, React listens for state changes and the `render()` method gets called again passing the changed data into the `props`.
    * Can be thought of as a component’s options. They’re given as arguments to a component and look like HTML attributes.
    * A component should never change its props, they’re immutable. If a component has data that’s mutable, use the state object.
    * info that is associated with that particular element that you wish to pass down from the owner to the "ownee"
* __State__ - The state of a digital logic circuit or computer program is a technical term for all the stored information, at a given instant in time, to which the circuit or program has access.
    * An Object that is internal to a component. It holds data which can change over time.
    * the component has a `getInitialState` function, which React.js calls when the component is initialized. The returned object is set as the component’s initial state.
    * It also has a function toggleLiked, which calls setState on the component which toggles the "liked" value.
    * buttonClass is used as a class name on the React.js button element. The button also has an onClick event handler set to the toggleLiked function.
* __Composition__ -  combining smaller components to form a larger whole.
* __Data binding__ - Data binding is the process of establishing a connection between a user interface’s state and presentation.
* __Two-way data binding__
  1. changes its state (data received from a server) are immediately propagated to the presentation.
  2. changes to its presentation (input received from a user) are immediately propagated to the state.
* __one-way data binding__ - When building a component hierarchy, its state and presentation are combined to produce a UI. Whenever the state changes, it is automatically recombined with the presentation and an updated user interface is produced. Changes made to the presentation are not automatically propagated to the state. You have to write the code to change the presentation to the state explicitly.
* __Flux__ - a pattern; The view triggers an event (say, after the user types a name into a text field), that event updates a model, then the model triggers an event and the view responds to that model’s event by re-rendering with the latest data.
* The __single responsibility principle__ states that every module or class should have responsibility for a single part of the functionality provided by the software and that responsibility should be entirely encapsulated by the class. All its services should be narrowly aligned with that responsibility. Robert C. Martin expresses the principle as follows:
    * “A class should have only one reason to change.”
* __Compiler__ - translates the source code of one programming language into another programming language of a different level of abstraction.
* __Transpiler__ - is a special type of compiler that changes the source code of one programming language into the approximate equivalent of another language.
* __Synthetic events__ - a cross-browser wrapper around the browser’s native event. It has the same interface as the browser’s native event, including stopPropagation()  and preventDefault( ), except the events work identically across all browsers.
    * Can reach the browser's native event through `nativeEvent`

---

## Introduction To React:

### Why is React.js important?
library; accessible; short learning curve; easier to debug; more flexible; components are easy to understand; can tell how the component will render by looking at one source file.

### How Does React Work?

#### [Virtual DOM](http://reactkungfu.com/2015/10/the-difference-between-virtual-dom-and-dom/)
__Two-Way data binding__ like Angular.js 1 / 1.5 is pretty great, but has some problems. One of which is that changes to one two-way bind will change another data binding to change, which causes the first to change again. This is expensive in terms of CPU resources, and results in slow application.

__React uses one-way data binding__
* React components:
    * encapsulated code that handles presentation, state, and behavior
    * expose a render method DOM that allows you to output an element with an arbitrary amount of DOM child nodes. The render method is all you need to make the simplest component. React tracks all DOM nodes that the render method produces <— helper methods called `createElement( )`
* `React.createElement( )` has three arguments
        * type - tells React.js what kind of element to create
        * props - represent the data passed into an element
            * they’re the data that get passed into the component as element attributes. Somewhere else in the app, React listens for state changes and the `render()` method gets called again passing the changed data into the `props`.
        * child - adds content to the element
            * can be either a String or ReactElement
    * the function returns a new ReactElement object which is stored in the element variable. - as of now React.js has not added anything from the DOM
* `document.getElementById( )` function.
    * searches the DOM for an existing element with a specific id attribute and returns it. the `DOMelement` is then stored in the container variable <— still nothing from React.js has been added to the DOM
* `ReactDOM.render( )` is a function that takes two args
        * `ReactElement`
        * `DOMElement`
    * The render method returns a description of what you want to render, and then React.js takes that description and renders it to the screen.
        * This function returns a React element, specifically, which is a lightweight description of what to render. Most developers use a special syntax called JSX
    * Uses the ReactElement to create a component hierarchy and then inserts it into the DOM hierarchy as the child of the DOMElement.
    * Controls the contents of the DOMElement
    * any existing content inside the DOMElement is replaced when the `ReactDOM.render()` function is invoked
        * React uses a reconciliation algorithm to efficiently update the contents of the DOMElement later - virtual DOM and diffing

### Component Presentation
You could only use ReactElement objects, but you will want to leverage Components, which is encapsulated code that handles presentation, state, and behavior.
* `React.createClass()` is a function that accepts a specification object and returns a component class.
* the specification object must implement a `render()` function that returns a single ReactElement.
    * the `ReactDOM.render()` function will call a component’s `render()` function when it is rendering the component hierarchy.
* React.createElement( ) only requires the type argument when creating a ReactElement. If there is no props or a child to pass into an element, they can be omitted.
Component State
* React.js components can have a state by setting this.state in the constructor, which should be considered private to the component.
* component classes can also define a `getInitialState( )` function
    * invoked once and only once right before the component is mounted — inserted into the DOM. The function’s return value is used as the initial value of this.state
* After the `getInitialState( )` function is invoked, React will invoke the `render()` function which should be implemented as a pure function. It should:
    * Return the same ReactElement given the same component state.
    * Not modify the component's state.
    * Not read from or write directly to the DOM.
    * Not interact with the browser via functions like `setTimeout().`
* `render()`
    * should examine `this.props` and `this.state` and return a single React Element
    * can return null or false if you don’t want anything rendered
    * should be pure
* React.js provides other places where you can modify the state or interact with the browser. Just not in the `render( )` function. Keeping the `render( )` function pure makes component classes easier to think about.

### Component Hierarchy
* an arbitrary number of child elements can be passed as arguments into the `React.createElement( )` function.
    * must include type and props
    * Creating a hierarchy of ReactElement objects is how the `render( )` function can return more than one statement.
    * Note: the order children are passed into the `React.createElement( )` function is the order they’ll be mounted.
* The props object is made up of key-value pairs that set the HTML attributes of the element. Any HTML attribute can be a key in the props object so long as it’s converted to camel case.
    * Since class and for are reserved keywords in javaScript so className and HTML For must be used instead.
    * [Here is a list of supported HTML tags and attributes](https://facebook.github.io/react/docs/dom-elements.html)

### One-way Data Binding
* React.js uses one-way data bindings to prevent changes made to the presentation from automatically propagating to the state. We’ll have to manually propagate the presentation changes to the state by writing this code ourselves.
* Component classes can also define custom event handlers
    * event handlers respond to events fired from a ReactElement
    * assign an event handler(this.handleChange) to a camel case event (onChange) in its props object. Then, any time a user changes the element, the event is triggered and the event handler is invoked.
        * [Here is the list of Event Handlers](https://facebook.github.io/react/docs/events.HTML#supported-events)
    * When an event handler is invoked, an object is passed in as the first argument. The event object contains all the relevant information about the event that was just fired. Because of one-way data binding, you have to use the event object to update the component’s state.
    * After merging, the component is also automatically re-rendered, updating the presentation. Because of this, you never modify the this.state object directly. To change a component’s state, always use the this.setState( ) function.
* React thinks of components as simple state machines. A state machine is an object that:
    * Can be in one of a finite number of states.
    * Can transition from one state to another when an event is fired.
    * Thus, you transition a component’s state using the this.setState( ) function and it’ll render a new presentation based on this new state.
    * React changes the parts of the DOM that need updating using a process called reconciliation

### Component Behavior
the `render()` function can now build up a local message variable, which is then passed into the h1 element as its child. Note that the message string is not part of the component’s state.
* components should store the least amount of information possible in its this.state object
* adding redundant precomputed values into the this.state object means you’ll have to write code that explicitly keeps everything synchronized.
* custom event handlers
* event object

---

## React Tools:
### React JSX: [makes building React.js ui easier](https://medium.com/javascript-scene/jsx-looks-like-an-abomination-1c1ec351a918#.hriu8ab3i)

* presentation and behavior are tied, so why keep them in separate files?
* Dedicated template languages tend to be inadequate when implementing a complex UI
* protects against XSS attacks
How use?
* Syntactically similar to HTML; Use babel to transpile
React component Class
* React components can be transformed from JSX to JavaScript

  ```javascript
  const Truck = React.createClass({
    render: function() {
      return <div>
        <a href="http://www.streetdonuts.com/">Street Donuts</a>
      </div>;
    }
  });

  const element = <Truck />;

  ```

* React.js components must specify a `render( )` function that returns a single ReactElement
Nested React component Classes
* component classes can be nested with other JSX tags
Single-line attribute expressions
* A JSX attribute tag can be the result of a JavaScript expression
Multi-line attribute expressions

```javascript
const element = <input
  onChange={this.handleChange}
  type="text"
  value={this.state.searchTerm}
/>;
```
## Synthetic Events

### What’s a [Synthetic Event?](http://codepen.io/ryansobol/pen/Lpvayw?editors=001)

__Synthetic event__ - an object that wraps a browser’s native event object; an object within another JS object.
* React.js wraps native events with a SyntheticEvent object and passes it to an event handler as its first parameter.
* most likely will not need the underlying native event object, but you can with event.nativeEvent
* the listener is on one of the props
What’s with synthetic events?
Native events aren’t uniform across browsers. Synthetic Events are.
* When React.js loads, it attaches a single event listener onto the root document object of the DOM hierarchy. Therefore, you do not attach any additional event listeners to the DOM
* The React.js synthetic event system is independent of native events
* Handling a synthetic event system works identically
* The synthetic event is pooled, meaning that the syntheticEvent obj will be reused and all properties will be nullified after the event callback has been invoked. this is for performance reasons.
    * Because of this, you cannot access the event in an asynchronous way.
    * If you want to access the event properties in an asynchronous way, you should call event.persist() on the event, which will remove the synthetic event from the pool and allow references to the event to be retained by user code.
* When a form component’s state is set by React.js, it is called a controlled component.
    * problematic because it renders a read-only element - a user cannot change the value property.
Using Synthetic Events
* register an event handler with its onChange prop and set the value prop with an automatic one-way data binding:
    * `const element = <input onChange={this.handleChange}` `type="text" value={this.state.value} />;`
* When a user changes the component's underlying element, its event handler is triggered. The handler can then update this.state.value with the this.setState() method. This causes the component hierarchy to re-render which updates the DOM hierarchy. On most devices, this happens so fast that a user never perceives a delay.
* use camelCase
* With JSX pass a function as the event handler, rather than a string
    * `onChange={this.handleChange}`
* You do not put these on components or high-level structure. Instead, you will put these as attributes to specific HTML elements. React does some performance upgrades to attach this on the root element for you. They are mounted when used and unmounted when not in use.
* you can use the capturing phase by registering an event handler with an event prop that ends in the word Capture. (onChangeCapture)
* If you find that you need the underlying browser event for some reason, use the nativeElement attribute to get it.
* Each SyntheticEvent contains the following properties:
    * boolean bubbles
    * boolean cancelable
    * DOMEventTarget currentTarget
    * boolean defaultPrevented
    * number eventPhase
    * boolean isTrusted
    * DOMEvent nativeEvent
    * void preventDefault()
    * boolean isDefaultPrevented()
    * void stopPropagation()
    * boolean isPropagationStopped()
    * DOMEventTarget target
    * number timeStamp
    * string type
* To be updated, the value prop of a React form component depends on an onChange event handler. Thanks to this.setState({value: event.target.value}), this.state.someName stores the latest string from the input text field component.
* Without onChange to handle the change event and this.state.someName to store the changed data, the value prop could never be updated. The text field would end up being a controlled component that could not be modified.
* defaultValue is used for uncontrolled components, which are components that React does not control. Let's add onChange = this.handleChange to the 3rd text field component.
* If we add readOnly={true} as an attribute for the 2nd input element, React no longer gives us a warning in the console.
Forms
Controlled Components
* input/text area/select - typically maintain their own state and update it based on user input; In React, mutable state is typically kept in the state property of components, and only updated with setState( ).
* If you combine the two, by making the React state the ‘single source of truth’. The React.js component that renders a form also controls what happens in that form on subsequent user input. An input form element whose value is controlled by React.js in this way is called a controlled component.
Select Tag


| Key      | Key code   | Character Code  |
| -------- | --------   | ----------------|
| a        |   65       |       97        |
| A        |   65       |       65        |
| Return   |   13       |       13        |
| Escape   |   27       |       N/A       |

---

## Stateful and Stateless Components:

### What are props?
__Props__ - data that is passed to a component when it is created.
* Props are immutable data that configures a new component before it’s mounted.
* JavaScript object - can have any kind of JS type
* They are accessible anywhere inside a component class via `this.props` object.
* props are like a components' configuration. You can think of them as options (kinda).
* After a component’s props are set, they never change.
    * Data that you give a component when it is created. Kinda like an HTML attribute. You cannot change this data once the component is Mounted, so it’s not a good idea to include information that you want to be dynamic.

### What is the state object?
__State__ - Data that’s initialized (with a default value) and changed from within a component. (mostly changed from user events). Basically, state is an object (pojo) that is used to record and react to user events.
* It is initialized by a component’s `getInitialState()` method, which is automatically invoked once before a component is mounted.
* It is available anywhere within a component class via the this.state object
* This state is mutable data that represents the internal state of a component.
* To mutate state use `this.setState()`, which is typically done after an event handler is triggered from a user interaction or a server response.
* State object is perfect for storing data that changes over time. Use `this.setState()` method to merge changes into the current this.state object. After the merge, the component is automatically re-rendered.
    * Ok, so State is different from props in two main ways: It is mutable, and it is initialized with a method (`getInitialState( )`). You can use state to persist/change/use data received from a user. When merged, the component is re-rendered to reflect these changes. The component controls the state - its own state. The props are being assigned by the owner. No control. Mutable vs immutable.
    * changed by itself? State governs the rendering of the component

## Why are Props and State Important?
* Props and State are implicit inputs to the `render()` method, which is invoked whenever it is mounted or its state is changed.
* `props` + `state` is the input data for the `render()` of a component
* Both are JavaScript objects
* both changes trigger a render update
* both should do the same thing on the same components
* if a component needs to alter one of its attributes at some point in time, that attribute should be part of its state, otherwise, it should just be a prop for that component
* Using one-way data binding, a component’s props, state, and presentation logic are combined into a user interface.
* Steps of reconciliation:
    * React invokes the component’s `render()` method
    * the render method combines this.props and this.state objects with the component’s presentation logic and returns a component hierarchy
    * this component hierarchy is then used to generate and mount elements onto the DOM
    * React remembers this component hierarchy after mounting
    * When a user then interacts with the component, an onChange event is fired and the component’s `this.handleChange( )` method is triggered. The event handler changes the component’s state using the `this.setState( )` method.
    * After updating the state, the component’s `render( )` is called again, combining this.props and this.state object with the component’s presentation logic. As a result, new component hierarchy is returned by the `render( )`
    * React compares the old component hierarchy with the new component and if the value of the component has changed, React applies those differences to the DOM hierarchy, updating only what’s changed.
* Reconciliation practice is easier to understand when its render( ) method is implemented as a pure function. Don’t do these things inside of the `render( )`
* Pure Function:
    * Return the same component hierarchy given the same props and state objects
    * Does not modify the component’s state directly or with the `this.state( )`
    * Does not read from or write directly from the DOM
    * Not interact with the Browser via functions like `setTimeout( )`
    * The true def: given a set of inputs the same output is produced every single time
        * given the state and props, the same component will be rendered

## Using Props and State to Separate the concerns of a React user Interface:
* React components are either:
    * __Stateful components:__ has a state but may or may not have props.
        * State managers
            * in charge of client-server communication, processing data, and responding to user events
        * at or near the root of a component hierarchy, thus responsible for managing the majority of the hierarchy’s state.
        * The fewer stateful components a component has, the easier it is to understand how information flows through it.
    * __Stateless components:__ often have props, but has no state
        * relies on state
        * not much to the object other than `render()`
        * all logic revolves around the props they receive
        * called dumb components
        * typically at or near the leaves of a component hierarchy
        * responsible for handling the majority of the hierarchy’s events.
        * Typically, components have more stateless components than stateful, especially if it creates a user interface with lots of events.

## How does information Flow between stateful and stateless components?
owner - a component that sets the props of another component
* should adhere to the single responsibility principal
* Note: the key prop is used by React to uniquely identify sibling components of the same type. If a keyed component is changed in any way, React can more efficiently update the DOM hierarchy. The key prop is not accessible via this.props.key
* Stateless components (ownee components) are affected state mutator methods
    * `this.props.incrementLikes()`
* state mutator - method inside a stateful component that invokes `this.setState( )`
    * called from a stateless component
* __autobinding__ - the process of binding a component to every method that is defined in its specification object. This is why the `this` variable inside the `incrementLikes( )` method refers to an `<App />` component even though it was invoked using `this.props.incrementLikes( )`
    * React automatically binds components to methods specified in the React.createClass( ) method but not in ES6 class.
* The `Object.assign() `method creates a new object that contains a copy of the key-value pairs from an object merged with a copy of the key-value pairs from an object defined as a parameter in the  `Object.assign( )`.
    * `const nextTrack = Object.assign({}, track, { likes: nextLikes });`
    * This is part of the immutable data model, which is an entity or collection (Object or Array) whose state cannot be changed after it’s created.
#### So:
1. A stateful component's state and state mutators are passed to a stateless component's props.
2. A stateless component's props are combined with presentation logic to render a user interface.
3. An event is handled by invoking a stateless component's event handler.
4. A stateless component's event handler is processed by invoking a stateful component's state mutator.
5. A stateful component's state mutator is resolved by changing its state.
6. Repeat step 1.

---

## [Component Lifecycle](https://facebook.github.io/react/docs/react-component.HTML)

[Codepen Example](https://jsfiddle.net/5g0a6oba/1/)

### Initial Render:
`getDefaultProps( )` - similar to `getInitialState( )`.
* First lifecycle method fired when going through the initial render of the component
* another way to set initial properties on a component
* called prior to `getInitialState()`, therefore `this.state` or `setState( )` will not work.

### `getInitialState( )`
* add state to your component

### `componentWillMount( )`
* runs before the component mounts the DOM. It is executed before the `render()` method to trigger a re-render.
`render()`
* only lifecycle method that is required

### `componentDidMount( )`
* method runs after the component is mounted
* if you want to fetch data, this is where you will want to make API calls and set state

```javascript
    const cartList = this.props.cart.map((item, index) => {
        return (
          <CartItem
            index={index}
            item={item}
            key={index}
          />
        )
      });

      return (
        <section id="cart-items">
          {cartL}
        </section>
      );
      }
    });

export default CartItems;
```

## On State Change:
`shouldComponentUpdate( )` - check if component should update
* you can compare the current props or state against the next props or state
* then determine if you want to update the component
* blocking an update can provide a benefit to performance in cases where you do not want an update to occur
    * to prevent an update, return false; to continue through the state change lifecycle return true
`componentWillUpdate( )`
componentDidUpdate( )
* called after the component has been rendered to that page. It is ok to use `setState()` in this lifecycle hook

## On Props Change:
`componentWillReceiveProps( )` - invoked when a component is receiving new props
*    useful if you need to set the state on a component based on some transition in the properties as this method has access to both the new properties and the old ones.
* will be skipped if none of your props have changed
  * `shouldComponentUpdate( )`
  * `componentWillUpdate( )`
  * `componentDidUpdate( )`

## On Unmounting:
`componentWillUnmount( )` - method runs before the component will unmount

```javascript
    var App = React.createClass({
          getInitialState: function(){
            return {
              text: ""
            }
          },

          componentWillMount: function(){
            console.log('WILL MOUNT JUST RAN!')
          },

          componentDidMount: function(){
            console.log('DID MOUNT JUST RAN!')
          },

          componentWillUnmount: function(){
            console.log('WILL UNMOUNT JUST RAN!')
          },

          handleChange: function(e) {
            this.setState({text: e.target.value});
          },

          remove: function(){
            ReactDOM.unmountComponentAtNode(document.getElementById('container'))
          },

          render: function() {
            return (
              <div>
                <h1>Hello world!</h1>
                <input onChange={this.handleChange} value={this.state.text} />
                <button onClick={this.remove}>Remove</button>
              </div>
            );
          }
        });

        ReactDOM.render(<App/>, document.getElementById('container'))
```

## propTypes:
* an object that allows you to validate the types for your props when they are passed to your components. useful for ensuring that the data types you expect are actually the ones you’re getting.
Questions:
1. Describe 5 methods in the component lifecycle
2. What kinds of things would we do in the componentWillMount method?
3. What kinds of things would we do in the componentDidMount method?
4. What kinds of things would we do in the componentWillUnmount method?
5. In this example, inside the componentDidMount method, we are using `.bind(this)`. What does this do? What happens if we omit the bind method?

#### Some scenarios that involve tapping into the component lifecycle:
* You want to make a request to fetch the user's orders when you are ready to display the orders table (a component).
* You want to detect when a search field has changed to trigger a new search request.
* You are filtering a set of cities in the United States based on a search in your `render` method. For performance reasons, you only want to render when the search field has changed.
* You want to display a new flashcard on the screen but you want to use a CSS transition to make what's currently there fade out.
* You need to initialize a UI component from a third party (think Materialize, chart.js, d3) once it is loaded.
Add Comment C
*  look into Polling

---

## React Router:

### React Router
Has lazy code loading, dynamic route matching, and location transition handling built in.
* Provides access to cached versions of components without having to make a separate request to load a different user interface or view. it also provides a fast method of creating client-side routing as well as the associated presentation views. np
* Simplifies client-side routing because it does not send a request to a server to load an entire page or component
    * you need a client and a match
*  nesting of URL will match the nesting of React Route Components. You can also load multiple named components from a single route (admin nav and aside vs a regular user navbar and aside)
* `npm install —save React.js-router@next` <— the @next installs the version in development

## [Material UI:](http://www.material-ui.com/#/)
What is Material UI?
* framework of components
* `npm install --save material-ui`
* `npm install --save React.js-tap-event-plugin`
* Config with brunch:     
    * `brunch new path/to/app --skeleton gSchool/with-React.js-material`

## [HTTP Requests with Axios:](https://www.npmjs.com/package/axios)

## Axios:
* Promised-based HTTP client for the browser and node.js - enables us to use the API the same way regardless of whether we are making requests in the browser or from Node.
* When making a request from the browser, Axios knows to use an XMLHttpRequest
* If you are on node, it uses node’s HTTP interface
* Axios is in compliance with the Promise/A+ specification, which means that the requests you make will return a Promise and are "then-able"
* Make XMLHttpRequests from the browser
* Make HTTP requests from Node.js
* Supports the Promise API
* Intercept request and response
* Transform request and response data
* Cancel requests
* Automatic transforms for JSON data
* Client side support for protecting against XSRF

### Using Axios
* install (`$ npm install --S axios`)
* import it in to a component file just like you would import another component, or React.js itself
* most of the time you will be running asynchronous requests from the componentDidMount lifecycle method.
* has `.get`, `.post`, `.put`, `.delete`
* Again, from the `componentDidMount`:

```
import axios from 'axios';
import React from 'React.js';
import ErrorLogger from './ErrorLogger';

const Foo = React.createClass {
  getInitialState() {
    return {
      movies: [],
      loadErr: false,
     }
  },

  componentDidMount() {
axios.get(`http://www.omdbapi.com/?s=bob`)
      .then(res => {
        this.setState({ movies: res.Search });
      })
      .catch(err => {
        this.setState({ loadErr: err });
      });
  }

  render() {
    return (
      <section>
        { loadErr && <ErrorLogger loadError={this.state.loadErr} /> }
        <ul>
          {this.state.movies.map((movie, index) =>
            <li key={index}>{movie.Title} | {movie.Year}</li>
          )}
        </ul>
      </section>
    )
  }
}

export default Foo;

```

* The Axios config object has some 20 properties available to configure difficult requests
* You may want to make multiple requests at the same time
    * concurrency helper methods.
        * .all - with .spread
        * pass in an array of functions to the `.all` method and all will return a promise with an array of the resolved promises. If one should fail, it will reject and handled by .catch.
        * The spread operator, under the hood, does the same thing as the spread operator
            * the callback makes available the results of each of the requests you made in the scope of a single function.

```

  function getUserAccount() {
    return axios.get('/user/12345');
  }

  function getUserPermissions() {
    return axios.get('/user/12345/permissions');
  }

  axios.all([getUserAccount(), getUserPermissions()])
    .then(axios.spread(function (acct, perms) {
      // All requests have resolved
    })
    .catch((error) => {
      // One or more requests have rejected
    });

```


## Resources
[McGiginnis, Tyler. "React Tutorial Pt 1: A Comporehensive Guide to Building Apps with React.js" 12 jan. 2015.](https://tylermcginnis.com/reactjs-tutorial-a-comprehensive-guide-to-building-apps-with-react/)

Know the 7 base react components.
