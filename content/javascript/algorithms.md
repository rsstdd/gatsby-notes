---
title: "An intro to algorithms"
cover: "https://unsplash.it/400/300/?random?BoldMage"
date: "02/02/2018"
category: "tech"
tags:
    - programming
    - javascript
    - computer science
---

# Algorithms

## Terms
* __Algorithm__ - a self-contained step-by-step set of operations to be performed. Algorithms perform calculation, data processing, and/or automated reasoning tasks.

### Algorithms:
* have a goal - are deterministic, meaning it will always produce the same output from a given starting condition or initial state.
* terminate at some point in time
* take an input
* produce an output

__Example:__
* Searching for the definition of a word in the dictionary
    * 1. determine word
    * 2. find dictionary
    * 3. open dictionary
    * 4. efficiently flip to approximate location of letter within the dictionary (As-Bs, etc)
    * 5. efficiently flip to the approximate location of word in that section
    * 6. find word within the page
* Figuring out which Restaurant to go to:
    * determine if both parties are hungry
    * negotiate consensus
    * suggest many restaurants
    * reject all restaurants suggested
    * yelp for things close
    * chose one of the aforementioned locations that you always go to.

__Measuring Algorithms__
* It’s correctness - expected output
    * Formally, a mathematical proof
    * programmers test and reason
* Speed
    * should be relative rather than an absolute number of operations the algorithm uses
        * not all computers are the same
        * not all computations are the same
        * complexity - time complexity
* Memory footprint
    * relative measurement that will define the amount of space an algorithm will create
        * space is cheap, so we’re more concerned with the time things take to complete
