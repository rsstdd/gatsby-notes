---
title: "Angular 1.5"
cover: "https://s3.amazonaws.com/rsstdd-portfolio/angularjs.png"
date: "02/02/2018"
category: "tech"
tags:
    - programming
    - javascript
    - closures
---

# Angular 1.5

## Terms:
* __model__ - data stored on the client (raw in server)
    * data shown to the user in the view and with which the user interacts
* __Directive__ - an instruction in angular to manipulate a piece of the DOM
* __View__ - what the user sees (the DOM)
* __Scope__ - context where the model is stored so that controllers, directives, and expressions can access it
    * `$scope`
    * an obj used for data binding that we can define methods and properties on.
* __Services__ - Features that abstract data logic from the controller
    * store information that can be accessed by different controllers and directives
        * hitting a public api
        * a collection of methods or logic that is used in multiple controllers (DRY)
        * controllers do not persist data; Services do.
* __watcher__ - Angular will identify all places where it needs to track variables (think `ng-model`, creating instances of `ng-controller`, and `ng-init`) and placing them in their proper scope (based on the DOM tree). With this in mind, it now has all the variables that the web page uses. Angular track any changes to these variables by creating watchers on each of these variables.
* __$scope.$digest( )__ immediately starts the dirty checking and parsing on the current scope and below. The more recommended form is to use $scope.$apply().
* __$digest cycle/$digest loop__ - implicitly sets a watcher. checks for changes on the variables either in the controller or on the page. Will run 10x to prevent infinite loops. Not recommended for use.
* __$scope.$apply( )__ takes in a function or an angular expression as a string, executes it, and then ensures that $scope.$digest() is called afterwards. This allows the entire page to check for changes rather than the current scope. This is often the case when we use outside libraries.
* __AngularJS is an MV*__ framework that is ideal for use when building client-side single-page apps. It is not a library, but a framework for building dynamic web pages. It focuses on extending HTML and providing dynamic data binding, and it plays well with other frameworks (e.g., jQuery).
    * When writing an AngularJS app, we write the behavior and interaction together alongside the presentation
    * Provides bi-directional data binding
* __controllers__ -  class-like objects that drive model and view changes. Changes to the way $scope is declared, preference to the this keyword instead of $scope.
* __“Controller as” syntax__ - syntax: "SomeController as someController”
    * `$ctrl` - variable like ControllerAs syntax. (`ng-model` object)
