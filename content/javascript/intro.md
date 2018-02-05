---
title: "Introduction to C++"
cover: "https://s3.amazonaws.com/rsstdd-portfolio/cpp.png"
date: "02/02/2018"
category: "tech"
tags:
    - programming
    - c++
    - basics
---

# Introduction to C++

[MITOPENCOURSEWARE: Introduction to C++](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-096-introduction-to-c-january-iap-2011/Syllabus/)

C++ is a general-purpose, Object Oriented programming language created in 1979 by Bjarne Stroustrup. Stroustrup initially created the language as a set of extensions to the C programming language.

C++ was designed with a bias toward system programming and embedded, resource-constrained and large systems, with performance, efficiency and flexibility of use as its design highlights. C++ has also been found useful in many other applications, with key strengths being software infrastructure and resource-constrained applications, including desktop applications, servers, and performance-critical applications. C++ is a compiled language, with implementations of it available on many platforms.

## Advantages of C++ (Over Machine Language or Assembly)
1. __Conciseness__
2. __Maintainability__
3. __Portability__

## Compilation Process
```
Source Files --Compiler--> Object Files --Linker--> Executable ---OS--> Program in Memory

```

The compiler translates the code into machine language.

* Object Files are intermediate files that represent an incomplete copy of the program
  * Each source file only expresses a piece of the program. Therefore, when it is compiled into an object file, the object file has some markers indicating which missing pieces it depends on.
* The _Linker_ takes those object files and the compiled libraries of predefined code that they rely on, fills in all the gaps, and spits out the final program, which can then be run by the OS.

The compiler and the linker are programs. Because C++ programs are parsed ahead of runtime, C++ is fast.

C++ adds a step to the compilation process. It adds a _preprocessor_, which applies some modifications to the source code before feeding it to the compiler.

```
Source Files --Preprocessor--> Processed Code --Compiler--> Object Files --Linker--> Executable ---OS--> Program in Memory

```

To compile, use either Xcode (assuming, of course, that you are running OSX). Xcode uses something called GCC to compile C++ files. You can also compile from the command line like so:

```bash
c++ main.cpp -o hello1
```

Here, main.cpp is the source file, and hello1 is the destination for the compiled code.

Run the program by typing `./hello1`

## Hi

```c
// A Hello World program
#include <iostream>

using namespace std;

int main ()
 {
   cout << " Hello , world !" << endl;
   cin.get();

   return 0;
 }
```
### Breaking it Down:

> `return 0` is not necessary; however, a `return 0` informs the OS that everything is swell. By default, C++ programs will return `0` if there is no return at the end of main. That being said, it's a good idea to be explicit.

#### Tokens: the smallest meaningful symbol in the language.

| Token type             | Description/Purpose                                   | Examples                         |
|------------------------|-------------------------------------------------------|----------------------------------|
| Keywords               | Words that convey meaning to the compiler             | `int`,  `double`,   `for`,  `auto` |
| Identifiers            | Names of things that are not built into the language  | cout,   std,   x, myFunction         |
| Literals               | Basic Constant Values. Values specified directly.     | "Hello, world!",   24.3,   0, 'c'    |
| Operators              | Mathematical or logical operations                    | =,   -,   &&,   %, <<                  |
| Punctuation/Separators | Punctuation that defines program structure            | { }    ( )    ,   ;                  |
| Whitespace             | Spaces; Ignored by the compiler                       |                                  |

#### Comments: //

* Single-line comment: `// ...`
* Multi-line comment: `/* ... */`

#### #include
`#include <iostream>`

`#` signifies the start of a _preprocessor command._ The _include_ command is a specific preprocessor command that imports the contents of the file specified, which, in this case, is `iostream`. `iostream` is a standard file that is included with the C++ compiler. `iostream` is short for input/output streams that allow developers to acquire data from users.

As you can imagine, this modular style is useful for organizing code and managing project complexity.

#### using namespace std

`using namespace std;`

A __namespace__ is a set of symbols that are used to organize objects of various kinds, so that these objects may be referred to by name. Namespaces are commonly structured as hierarchies to allow reuse of names in different contexts. In other words, they prevent collisions.

The `using` command informs the compiler to allow all names in the "std" (standard) namespace to be available without their prefix. The iostream file defines three names used in this program: `cout`, `cin`, and `endl`. All of these names are defined in the std namespace.

Avoid using `using namespace std`. It's a good idea to be explicit in your code. Also, these namespaces are meant prevent collisions. In addition, being explicit makes it easier for humans as well as compilers to understand your code. So, use the prefix like so: `std::cout`, `std::cin`, `std::endl`

> `::` is called the _scope resolution operator_. :rainbow: #The more you know.

#### int main() { ... }
Every C++ program has a main function, which is called by the OS when the program is executed by the computer. The curly braces represent a block.

#### cin, cout

```c+
  cout << " Hello , world !" << endl;
  cin.get();
```
* cout - console output
* cin - console input
* In a typical C++ program, most function calls are of the form `object.function_name(argument1, argument2)`
* `<<` can also behave as functions, as illustrated by the use of `cout` above. This capability is called operator overloading which will be discussed later on.

