---
title: "Web Dev Cheat Sheet"
cover: "https://s3.amazonaws.com/rsstdd-portfolio/bierdstadt.png"
date: "02/02/2018"
category: "tech"
tags:
    - programming
    - javascript
    - web dev cheat sheet
---

# Web Dev Cheat Sheet

##Express Server Middleware:
* __Cookie-parser__ (npm install --save cookie-parser) <— Parse Cookie header and populate req.cookies with an object keyed by the cookie names
* __bcrypt-as-promised__ (npm install --save bcrypt-as-promised)- Hashes, salts, and compares passwords/inputs
* __jwt__ - jsonwebtoken (npm install --save jsonwebtoken) <— the token conforms to JWT standard (pronounced jot). A JWT is a method of communication the authentication state through an open standard.
* __dotenv__ (npm install —save-dev dotenv) <— zero-dependency module that loads environment variables from a .env file into process.env.
```javascript
'use strict';
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
```
* __Express__ (npm install —save express)- server side framework - makes creating HTTP servers easier
* __Body-parser__ (`npm install —save body-parser`) <— parses things: JSON
* __Morgan__ (`npm install —save morgan`) <— logs things to the terminal - the time requests take for the server to complete
* __Humps__ (`npm install —save humps`)  <-- (camelize/decamelize)
* __Boom__ (`npm install —save boom`) - atomizes error messaging; Boom formats the error object for you
* __Knex__ - Knex facilitates: Object-relational mapping (converting data between incompatible type systems; sql & js)
  * `‘pg'` <— PostgreSQL
  * `npm install --save pg`
  * `npm install--save knex`
* __Foreman__ - (`npm install --save-dev foreman` ) foreman is a manager for procfile-based apps that aims to abstract away the details of the procfile format and allow developers to run an app directly or export it to some other process management format
* __Joi__ - ( `npm install --save express-validation joi` ) Joi allows you to create blueprints or schemas for JavaScript objects (an object that stores information) to ensure validation of key information.
* __ESLint__ - ( `npm install -D eslint eslint-config-ryansobol` ) ESLint is an open source JavaScript linting utility. Code linting is a type of static analysis that is frequently used to find problematic patterns or code that doesn’t adhere to certain style guidelines.
* __Request__ - ( `npm install --save request` )  is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.
* __Passport__ - authentication middleware for node.js that is designed for a singular purpose: to authenticate requests.
Authentication mechanisms, known as strategies, are packaged as individual modules. Applications can choose which strategies to employ, without creating unnecessary dependencies.


## ESLint:
### [Ryan’s Config:](https://github.com/ryansobol/eslint-config-ryansobol)

#### ESLint Setup:
* For local useage, install the package: `npm install -D eslint eslint-config-ryansobol`
* touch .eslintrc.js
* Add language configuration and environment configuration to the .eslintrc.js file:

```javascript
module.exports = {
  extends: [
    'ryansobol/browser',
    'ryansobol/es5',
    'ryansobol/es6',
    'ryansobol/jquery',
    'ryansobol/node',
    'ryansobol/materialize',
    'ryansobol/express',
    'ryansobol/react'
  ],
  parserOptions: {
    sourceType: 'module'
  }
};
```

* Run `eslint` locally and fix any linting errors: ./node_modules/.bin/eslint .
* Additionally, add a script to the `package.json` file:

```javascript
{
  "script": {
    "lint": "eslint ."
  }
}
```

* Then run the npm script and fix any linting errors: `npm run lint`

## Knex:

### Knex Setup:

* `mkdir <dir_name>`
* `cd <dir_name>`
* `npm init -y` - initialize it in npm which will create a package.json file that saves dependencies and scripts
* `npm install --save pg` - PostgreSQL - So knex can talk to it
* `npm install --save knex` - ORM
* `touch knexfile.js ` (or knex init)
* `touch index.js`

* In the knexfile.js file, write and save the following code (environment configuration).
  * This code exports the development env to have a client of PostgreSQL

```javascript
'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/bookshelf_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/bookshelf_test'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
```

* In the knex.js file, write and save the following code.
  * Knex must output a function and the configuration is required as an argument. The knex module is itself a function which takes a configuration object for Knex, accepting a few parameters. The client parameter is required and determines which client adapter will be used with the library.

```javascript
'use strict';

const env = 'development';
const config = require('./knexfile.js')[env];   <— *
const knex = require('knex')(config);

Module.exports = knex;
```
* _Troubleshooting tip:_ sqlite3 is the default knex db

### Knex Migrate Flow:
* `npm run knex migrate:currentVersion `: to run script commands listed in package.json
* `npm run knex migrate:make <file_name>` : This creates a migration folder in the root directory of your project (unless it already existed) and adds a tracks migration file into the folder.npm
  * Do this in root as general good practice; But it doesn’t really matter
