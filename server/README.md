# SquadTeam45 Server

### Run the app

Both Server and client is started with the same command from the root folder

```bash
git clone https://github.com/IT2810/it2810-webutvikling-h17-prosjekt-4-squadteam-45.git
cd it2810-webutvikling-h17-prosjekt-4-squadteam-45
npm i
npm run dev
```

The api runs on localhost:3000/api/

### Run tests (requires mongodb)

From root folder

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
