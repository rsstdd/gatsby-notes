---
title: "C++ | Control Flow"
cover: "https://s3.amazonaws.com/rsstdd-portfolio/cpp.png"
date: "02/02/2018"
category: "tech"
tags:
    - programming
    - c++
    - basics
---

# Flow of control

## Control Structures
__Control Structures__ are portions of program code that contain statements within them and, depending on the circumstances, execute these statements in a certain way. There are typically two structures: _conditionals_ and _loops_.

### Conditionals
C++ has _if_ and _switch-case_ conditional structures.

#### Operators
C++ has: `>  >=  <  <=  ==  !=`
* Like other languages, these operators return a boolean value, indicating whether the relation tested for holds.

#### Logical Operators
C++ has: `&&  ||  !`

Any value can be used in a Boolean expression. Thus, strings, chars, and ints are truthy.

### If, If-else, else if
```c+
if(condition)
{
  statement1
  statement2
}
```

If there is only one statement, the braces may be ignored.

```c+
if(condition)
{
  statement1
  statement2
}
else
{
  statementB1
}
```

### Switch-Case
```c+
switch(expression)
{
  case constant1:
    statement1
    statement2
    break;
  case constant2:
    statement1
    statement2
    break;
  default:
    statements
    ...
}
```

### Conditional expression

`( condition ) ? expressionIfTrue : expressionIfFalse;`

### Loops
C++ has _while_, _do-while_, and _for_ loops.

#### while
```c+
while(condition)
{

}
```
(If there is only one statement, the braces may be omitted)

#### do-while
```c+
do
{
  statement1
  ...
}
while(condition);
```

#### for
```c+
for(initialization, condition, incrementation)
{
  statement1
  statement2
}
```


## Resources

[C++/Introduction. Wikiversity](https://en.wikiversity.org/wiki/C%2B%2B/Conditional_Statements)

[MITOPENCOURSEWARE: Flow of Control](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-096-introduction-to-c-january-iap-2011/lecture-notes/MIT6_096IAP11_lec02.pdf)

[Brokken, Frank. C++ Annotations Version 10.7.2](http://www.icce.rug.nl/documents/cplusplus/)
