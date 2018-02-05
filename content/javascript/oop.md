---
title: "Four Pillars of OOP"
cover: "https://s3.amazonaws.com/rsstdd-portfolio/bierdstadt.png"
date: "02/02/2018"
category: "tech"
tags:
    - programming
    - javascript
    - computer science
---

# Four Pillars of OOP:

## Pillars:

1. __Abstraction__ - the process of exposing essential features of an entity while hiding other irrelevant details
    1. reduces code complexity and, at the same time, it makes code aesthetically pleasant
    2. provide methods to the outside world to access and use data variables; however, all variables are hidden (abstracted) from direct access.
2. __Encapsulation__ - (leads to data hiding) hide your modules’ internal data and all other implementation details/mechanisms from other modules
    1. a way of restricting access to certain properties or components
    2. All about binding the data variables and functions together in a class
3. __Inheritance__ - The ability to create a new class from an existing class and share methods/properties
    1. the base class (parent class) has properties and methods that will be inherited by the sub class which can have its own additional properties or methods.
    2. keeps code DRY
4. __Polymorphism__ - the ability to take into different forms or stages; Create functions with the same name but different arguments (types), which will perform differently. — A function with the same name that functions differently based upon the arguments given.
    1. Class and Subclass <— class based language (java, js(ish))
        1. you can pass different types into a function
    2. It allows us to redefine a function to provide its new definition
    3. A subclass can define its own unique behavior and still share the same functionalities or behavior of its parent/base class.
        1. Not the other way around
