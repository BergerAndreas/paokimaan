[![MongoDB](https://img.shields.io/badge/MongoDB-3.6-brightgreen.svg)](https://www.mongodb.com/)
[![NPM](https://img.shields.io/badge/NPM-%5E5.3.0-brightgreen.svg)](https://www.npmjs.com/)
[![Fuck It](https://img.shields.io/badge/Fuck_it-Ship_it-green.svg)](http://s2.quickmeme.com/img/ae/ae0e0d5aaeabb36be15d3b36c1482afca92bc499c66bd8838d35e272ed938ad6.jpg)
[![Prrrr](https://img.shields.io/badge/Prrrr-Prrrr-blue.svg)](https://forum.wordreference.com/threads/prrrr.2322271/)

# SquadTeam45 

prrrrr

### Run the app with easymode

This will use a database from mlab instead of local database where you have to use mongodb and pokescraper, making life much easier for you <3  
```bash
git clone https://github.com/IT2810/it2810-webutvikling-h17-prosjekt-4-squadteam-45.git
cd it2810-webutvikling-h17-prosjekt-4-squadteam-45
npm i
npm run easy
```


### Run the app

To run the app, clone the repository to a desired location, navigate to the root, install requirements, and run the app as such:
```bash
git clone https://github.com/IT2810/it2810-webutvikling-h17-prosjekt-4-squadteam-45.git
cd it2810-webutvikling-h17-prosjekt-4-squadteam-45
npm i
npm run dev
```

The app runs on localhost:4200

The api runs on localhost:3000/api

### Run backend tests

To run the tests, navigate to the root folder, and run the following:
```bash
npm run testbe
```

Resoults in (as of 22.11.17):

```bash

  Pokemon
    Backend tests for Pokemen
Connected to MongoDB on localhost:27017
      ✓ should get all the pokemen
      ✓ should get ten pokemen
      ✓ should get pokemon count
      ✓ should get a pokemon by its id
water
      ✓ should get all pokemon by type

  Users
    Backend tests for users
      ✓ should get all the users
      ✓ should get users count
      ✓ should create new user
      ✓ should get a user by its id
      ✓ should update a user by its id
      ✓ should delete a user by its id


  11 passing (220ms)

--------------------|----------|----------|----------|----------|----------------|
File                |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
--------------------|----------|----------|----------|----------|----------------|
All files           |     85.3 |       45 |    83.78 |    89.96 |                |
 server             |    88.68 |       50 |       50 |    88.68 |                |
  app.ts            |    79.31 |       50 |       25 |    79.31 |... 37,41,42,48 |
  routes.ts         |      100 |      100 |      100 |      100 |                |
 server/controllers |    75.27 |       50 |    82.14 |    85.71 |                |
  base.ts           |    72.22 |    43.75 |    84.62 |    83.87 | 27,30,38,39,40 |
  pokemon.ts        |    88.57 |    56.52 |      100 |      100 |... 32,33,42,59 |
  user.ts           |    59.09 |    44.44 |       50 |    64.71 |... 13,14,15,16 |
 server/models      |    61.29 |     12.5 |    33.33 |    66.67 |                |
  pokemon.ts        |      100 |      100 |      100 |      100 |                |
  user.ts           |       52 |     12.5 |    33.33 |    57.14 |... 21,27,28,29 |
 server/test        |      100 |      100 |      100 |      100 |                |
  pokemon.spec.ts   |      100 |      100 |      100 |      100 |                |
  testpokemon.ts    |      100 |      100 |      100 |      100 |                |
  users.spec.ts     |      100 |      100 |      100 |      100 |                |
--------------------|----------|----------|----------|----------|----------------|

```

### Run frontend tests

To run the tests do: 
```bash
ng test --sourcemap=false
```

To check test coverage do:
```bash
ng test --single-run --code-coverage --sourcemap=false
```

This should create a coverage folder inside the client directory 
```bash
cd coverage
```

Then open the `index.html` file. This will result to this picture:


![alt text](http://folk.ntnu.no/kristsbo/frontend_testcoverage.png)


## Specifications for this task:
- [x] The web app
  1. Runs on our virtual machine
  2. Uses node.js
  3. Uses angular
- [x] The server runs on our virtual machine and uses REST
- [x] It is possible to
  1. Read and write to the database
  2. Search
  3. Apply filters
- [x] The interface has
  1. a list based view detailing the result of a search
  2. expandable list elements
- [x] The list can be sorted by multiple values (e.g. id or name)
  1. Users can sort Paokimåns based on id, name, weight, and height, in both ascending and descending order
- [x] The list can be filtered on multiple values
  1. Users can filter Paokimåns based on their names, types, and weight (setting minWeight and maxWeight)
- [x] The list has dynamic loading of data
  1. List renders 10 Paokimåns at a time, as limit is set to 10. Search/Filtering filters based on all Paokimåns, yet still renders 10 per page
- [x] The app has my page functionality
  1. The user can register, and subsequently log in and log out
  2. The "Account" page lists the Paokimåns the user chose to add to their team (i.e. after searching and filtering to find the desired Paokimåns)
- [x] The app has session handling
  1. The app uses tokens for session handling; a user is given a new token upon login
- [x] The app has "fancy" display of data
  1. Pie chart at the "PokeChart" page, displaying amounts of Paokimåns belonging to the specified types
  2. Stats of a Paokimån is displayed in the expanded view of the Paokimån in the form of a bar chart
- [x] The code is tested
  1. Code is tested - As stated above, 'npm run testbe' runs our tests 
- [x] The project is well documented
  1. ✓


### Ikke fuck databasen vår plz takk