- __ng-app__ - directive that defines where in the page An is running.
- __ng-model=“yourName”__ - usually text input; binds a variable from an input field to a scope variable
- ng-bind -  directive that doesn’t render the {{{ }} before angular loads
- __one time binding -  ::ng-bind__ -  only binds once on page load. :: <—syntax  
- __ngTransclude__
- __ngClass__
- __ngRepeat__ - the ability to repeat DOM elements (and children) for each item in an array
- __ngShow__ - Show a DOM element if a condition is true; Otherwise, hide it
- __ngClass__ - apply a class onto a DOM element should a condition be true (`ng-class="{ selected: choiceCtrl.isSelected(item) }”`)
* __ng-animate__
* __ng-aria__ - disability
* __ng-message__
* __ui-router__ - nested views
* __Custom directives__
* __Angular 2__

---

1. First, we used our most important (and most easily forgotten) term: the `ng-app` attribute on the `<html>` tag. Without this tag, the AngularJS process does not start
2. Second, we told AngularJS that we want to set up bi-directional data binding on the `yourNamemodel` on the page.
3. Third, we told AngularJS to display the data yourName in the directive template called `{{ yourName }}.`

## Angular can be broken down into 5 major components:
1. Directives
2. Controllers
3. Scopes
4. Services
5. Dependency Injection

* __ngModel__ - The `ngModel` directive binds an input, select, text area (or custom form control) to a property on the scope using NgModelController, which is created and exposed by this directive.
*   __ngBind__ - The `ngBind` attribute tells Angular to replace the text content of the specified HTML element with the value of a given expression, and to update the text content when the value of that expression changes.
* __ngController__ - The `ngController` directive attaches a controller class to the view. This is a key aspect of how angular supports the principles behind the Model-View-Controller design pattern.
* Binding the view into the model, which other directives such as input, text area or select require.
* Providing validation behavior (i.e. required, number, email, url).
* Keeping the state of the control (valid/invalid, dirty/pristine, touched/untouched, validation errors).
* Setting related css classes on the element (`ng-valid`, `ng-invalid`, `ng-dirty`, `ng-pristine`, `ng-touched`, `ng-untouched`, `ng-empty`, `ng-not-empty`) including animations.
* Registering the control with its parent form.

### Angular is Useful Because:
* Code reuse
* Code Organization
* Quickly build complex websites
* State management

## Views

### Terms:
* View - what the user sees (the DOM)
* angular expressions - JS-like snippets that are usually placed in bindings like “`{{ expression }}`"
* angular directives - ng’s way of extending HTML; used to add functionality to HTML; At a high level, directives are markers on a DOM element (such as an attribute, element name, comment or CSS class) that tell AngularJS's HTML compiler to attach a specified behavior to that DOM element or even transform the DOM element and its children.
    * `ng-repeat` - iterate over an array or obj
        ```javascript
         <div ng-repeat="(key, value) in myObj"> ... </div> (object)
             <li ng-repeat='name in names'>{{ name }}</li> (arr)
        ```

            * The order of keys returned for an object is dependent on the order returned by the browser using (for key in myObj)
            * Keys starting with $ will be ignored
            * Built in filters such as orderBy and filter do not work with objects (to be discussed later)
* __ng-hide/ng-show__ - `ngShow` and `ngHide` will show or hide a specific HTML element based off of a provided expression. Let's take a look at some examples.
    * The element is hidden when the expression provided to ng-show attribute is false. `ng-hide` will hide an element when the expression given to ng-hide is true.
* __ngClass__ -   `ng-class` will dynamically set an element's class depending on a provided expression.
    * `<div ng-class='{highlight: 4 + 4 === 8}'> 4 + 4 = 8</div>`
* __ngSrc & ngHref__ -  Using Angular markup like `{{hash}}` in src and href attributes does not work right: The browser will fetch from the URL with the literal text `{{hash}}` until Angular replaces the expression inside `{{hash}}`. The ngSrc and ngHref directives solve this problem.
  ```
    <img ng-src="http://www.imageurl.com/{{expression}}” alt="Description"/>
     <a href="http://www.imageurl.com/{{expression}}">link</a>
  ```
* __Angular filters:__ <— syntax
    *  __currency__ - converts a number into a currency value
        * {{ expression | filter }}
    * __date__ - converts a string into a datetime or UNIX timestamp
        * `{{ 1288323623006 | date : 'medium' }}`
        * `{{ 1288323623006 | date : "MM/dd/yyyy 'at' h:mma" }}`
        * `{{ 1288323623006 | date : "EEEE" }}`
    * __filter__ - returns a subset of items from an array
        * `<tr ng-repeat="friend in friends | filter : searchText">`
        * number - round numbers to specific decimal
        * `{{ 3.14159265359 | number : 3 }}`
        * `{{ 3.14159265359 | number : 6 }}`
        * `{{ 3.14159265359 | number : 1 }}`
    * __json__ - converts a JavaScript object to JSON
    * `limitTo` - returns a new string or array that contains only a limited number of elements
    * `lowercase` - converts a string to lowercase
    * `uppercase` - converts a string to uppercase
    * `number` - formats a number as text
    * `orderBy` - orders an array of objects by specific predicate
        * `<tr ng-repeat="friend in friends | orderBy : 'age'">`
* __Angular Modules__ -   The `angular.module` is a global place for creating, registering and retrieving Angular modules. All modules (angular core or 3rd party) that should be available to an application must be registered using this mechanism. In app/app.js, you will see this:
```javascript
      import angular from 'angular'
      angular.module('myAngularApp', []);
```
* Angular Materialize:
```javascript
      import angular from 'angular'
      import angularMaterialize from 'angular-materialize'
      angular.module('myAngularApp', [angularMaterialize]);
```

## Controllers
### Terms:
* __Controller__ - provides properties and functionality to get the data in the model, process it in some way, and send it to the view. Mostly has to do with the view
    * provide a bridge between the model and the view
    * Used to Augment the Angular Scope
* __model__ - data stored on the client (raw in server)
    * data shown to the user in the view and with which the user interacts
* __ngController__ - a special method that takes two args: the name of the controller and a class. `ng-controller` is a built-in directive that starts as the name of the controller followed by the keyword as then a name defined in the js file.
    * When a new controller is created, everything inside and including the element can reference that controller.
* __Scope__ - context where the model is stored so that controllers, directives, and expressions can access it
    * `$scope`
    * an obj used for data binding that we can define methods and properties on.

 Controllers are a bridge between the model and view, which is to say that an angular controller accepts data from the database and informs the view the manner in which that data is to be displayed after formatting, processing etc. Controllers and Views are tied together using two-way data binding. Hence, angular controllers are called View models and the architectural pattern becomes MVVM.

Controllers live in files specific to the functionality that you want to accomplish. You must initialize your controller in the app/app.js file like so:
```javascript
       angular.module('todoApp', [])
         .controller('TodoListCtrl', TodoListCtrl); //(special method called controller: name of the controller and a class)
```

In the HTML, initialize the controller using ng directive called `ng-controller`, which starts as the name of the controller, followed by the keyword as, then an alias. The alias creates an instance of the controller class as defined in the JS file. When a new controller is instantiated, everything inside and including that element can reference the controller.

## Services

### Terms:
* __Services__ - Features that abstract data logic from the controller. Share data and functionality throughout the app. Singletons that can be injected into controllers and other services, which makes them ideal places for writing reusable code.
    * store information that can be accessed by different controllers and directives
        * hitting a public api
        * a collection of methods or logic that is used in multiple controllers (DRY)
        * controllers do not persist data; Services do.
* __watcher__ - Angular will identify all places where it needs to track variables (think ng-model, creating instances of `ng-controller`, and `ng-init`) and placing them in their proper scope (based on the DOM tree). With this in mind, it now has all the variables that the web page uses. Angular track any changes to these variables by creating watchers on each of these variables.

### Three ways to implement a service:
1. Factory
    * function
    * popular in ES5
    * must return an obj
2. Service
    * can use ES6 classes
    * angular creates a new instance
    * Class
3. Provider
    * higher level - probably will not use
    * a factory that can be configured before the app starts, which allows for more flexibility

### When Building a Service:
* The constructor takes in an argument. This is the singleton that the service provides. We save that service in the instance with `this.peopleSvc = peopleSvc;`
* We used the service's addPerson method in the controller's addPerson method.
* We get access to the people with a people() method, which returns the people stored in the service.
* We inject the PeopleService into the controller with `PeopleCtrl.$inject = ['peopleService']; `This is how we can include the service into the constructor at the top. Note that the array contains a string with the name of the service. This is the same name as defined in the app.js file. This process is called dependency injection.
* Lastly, the one last thing is we want to update our HTML to reflect our need to grab the people via a method versus a variable.
Angular Digest Cycle

## $digest cycle/$digest loop
1.  Difference b/w $scope.$digest and $scope.$apply - $apply is recommended; takes a function or ng expression as a string, executes it, and then ensures that $digest is called afterwards. This allows the entire page to check for changes rather than the current scope. Apply runs the variable through a function. the function expression is performed then implicitly calls the digest.
    1. ` $scope.$digest()` immediately starts the dirty checking and parsing on the current scope and below.
2. If you have an async operation, It needs to be friendly with ng.  This is the point of Today’s lecture.
How does an handle two-way Data Binding?
1. Angular identifies variables (`ng-model`, `ng-controller`, `ng-init`) and tracks changes to these variables by creating watchers on each variable
    1. __watcher__ - Angular will identify all places where it needs to track variables (think `ng-model`, creating instances of `ng-controller`, and `ng-init`) and placing them in their proper scope (based on the DOM tree). With this in mind, it now has all the variables that the web page uses. Angular track any changes to these variables by creating watchers on each of these variables.
2. Angular then compiles the rest of the page while looking for {{ }} to include the values from these watchers into the age in proper formatting.
3. The watchers' responsibility is to inform Angular when to re-render the page with new variables (adjusting the page accordingly). This is what allows two-way data binding to occur.
  How do the watchers inform Angular of changes?
1.  Angular has a built-in function in $scope called $digest.
2. Angular checks each of the watchers (in its watch list) for any changes (this is called dirty checking).
3. If there's a change, it will make changes to the view and check for any new changes to process.
4. these watchers have the ability to change other models, which trigger another call to $digest. This is called the $digest cycle or $digest loop.
5. To avoid infinite loops. $digest will run at most 10 times or until the models settle to a common value.

__$apply__ - This core method lets you to start the digestion cycle explicitly. That means that all watchers are checked; the entire application starts the $digest loop. Internally, after executing an optional function parameter, it calls `$rootScope.$digest();`.
$digest - In this case the $digest method starts the $digest cycle for the current scope and its children. You should notice that the parent’s scopes will not be checked. and not be affected.

## Promises and $q
Since Angular does not update the variables it's watching using asynchronous APIs, AJAX requests do not automatically update the UI. This is because they are external to the Angular digest cycle. i.e. Angular does not know when these asynchronous APIs are done executing, so you must manually call $scope.$apply() or $scope.$digest() to let Angular know that some things have changed and the UI should be updated.

As you may recall, promises represent an asynchronous value. $q is Angular's implementation of promises. $q allows us to use promises within the digest cycle of Angular without the need to call $scope.$apply() or $scope.$digest()

  __$q has a similar API to native promises:__
```javascript
        app.factory('UserService', function($q){
          return {
            getUserData: function() {
              return $q(function(resolve, reject){
                someAsyncThing(function(error, userData){
                  if(error) {
                    reject(error);
                  } else {
                    resolve(userData);
                  }
                });
              });
            }
          }
        });
```

## UI Router for Angular
Angular routing does not require a request to the server to redisplay the page, which completes our ability to convert a multi-application to a single-page application.

### Why UI Router
* uiRouter is a third party built routing solution for Angular. It was built to provide routing capabilities above and beyond ngRoute (angular’s built in tool). The main advantage of uiRouter is its ability to associate nested views to different routes (that is views within views).
* `$state` - returns state object; Reference to the state’s config object. Useful for accessing custom data. Since its very common to access $state in your templates, you need to bind `$state` to `$rootScope` (or any other accessible scope) to access it from a template/view. Typically you can do this on module run:
* `ui-sref` - directive that binds a link tag to a state. if the state has an associated URL, the directive will automatically generate & update the href `attr` via the `$state.href( )` method. Clicking the link will trigger a state transition with optional parameters.
    * Instead of having to type out `/#/register` or `/#/login`, we just pass along the name of the state and it automatically populates the link's href attribute with the correct URL for us. This is especially useful when you change your routes (i.e. changing `/#/register` to `/#/create_account`) - instead of having to go through your entire codebase to reflect this change, you simply update the relevant UI-Router configuration and ui-sref will change all links accordingly
    ```html
          <a ui-sref="app.login"
                 ng-show="$ctrl.authType === 'register'">
                 Have an account?
          </a>
          <a ui-sref="app.register"
                 ng-show="$ctrl.authType === 'login'">
                 Need an account?
          </a>
        </p>
      ```

## Angular Custom Directives
### What are Custom Directives?
* Allows the developer to create a marker on a DOM node that specifies some specific behavior that the view has access to. It’s the ability to create a controller with access to the DOM element itself. Modify DOM elements in the controller.
Why is this useful?
* DRY code; custom, reusable components/functionality that you want to accomplish
        * perhaps navigation/buttons; similar functionality on different views
    * can be used everywhere as a standalone view
    * as an extension to templates
    * manipulate the DOM
How do build a directive:
* In our `app/logo/angular-logo.directive.js` file, write the following:
    * Similar to the factory - returns an object; a function that returns an object
    ```javascript
      const angularLogo = function() {
        return {
          restrict: 'EA',
          template: '<img src="https://lh6.googleusercontent.com/-TlY7amsfzPs/T9ZgLXXK1cI/AAAAAAABK-c/Ki-inmeYNKk/w749-h794/AngularJS-Shield-large.png" style="width: 200px; height: 212px;">'
        };
      };

      export default angularLogo;
  ```
* Your file needs to export the function that returns an objet. This obj has the following keys:
    * restrict - This defines how the directive can be used. There are one of four types it could be:
        * Element (E) - An HTML element.
        * Attribute (A) - An HTML attribute.
        * Class (C) - A CSS class (not recommended)
        * Comment (M) - HTML comment (not recommended)
    * template - A string of HTML to use as the template.
* Include it in `app/app.js`:
    * register a directive using the directive fn, which takes a name as well as the fn we exported in the directive file
```javascript
import angular from 'angular'

import angularLogo from './directives/angular-logo.directive';

angular.module('my-app', [ ])
  .directive('gsAngularLogo', angularLogo); // <—camel case.
```
### Template URLs
* You can create a file to store the HTML and access it from the directive. The template key is used to define the html to be included. This gets out of hand. So, create a file to store the HTML and access it in our directive

```javascript
const angularLogo = function() {
  return {
    restrict: 'EA',
    templateUrl: 'views/angular-logo.html'
  };
};

export default angularLogo;
```
### Directives And Controllers
* You can also add these directives to a controller:
* isSelected() - checking if the choice is selected or not.
* toggleSelected() - changes the state of whether the choice is selected or not.
```javascript
class ChoiceCtrl {
  constructor() {
    this.selected = false;
  }

  toggleSelected() {
    this.selected = !this.selected;
  }

  isSelected() {
    return this.selected;
  }
}

export default ChoiceCtrl;
```

* Directive:
```javascript
const choice = function() {
  return {
    restrict: 'E',
    templateUrl: 'views/choice.html',
    controller: 'ChoiceCtrl',
    controllerAs: 'choiceCtrl'
  };
};
export default choice;
```
    * controller - the name of the controller as (to be) defined
    * controllerAs - the name of the instance of the controller to be created. This will be similar to ng-controller="controller as controllerAs"
* app/app.js:
```javascript
  import angular from 'angular'

  import angularLogo from `'./logo/angular-logo.directive'`

  import choice from `'./choice/choice.directive.js'`
  import ChoiceCtrl from `'./choice/choice.controller.js'`

  angular.module('my-app', [])
    .controller('ChoiceCtrl', ChoiceCtrl)
    .directive('gsAngularLogo', angularLogo)
    .directive('choice', choice);
```
Isolated Scope
The reason this is because the controller is shared across all choices. To do that, we need to isolate the scope for each directive. Modify your directive in `app/choice/choice.directive.js`. Do this by adding scope to the directive - anything defined outside of the scope cannot be used inside.
* In app/choice/choice.directive.js:
```javascript
const choice = function() {
  return {
    restrict: 'E',
    templateUrl: 'views/choice.html',
    controller: 'ChoiceCtrl',
    controllerAs: 'choiceCtrl',
    scope: {}
  };
};
```
export default choice;
* The key scope isolates the scope to each individual instance, which means that anything defined outside of its scope cannot be sued inside. This is recommended practice. Passes functionality from the outside scope inside.
* independent from the view of the directive controlled by the controller

### Transclusion
* __transclusion__ - the ability to include elements within the directive into the view itself. You must add transclusion to the directive. Because anything that is put inside the choice element is erased and is replaced with the template specified.
* app/choice/choice.directive.js:
const choice = function() {
  return {
    restrict: 'E',
    templateUrl: 'views/choice.html',
    controller: 'ChoiceCtrl',
    controllerAs: 'choiceCtrl',
    scope: {},
    transclude: true
  };
};

export default choice;
* use ngTransclude in HTML :
                    <ng-transclude></ng-transclude>
    * this defines the location to insert any children defined inside of the directive
Passing outer scope values into isolated scope
* There is another way to pas outer scope values into an isolated scope:
    * use a controller to insert values into another controller
    * use ngRepeat to repeat through the set of choices. The choice element (referencing the directive) has a value attr that will get the reference the value in each option variable. The message value in an option will get transcluded in.
* Inside the app/multichoice/multichoice.controller.js, include the following:
class MultiChoiceCtrl {
  constructor() {
    this.options = [{
      value: 'a',
      message: 'I understand custom directives.'
    }, {
      value: 'b',
      message: 'I do not understand custom directives.'
    }, {
      value: 'c',
      message: 'I do not understand custom directives.'
    }];
  }
}

export default MultiChoiceCtrl;
* app/app.js
    * .controller('MultiChoiceCtrl', MultiChoiceCtrl)
* index.html
<div class="choice" ng-class="{ selected: choiceCtrl.isSelected() }" ng-click="choiceCtrl.toggleSelected()">
  {{ choiceCtrl.value }}. <ng-transclude></ng-transclude>
</div>
* app/choice/choice.directive.js.
const choice = function() {
  return {
    restrict: 'E',
    templateUrl: 'views/choice.html',
    controller: 'ChoiceCtrl',
    controllerAs: 'choiceCtrl',
    scope: {
      value: '='
    },
    transclude: true,
    bindToController: true
  };
};

export default choice;
    * To specify an allowable scope variable to pass down, you specify the name of the variable as the key in the object under scope with a value of =, which means evaluate the attribute value and use that result. We also specified bindToController to true, which means add all variables defined in scope and place it in the controller choiceCtrl.
    * @ - Evaluates the attribute value as a pure string.
    * = - Evaluates the attribute value as an Angular expression to evaluate.
    * & - Evaluates the attribute value as an Angular expression that can later be invoked.
Angular $http
* dependency injection - a software design pattern that implements inversion of control for resolving dependencies. A dependecy is an object that can be used (a service). An injection is the passing of a dependency to a dependent object (a client) that would use it.
    * used because of the need to write modular code
    * Dependencies === services
    * imported into a dependent object (controller/directive/filter)
        * separates the creation of the dependency from its behavior and enables the client to abide by the single responsibility principle
    * Inject is a service used to inject a dependency. Angular uses dependency injection
* Built-in Angular Services (3 main):
    * $http - facilitates communication with remote HTTP servers via the browser’s XMLHttpRequest object or via JSONP
        * Angular’s wrapper for AJAX calls
    * $location -
    * $q - (angular wrapped promises)
How do you use $http?
* $http is a fn that takes a single argument - a configuration argument - that is used to generate an HTTP request and returns a promise
$http({
  method: 'GET',
  url: '/someUrl'
}).then((response) => {

});
* The response object has these properties:
    1. data – {string|Object} – The response body transformed with the transform functions.
    2. status – {number} – HTTP status code of the response.
    3. headers – {function([headerName])} – Header getter function.
    4. config – {Object} – The configuration object that was used to generate the request.
    5. statusText – {string} – HTTP status text of the response.
* Shortcuts -
    * $http.get('/someUrl', config).then((response) => {});
    * $http.post('/someUrl', data, config).then((response) => {});
    * $http.get
    * $http.head
    * $http.post
    * $http.put
    * $http.delete
    * $http.patch
Angular Events & Form Validation
* ng-click
* ng-mouseenter
* ng-submit
* Imperative programming - changing the program’s state by issuing commands. Any time you issue a command in a program, you are practicing imperative programming.