npm run knex migrate:latest: The migrate:latest command is used to run the migration file on the database.
* `npm run knex migrate:rollback`: The migrate:rollback command migrates the database backward by running the down function exported by your migration file.

### Knex Seed Flow:
* `npm run knex seed:make <file_name>` - command to create a new seed file. Files are created in the dir specified in the knexfile.js
* `npm run knex seed:run <file_name>` - command to run the seed script and seed the db
* `npm run knex seed:run` - runs all seed scripts; seed files are run in alphabetical order


## Heroku:
### Heroku Deployment:
1. Create production environment on heroku - `heroku apps:create <project_name>` (Where username is your github username)
2. Inspect the properties of the production database - `heroku apps:info`
3. Specify the exact version of Node.js on the production environment: In package.json:

 ```javascript
     "engines": {
          "node": "DEV_VERSION"
     }
  ```

4. `heroku addons:create heroku-postgresql` -  Create a PostgreSQL database for the production environment
5. `heroku pg:info `- Inspect the properties of the production database
6. Specify the connection URL to the production database server by adding the following property to the knexfile.js file:

  ```javascript
      production: {
       client: ‘pg’,
        connection: process.env.DATABASE_URL
      }
  ```

7. Automatically migrate the production database after on deployment by adding the following property to the package.json file:

  ```javascript
      "scripts": {
         "knex”:”knex"
         "heroku-postbuild": "knex migrate:latest"
       }
  ```

8. Install foreman - `npm install —save-dev foreman  `
9. Create a Procfile - start the server on the production env - `echo ‘web: node server.js’ > Procfile` (A Procfile is a mechanism for declaring what commands are run by your application's dynos on the Heroku platform. It follows the process model. You can use a Procfile to declare various process types, such as multiple types of workers, a singleton process like a clock, or a consumer of the Twitter streaming API.) ← if you do not have a space between the : and node it will break everything
10. Easily test foreman from the dev env by adding an nf script to package.json <--not needed with brunch

  ```javascript
    "scripts": {
         "knex”:”knex"
         "heroku-postbuild”: “knex migrate:latest",
         "nf”: “nf start",
         "nodemon”: “nodemon server.js"
     }
  ```

11. Generate secret key to be used to sign session information on the prod. env.
  * `bash -c ‘heroku config:set JWT_SECRET=$(openssl rand -hex 64)'`
12. Deploy to Heroku: `git push heroku master`
13. Inspect the production Environment : `heroku apps:info`
14. Inspect the production Database: `heroku pg:info`
15. Seed the production database: `heroku run npm run knex seed:run`
16. Inspect the production Database again: `heroku pg:info`
17. Login to the production Database and verify: `heroku pg:psql`

__With Brunch:__
1. In `package.json`, make sure you move all of the following dependencies from devDependencies to dependencies:
  * babel-brunch
  * Babel-preset-es2015
    * Brunch version in package.json 2.8.2
  * clean-css-brunch
  * javascript-brunch
  * postcss-brunch
  * uglify-js-brunch
2. `"heroku-postbuild": "brunch build --production; knex migrate:latest"`, -  Update in package.json the script heroku-postbuild. This builds the public folder on deployment (no auto reloading is needed as that's for development).
Also, ensure that `$http` is included in every service

`Heroku addons: create heroku-postgresql --version 9.5
`
[Heroku Dev Center - Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)

[Heroku Dev Center - Heroku Postgres](https://devcenter.heroku.com/categories/heroku-postgres)

## Git:
1. `git add .`
2. `git c -m ‘msg'`
3. `git checkout -b <branch_name>` - make a new branch
4. `git checkout master` - go back to the master branch
5. `git merge <branch_name> `- merges the branch to whichever branch you have checked out
6. `git branch -d <branch_name>` - deletes the branch_name
7. `git st - git status`; fish shortcut
8. `git checkout -b <branch_name> <commit sha>` - revert to branch even if deleted

## Brunch:
[Brunch](http://brunch.io/) - ultra-fast HTML5 build tool. Brunch is a builder, not a generic task runner. It is a specialized tool focusing on the production of a small number of deployment-ready files from a large number of heterogenous development files or trees.

### Ken’s Angular config:
1. `npm install -g brunch`
2. `cd path/to/app`
3. `brunch new  <project_name>  --skeleton kmcgrady/with-angular`
4. Build app/app.js file, which will initialize the application
  * `import angular from 'angular'`
  * `angular.module('todoApp', []);`

### Ryan’s React Config
* `brunch new <project_name> --skeleton ryansobol/with-react` ()-s flag short for skeleton)


What is the difference between req.params, req.query, req.body?
