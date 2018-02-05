---
title: "What is Event Delegation?"
cover: "https://www.bram.us/2018/01/30/whats-new-in-ecmascript2018/"
date: "01/01/2017"
category: "tech"
tags:
    - programming
    - javascript
    - events
---

# What is __Event Delegation__

__Event delegation__ is a concept that allows developers to use one event listener on a
parent element and still capture information from child elements by taking advantage of bubbling. When the event bubbles up to the parent element, simply check the event object's target property to obtain a reference to the actual node that was clicked. This is a performance optimization that avoids adding/removing events to _n_ children.

### Event capturing and event bubbling:
1. Capturing:
  * When an event happens on an element, the browser moves down the DOM hierarchy until it finds the element raising the event.
2. Targeting:
  * Once the browser finds the element that caused the event, it enters the targeting phase. (The event reaches the target element)
  * The most deeply nested element that caused the event is called a target element, accessible as event.target.
3. Bubbling:
  * Once targeting is complete, the browser bubbles up from the element back to the topmost container to see if anything else needs to use the same event.

```javascript
document.getElementById('SOME-ID').addEventListener('click', (e) => {
  if(e.target && e.target.nodeName == 'SOMETHING') {
    // do work here
  }
});
```

## Resources
[How JavaScript Event Delegation Works, DWB](https://davidwalsh.name/event-delegate)
[Introduction to events, MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)
[Event.bubbles, MDN](https://developer.mozilla.org/en-US/docs/Web/API/Event/bubbles)
[JavaScript Interview Questions: Event Delegation and This](https://modernweb.com/javascript-interview-questions-event-delegation/)
[Bubbling and capturing, Modern JS Tutorial](https://javascript.info/bubbling-and-capturing)
