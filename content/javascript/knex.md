---
title: "Knex.js -  A Query Builder"
cover: " 	https://s3.amazonaws.com/rsstdd-portfolio/knex.png"
date: "02/02/2018"
category: "knex"
tags:
- back end
- knex
- database
---

# Knex.js

---

[__Knex.js__](http://Knex.jsjs.org/#Installation-node) is a third party JavaScript library that builds SQL commands and sends them to a relational database like PostgreSQL. In brief, Knex.js is an object-relational mapping tool between JavaScript code and SQL commands. According to their documentation, Knex.js features traditional node-style callbacks as well as a promise interface that supplies a cleaner interface for asynchronous flow control, a stream interface, full-featured query and schema builders, transaction support (with savepoints), connection pooling, and standardized responses between different query clients and dialects [(__Knex.js__)](http://Knex.jsjs.org/#Installation-node).

---

## Terms:
* [__Promise__](../promises.md) - an object that’s used for asynchronous operations. It is an object that hasn’t completed yet but will in the future. Mainly, the benefit of a promise is that it offers a separation of success handling from error handling
    * __async__ - non-blocking when it’s done
* __SQL Injection Attack__ - Occurs when user input is not filtered to escape characters and is then passed into an SQL conned, which results in the potential for a malicious user to manipulate the database commands.
    * To protect against SQL injection attacks, escape the special characters that a user, may input into a web app. In SQL a single-quote ( ‘ ) character is escaped with another single-quote
    * Knex.js does this for you automatically; therefore, it is marginally safer than SQL
* __Query Builder__ - the API used to build and send SQL queries (`SELECT`, `INSERT`, `UPDATE`, `DELETE`).
* __Connection Pooling__ - A database connection pool is a [cache](http://www.webopedia.com/TERM/C/cache.html) of database connections that are maintained so that the connections can be reused when future requests to the database are required. Connection pooling is an attempt to reduce the amount of time it takes to establish a database connection because connection to the database is a resource intensive operation. Essentially, pooling keeps connections active so that when another connection is requested, there is already an existing, active connection to handle the request.
  * Below is a diagram that explains connection pooling. This diagram is from   [(paxdiablo)](http://stackoverflow.com/questions/4041114/what-is-database-pooling).
  ```
    +---------+
    |         |
    | Clients |
  +---------+ |
  |         |-+        +------+          +----------+
  | Clients | ===#===> | Open | =======> | RealOpen |
  |         |    |     +------+          +----------+
  +---------+    |         ^
                 |         |
                 |     /------\
                 |     | Pool |
                 |     \------/
                 |         ^
                 |         |
                 |     +-------+         +-----------+
                 #===> | Close | ======> | RealClose |
                       +-------+         +-----------+
  ```

## Connecting Knex.js to a SQL Server

When the `require(‘Knex.js’)(config)` function is called, Knex.js opens two connections to a server. This allows Knex.js to send multiple SQL commands to a server concurrently. When `Knex.js.destroy()` => is called, Knex.js closes the connections. If the connections are not closed, the program will run indefinitely.
* Knex.js can open up to 10 connections
* Does Knex handle Connection Pooling?
Yes, knex.js handles connection pooling by using the generic pool library](https://github.com/coopernurse/node-pool). The connection pool has a default setting of  `2` and a max of `10` for the `MySQL` and `PG` libraries, but it uses a single connection for `sqlite3` because of problems with using many connections on a single file. Developers can configure the pool size by passing «a pool option as one of the keys in the initialize block. If you ever need to explicitly remove the connection pool, you may use `knex.destroy([callback])`. You can use `knex.destroy` by passing a callback or by chaining as a promise, not both.  
* Example of Config:
```JavaScript
		const knex = require('knex')({
			client: 'mysql',
			connection: {
				host : '127.0.0.1',
				user : 'your_database_user',
				password : 'your_database_password',
				database : 'myapp_test'
			},
			pool: { min: 0, max: 7 }
			});
```

## Looking into Knex.js
* One can build Node.js web applications that can `create`, `read`, `update`, and `destroy` the tables and rows of a RDBS like PostgresQL.
* In addition, Knex.js offers protection against SQL injection attacks.
* `CRUD`
    * `select()`
    * `insert()`
    * `update()`
    * `del()`
* Knex.js is a __Query Builder__ - the API used to build and send SQL queries (`SELECT`, `INSERT`, `UPDATE`, `DELETE`).
    * `SELECT` -  creates a `SELECT` command. It accepts an optional list of column names as string arguments and adds them to the `SELECT` clause of a query. When no arguments are specified, it adds a `*` to the SELECT clause. The `select()` method returns a promise. __When the promise is resolved__, the `.then()` method’s callback is triggered and given an array of objects for the matching rows in a table.
    * `WHERE` - Several Knex.js methods exist in adding a dynamic `WEHRE` clauses to a query. The first is the `where()` method.
        * The `where()` method accepts two arguments and one optional argument: 1.) a column name as a string and 2.) a value to match against
        ```javascript
        .where('id', 6)
        ```
        > Note: supplying `where()` with an undefined value will throw an error.

        * To add `AND` clauses to a query, chain `where()` methods.
        * The `where()` method also accepts three arguments:
            * column name as string
            * operator as a string
            * value to operate against
            ```javascript
            .where('score', '>=', 9)
            ```
        * The `where()` method can also accepts a single argument:
            * An object with key-value pairs
                * keys translate column names and the values translate to their respective comparison values.
                * if an object with multiple key-value pairs is given, the `where()` method adds multiple `AND` clauses to the query
            ```javascript
            .where({ year_in_service: '1942', country_of_origin: 'United States' })
            ```
        * The `orWhere()` method works the same as the `where()` method, except it adds an `OR` clause to the query, grouping its arguments in parenthesis
        ```javascript
        .orWhere('operators', 'Great Britain')
        ```
      *  In Addition Knex.js supports the following `WHERE` clause methods:
          * `whereNot()`
          * `whereIn()`
          * `whereNotIn()`
          * `whereNull()`
          * `whereNotNull()`
          * `whereExists()`
          * `whereNotExists()`
          * `whereBetween()`
          * `whereNotBetween()`
          * `whereRaw()`
    * `orderBy` - adds an `ORDER BY` clause to the query
        * The `orderBy` method has two arguments:
            * a column name
            * a direction
          ```javascript
          .orderBy('year_in_service', 'DESC')
          ```
    * The `limit()` method adds a `LIMIT` clause to the query.
      * This method takes a single number argument, which is the limit value:
        ```javascript
          .limit(10)
        ```
---

## CRUD
* `POST`
    * `insert()`
        * creates an `INSERT` command.
        * accepts an object of key-value pairs to be inserted into a row in the table
        * `insert()` returns a promise. When the promise is resolved, the `.then()` method’s callback is triggered and given an object that contains the number of rows inserted.
        * `insert()` accepts a list of string column names as a second argument, which indicates what columns of the newly inserted row to pass into the `.then()` method’s callback.
            * usually `*` is used to pass along all the columns of the row
            * any column value (id, col, value, etc) ( for this example)
* `UPDATE`
    * `update()` creates an `UPDATE` command.
      * The `update()` method either accepts an object of key-value pairs that update a row in a table or it accepts a list of string column names as a second argument. The list informs Knex.js which columns of the updated row to pass into the `.then()` method's callback. Like the other methods, an `*` is uded to denote all columns of the row.
      * This method returns a promise. When the promise is resolved, the `.then()` method’s callback is triggered and given a single value representing the number of rows updated.
* `DELETE`
    *  Knex.js uses the `del()` method because `delete` is a JavaScript reserved word. This method does not accept any arguments. And like most other Knex.js methods, it returns a promise. When the promise resolves, the `.then()` method's callback is triggered and given a single value representing the number of rows deleted.

---

### `DELETE` clause:
```javascript

  let aircraft;

  knex('aircraft')
    .del()
    .where('name', 'Piper J-3')    
    .then((result) => {
      console.log(result);
      knex.destroy();      
    })
    .catch((err) =>{
      console.error(err);
      knex.destroy();
      process.exit(1);
    });
```

### `SELECT` clause:
```javascript
  'use strict';
  const env = 'development';
  const config = require('./Knex.jsfile.js')[env];
  const Knex.js = require('Knex.js')(config);

  knex('favorites')
    .select('*')
    .innerJoin('airplanes', 'airplanes.id', 'favorites.airplane_id')
    .where('favorites.user_id', userId)
    .where('aircraft.id', aircraftId)
    .first()
    .then((row) => {
      if (!row) {
        return res.send(false);
      }

      res.send(true);
    })
    .catch((err) => {
      next(err);
    });
```

### `WHERE` clause:
```javascript
'use strict';

  const env = 'development';
  const config = require('./Knex.jsfile.js')[env];
  const Knex.js = require('Knex.js')(config);

  Knex.js('movies')
    .select('id', 'name', 'description', 'img_url', 'engines')
    .where('airplane_id', aircraftId)
    .where('user_id', userId)
    .first()
    .then((result) => {
      console.log(result);
      Knex.js.destroy();
    })
    .catch((err) => {
      console.error(err);
      Knex.js.destroy();
      process.exit(1);
    });
```

## Other Common Knex.js SQL Commands:

### OFFSET clause
* `offset()`

### JOIN clause
* `innerJoin()`

### DISTINCT clause
* `distinct()`

### Aggregate methods
* `count()`
* `max()`
* `min()`
* `sum()`
* `avg()`

### Helper methods
* `increment()`
* `decrement()`
* `pluck()`
* `first()`
* `raw()`

---

## Workflow to set up new DB and init:
```bash
dropdb example_db_dev
createdb example_db_dev
```

Then, setup a new Node.js project by running the following shell commands:

```bash
mkdir new_dir && cd new_dir
npm init -y
npm install --save pg
npm install --save Knex.js
touch Knexfile.js
touch index.js
```

## Knex.js setup workflow
In the Knexfile.js file, write and save the following code:

```javascript
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/example_db_dev'
  }
};
```

In the index.js file, write and save the following code.
    * Knex.js must output a function and the configuration is required as an argument.

The Knex.js module is itself a function which takes a configuration object for Knex.js, accepting a few parameters. The client parameter is required and determines which client adapter will be used with the library.

```javascript
'use strict';

const env = 'development';
const config = require('./Knex.jsfile.js')[env];  // <— *
const Knex.js = require('Knex.js')(config);

const sql = Knex.js('movies').toString();

console.log(sql);

Knex.js.destroy(); //<— the program will not terminate unless the Knex.js.destroy( ) fn is called
```
---

# Knex Config, Migrations, and Seeds

## Terms:
* __batches__ - Any group of migration files that were executed before you rolled back
    * `npm run knex <table_name> migration:latest`

## KNEX MIGRATION (create/destroy tables)
* brew services list - see if a service is running
* psql -l - display all databases
* npm install —save knex: save knex locally to the npm project

## How do you configure a knex project?
```javascript
     'use strict';
     module.exports = {
       development: { // <— when we’re working with the development env, use this setting (also the default)  
         client: 'pg', // <— package tells Knex.js which db we are working with (PostgreSQL).
         connection: 'postgres://localhost/trackify_dev'
       }
     };
```
* When you install a Node.js module that includes an executable, the executable file is stored in `./node_modules/.bin`
* `./node_modules/.bin/knex migrate:currentVersion` - shows the current migration status
* To run an executable node module: the module is stored in `./node_modules/.bin`. Check the current migration status by running: `./node_modules/.bin/knex migrate:currentVersion`
* npm allows us to add command shortcuts in our `package.json` file inside a scripts object
```javascript
    "scripts": {
     "knex": "./node_modules/.bin/knex"
    },
```
    * And we can shorten this to:
``` javascript
    "scripts": {
      "knex": "knex"
    },
```
  * We run script commands listed in our `package.json` by typing npm run followed by the name we gave the command.
        * `npm run knex migrate:currentVersion`
* `npm run knex migrate:currentVersion`: to run script commands listed in package.json
* `npm run knex migrate:make <file_name> `: This automatically creates a migration folder in the root directory of your project (unless it already existed) and adds a tracks migration file into the folder.
    * la to see all files and directories
    * Do this in root as general good practice
* `npm run knex migrate:latest`: The migrate:latest command is used to run the migration file on the database.
    * `migrate:currentVersion` <— runs the `.up` function
    * `npm run knex migrate:latest`: The `migrate:latest` command is used to run the migration file on the database.
* `psql trackify_dev -c '\d knex_migrations’`:  Look at the columns of the knex_migrations table.
    * -c will allow you to send commands to the repl
* `psql trackify_dev -c 'SELECT * FROM knex_migrations;’` : to look at the rows in the knex_migrations table.
*  `npm run knex migrate:rollback`: The `migrate:rollback` command migrates the database backward by running the down function exported by your migration file.
    * rollback runs the `.down()` method
        * You can do things in the `.down()` function other than drop the table.
    * The `migrate:rollback` command migrates the database backward by running the down function exported by your migration file.
* p`sql trackify_dev -c '\d knex_migrations_lock’`: Add migration locking so multiple services cannot try to run migrations at same time. This added a new lock table. If migrations are locked and migrations are run by another service it results in an error. Two things cannot be updating a db simultaneously.
* `npm run knex migrate:make users`: Use the migrate:make command to create the new file.

## Why is the Knex Migration System Useful?
* consistent way to automate the management of db tables across all environments (dev, test, production)
* describing a change in a db from before to after
    * specify the changes that you are making to the structure of the tables (cols)
* Migration files consistently produce the same tables on an empty db
* Mistakes that are caught early allows a developer to drop the affected tables, rolling the db back to a known good state
    * useful for correcting bugs in a table’s structure

## How do you use Knex to migrate a PostgreSQL db?

```javascript
'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('tracks', (table) => {
    table.increments();
    table.string('title').notNullable().defaultTo('');
    table.string('artist').notNullable().defaultTo('');
    table.iteger('likes').notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('tracks');
};
```

A knex migration will take all new migration files, group them in a batch and then apply them. A rollback will rollback all of the files in a batch.
    * Example:
        * Create Migration File 1 then Create Migration File 2. Then run `knex migrate:latest` Two migrations will run, and one batch created. If you call `knex migrate:rollback`, the two migrations will be rolled back, but only one batch.
        * To help illustrate this, here is an example:
```
    ┌──────────────----───────┐
    │ Create Migration File 1 │
    │ Create Migration File 2 │
    └────────────----─────────┘
                │
                V
    ┌─────────────────────────-----─────────┐
    │ knex migrate:latest                   │
    │ Two migrations run, one batch created │
    └───────────────────────-----───────────┘
                │
                V
    ┌───────────────────────────----------------────-─────┐
    │ knex migrate:rollback                               │
    │ Two migrations rolled back, one batch rolled back   │
    └────────────────────────-----------------────────────┘
```

    * vs
        * Create Migration File 1 One migration run, one batch created. knex migrate:latest Create Migration File 2 One migrations run, one batch created. knex migrate:rollback One migrations rolled back, one batch rolled back. knex migrate:rollback One migrations rolled back, one batch rolled back.

## Knex.js Seed System (create/destroy rows)
* `npm run knex seed:make 1_tracks` : command to use knex to seed a PostgreSQL database
* `npm run knex seed:run` : command used to execute seed files and seed a PostgreSQL db
  * Notice that seed files only export a single function that removes all rows from the table and then inserts the specified rows.

__Knex.js Seed System:__

The knex.js seed system allows developers to automate the initialization of table rows in JS.
    * The heart of the seed system are __seed files__. Unlike the knex.js migration system, the seed files do not run in batches; They all run every time you run the knex.js seed command.
* Why is the Seed System Useful?
    * Most web applications start with an initial set of table rows. It is useful to be able to automatically seed a db with that set.
    *  Every time you rollback your database, one or more tables are dropped and all rows are removed.
    * It is helpful to be able to run migration and seed files and be up to speed with the rest of the team.
    * Seed files only export a single function that removes all rows from the table and then inserts the specified rows.

    ```javascript
        'use strict';
        exports.seed = function(knex, _Promise) {
         return knex('airplanes').del( ) // <—First it deletes all of the data
           .then(() => {
             return knex('airplanes').insert([{ // <— Usually want to insert an arr of obj
               id: 1,
               name: 'Piper J-3',
               description: 'The Piper J-3 Cub is a single-engine two-seat light touring aircraft and military trainer and liaison aircraft produced by the US-American manufacturer Piper Aircraft Corporation. The US Army variants were initially designated O-59 and later L-4 Grasshopper, US Navy designation of the J-3 was NE-1. The Piper J-3 Cub is a development of the Taylor J-2 Cub. 5703 of the total 19828 built J-3 were military aircraft.',
               year_in_service: 1938,
               country_of_origin: 'United States',
               operators: 'United States, Brazil',
               max_speed: 92,
               max_range: 250,
               ceiling: 12000,
               engines: '1 piston 65hp Contenental A-65',
               img_url: 'https://airandspace.si.edu/sites/default/files/styles/slideshow_sm/public/images/collection-objects/record-images/A19771128000cp10.JPG?itok=26px07OX',
               created_at: new Date('2016-06-26 14:26:16 UTC'),
               updated_at: new Date('2016-06-26 14:26:16 UTC')
             }, {
               id: 2,
               name: 'Boeing-Stearman Kaydet PT-13 / PT-17 / PT-18 / NS-1 / N2S (Model 75)',
               description: 'The Stearman Model 75 Kaydet is a single-engine two-seat trainer biplane aircraft produced by the US-American manufacturer Stearman Aircraft Company and later by the Boeing Airplane Company. PT-13 / PT-17 / PT-18 were the main-variants used by the USAAC, NS-1 and NS2S for the US Navy. The Stearman 75 Kaydet was used by the US Army Air Corps and the US Navy as a primary/basic trainer aircraft. After WWII many Stearman 75 were used as crop-duster aircraft due to their slow and low-level flight capability.',
               year_in_service: 1934,
               country_of_origin: 'United States',
               operators: 'United States, Brazil, Canada, China, Phillipines',
               max_speed: 124,
               max_range: 505,
               ceiling: 11200,
               engines: '1 Radial 220 hp Lycoming R-680-17',
               img_url: 'http://www.flugzeuginfo.net/acimages/pt13dn_kp.jpg',
               created_at: new Date('2016-06-26 14:26:16 UTC'),
               updated_at: new Date('2016-06-26 14:26:16 UTC')
             }]);
           });
           .then(() => {
             return knex.raw(
               "SELECT setval('airplanes_id_seq', (SELECT MAX(id) FROM airplanes));" // <— This allows us to test. Sets the raw sql to update seq id
             );
           });
        };
    // (Notice that there is no catch. This is because knex creates one for you)
    ```
## Terms:
knex.js
* __Knex Migration System__ - allows developers to automate the management of db tables in JS
* Migration File - a file that moves the db up and down, or forwards and backwards through a set of changes applied to a single table
    * migrating db forward and then migrating the db backwards
    * name starts with a UTC timestamp and ends with a table name
        * order matters - hence the timestamp
    * Designed like this so that the Knex migration system can identify and order the migrations based on when the files where created and what tables they affect.
    * Exports:
        * `up()` - returns instructions to the knex.js migration system on how to migrate the db forward
        * Here is an example of DB creation with SQL:
            ```SQL
             CREATE TABLE tracks (
                   id serial PRIMARY KEY,
                   title varchar(255) NOT NULL DEFAULT '',
                   artist varchar(255) NOT NULL DEFAULT '',
                   likes integer NOT NULL DEFAULT 0,
                   created_at timestamp with time zone NOT NULL DEFAULT now(),
                   updated_at timestamp with time zone NOT NULL DEFAULT now()
                 );
                 table.timestamps(true, true); // <- Sets created and updated at timestamps
              ```
        * Here is an example of a Knex.js Migration:
        ```javascript
          'use strict';

          exports.up = function(knex) {
            return knex.schema.createTable('airplanes', (table) => {
              table.increments();
              table.string('name')
                   .notNullable()
                   .defaultTo('');
              table.text('description')
                   .notNullable()
                   .defaultTo('');
              table.integer('year_in_service')
                   .notNullable();
              table.string('country_of_origin')
                   .notNullable();
              table.text('operators')
                   .notNullable()
                   .defaultTo('');
              table.integer('max_speed')
                   .notNullable();
              table.integer('max_range')
                   .notNullable();
              table.integer('ceiling')
                   .notNullable();
              table.text('engines')
                   .notNullable()
                   .defaultTo('');
              table.text('img_url')
                   .notNullable()
                   .defaultTo('');
              table.timestamps(true, true);
            });
          };

          exports.down = function(knex) {
            return knex.schema.dropTable('airplanes');
          };

        ```
        * `down()` - returns instructions on how to migrate the db backward
* __Migrations:__ Migrations dictate how we define and update the database schema.
* __Knex.js Seed System:__ The knex.js seed system allows developers to automate the initialization of table rows in JavaScript.

---

## Workflow:
1. `mkdir <dir_name>`
2. `cd <dir_name>`
3. `npm init -y`
4. Add .DS_Store, node_modules, and npm-debug.log to a .gitignore file.
    * `echo '.DS_Store' >> .gitignore`
    * `echo 'node_modules' >> .gitignore`
    * `echo 'npm-debug.log' >> .gitignore`
5. Create a database called <dir_name> and confirm that it was created.
    * `createdb <dir_name>`
    * `psql -l`
6. `npm install --save pg knex` - The migration cli is bundled with the Knex.js install. Also, be sure to install the PostgreSQL client.
7. Create a `knexfile.js` file and configure the development environment.
    * `touch knexfile.js`
    ```javascript
        'use strict';

        module.exports = {
          development: {
            client: 'pg',
            connection: 'postgres://localhost/trackify_dev'
          }
        };
    ```
8. Add npm command shortcuts in the `package.json` file inside a scripts object
```javascript
     “scripts”: {
         “knex”: "knex"
     },
```
## Migrate Workflow:
* `npm run knex migrate:currentVersion `: to run script commands listed in package.json
* `npm run knex migrate:make tracks `: This creates a migration folder in the root directory of your project (unless it already existed) and adds a tracks migration file into the folder.
    * la to see all files and directories
    * Do this in root as general good practice
* `npm run knex migrate:latest`: The `migrate:latest` command is used to run the migration file on the database.
*  `npm run knex migrate:rollback`: The `migrate:rollback` command migrates the database backward by running the down function exported by your migration file.
## Seed Workflow:
1. `seed:make <file_name>` - command to create a new seed file
2. `seed:run <file_name>` - command to run the seed script and seed the db


### References:
https://www.postgresql.org/docs/current/static/sql-createindex.html
http://Knex.jsjs.org/#Builder
http://michaelavila.com/Knex.js-querylab/
https://en.wikipedia.org/wiki/SQL_injection