#### Brackets:  { }
A block of code is defined with { }.

#### Semicolon:  ;
_Statements_ must be terminated with a semicolon.

#### return 0
the _return_ keyword informs the program to return a value to the function that called it. The program continues execution in the calling function from the point at which the function was called. The type of the value returned by a function must match the type specified in the declaration of the function. i.e. `int main ()`.

Executing return in the main function of a program returns a value and execution control to the OS component that launched the program.

### Escape Sequences
An escape sequence is a symbol used to represent a special character in a text lieral.

| Escape Sequence | Represented Character                               |
|-----------------|-----------------------------------------------------|
| \a              | System bell (Beep Sound)                            |
| \b              | Backspace                                           |
| \f              | Formfeed (page break)                               |
| \n              | Newline (line break)                                |
| \r              | "Carriage return" (returns cursor to start of line) |
| \t              | Tab                                                 |
| \               | Backslash                                           |
| \'              | Single quote character                              |
| \"              | Double quote character                              |
| \some integer x | The character represented by x                      |


## Basic Language features
### Values and Statements
* __Statement__ - A unit of code that does something
* __Expression__ - A statement that has a value.
  * Number, String, a sum of numbers, etc.

### Operators
__Types:__
* Mathematical: `+ - * / %`
* Logical: `&& || < > <= >= ==`
* Bitwise: Used to manipulate the binary representations of numbers.

### Data types
Different types take different amounts of memory to store.

| Type Names | Description                                                                      | Size    | Range                                                        |
|------------|----------------------------------------------------------------------------------|---------|--------------------------------------------------------------|
| char       | Single text character or small integer. Indicated with single quotes (’a’, ’3’). | 1 byte  | signed: -128 to 127 unsigned: 0 to 255                       |
| int        | Larger integer                                                                   | 4 bytes | signed: -2147483648 to 2147483647  unsigned: 0 to 4294967295 |
| bool       | Boolean                                                                          | 1 byte  | 1 0                                                          |
| double     | "Doubly" precice floating point number                                           | 8 bytes | +/- 1.7e +/- 308 ( 15 digits)                                |

* A __signed__ integer is one that can represent a negative number. __Unsigned__ will never be interpreted as negative, so it can represent a wider range of positive numbers. __Most compilers assume signed if unspecified__.
* There are __3 types of integers:__ short, int, long (increasing number of size).
* There are __3 floating point types:__ float, double, long double (increasing order of precision)
* The sizes/ranges for each type are not fully standardized; those shown above are the
ones used on most 32-bit computers
* An operator also normally produces a value of the same type as its operands; thus, 1 / 4
evaluates to 0 because with two integer operands, / truncates the result to an integer. To
get 0.25, you’d need to write something like 1 / 4.0.
* A text string, for reasons we will learn in Lecture 5, has the type `char *`.

### Variables
The name of a variable is an identifier token. Identifiers may contain numbers, letters, and underscores. They may not begin with a number.

When declaring a variable, you must inform the compiler what type x will be in order that the memory space may be computed and operations that may be performed are specified.

When initializing a variable, simply use the assignment operator ( `=` ) like so: `x = 4 + 4`

### Constants
A constant is an expression with a fixed value.
* __literals__ - used to express particular values within the source code (integers, floating points, chars, strings, booleans)
* __Defined constants__ (`#define`): User-defined named constants that do not require memory consuming variables.
When the preprocessor sees the `#define`, it will replace every subsequent occurrence of the identifier in the source code.
* __Declared constants  (const)__ - user defined constants with const prefix with a specific type that are declared the same way as variables. The Value of a const variable cannot be modified.

### L-values, R-values
__lvalue__, or "left hand side value" (of an assignment).
* ex: `int var` <-- var is lvalue because we can assign it with some value. `float x`
__rvalue__, or "right hand side value," because rvalues can appear on the right hand side of an assignment. Anything with a well-defined value can be an rvalue, including an assignment, i.e. (`x = 5`) can be used as an rvalue whose value is 5. e.g.`y = (x = 5)`.

### Type Conversions
Also called __casts__. Type conversions are implicit when changing from smaller data type pto larger data type or data type of same size (float to double or int to float). When you are changing from bigger to smaller or when there could be a loss of accuracy, you must be explicit.

```c+
int x = (int)5.0; // float should be explicitly "cast" to int
short s = 3;
long l = s; // does not need explicit cast, but
            // long l = (long)s is also valid
float y = s + 3.4; // compiler implicitly converts s to float for addition
```



## [Next Lesson: Control Flow](./flow-control.md)


## Resources

[C++/Introduction. Wikiversity](https://en.wikiversity.org/wiki/C%2B%2B/Introduction)

[MITOPENCOURSEWARE: Introduction to C++](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-096-introduction-to-c-january-iap-2011/Syllabus/)

[Brokken, Frank. C++ Annotations Version 10.7.2](http://www.icce.rug.nl/documents/cplusplus/)
