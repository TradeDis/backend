# TradeDis Backend

## Quick Start

Get started developing...

You need to create a `.env` file and configure your database at first, then set up the database and start developing / testing.

```shell
# clone repo
git clone https://github.com/TradeDis/backend.git && cd backend

# install deps
yarn install

# run in development mode
yarn dev

# run tests
yarn test

# check types and fix all linter errors
yarn lint
```

---

## Install Dependencies

Install all package dependencies (one time operation)

```shell
yarn install
```

## Run It

#### Setup Envioronment

```shell
cp .env.example .env
```

```shell
vi .env
```

and change the `MONGODB_URI` to `MONGODB_URI=mongodb+srv://tradedis:tradedis2020@cluster0.ieu4n.mongodb.net/development?retryWrites=true&w=majority`

#### Run in _development_ mode:

Runs the application is development mode. Should not be used in production

```shell
yarn dev
```

or debug it

```shell
yarn dev:debug
```

#### Run in _production_ mode:

Compiles the application and starts it in production mode

```shell
yarn compile
yarn start
```

## Test It

Run the Mocha unit tests

```shell
yarn test
```

or debug them

```shell
yarn test:debug
```

Run the tests and output a JUnit-style XML test results file at `./test/test-results.xml`

```shell
yarn test:junit
```

## Try It

Make sure the database is running

- Open you're browser to [http://localhost:3000](http://localhost:3000)
- Invoke the `/examples` endpoint
  ```shell
  curl http://localhost:3000/api/v1/examples
  ```

## Debug It

#### Debug the server:

```
yarn dev:debug
```

#### Debug the Database:

```
https://account.mongodb.com/account/login
email: hello@alan-wu.com
password: tradedis2020
```

#### Debug Tests

```
yarn test:debug
```

#### Debug with VSCode

Use the configurations in `.vscode/launch.json` file

## Lint It

Check types and fix all linter errors

Check code styles

```shell
yarn lint
```

Check type error

```
yarn typecheck
```

---

## Schema

### User

```javascript
{
    user_id: { type: Number, unique: true },
    username: String,
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    address: String,
    avatar: String,
    created_at: Date,
    updated_at: Date,
    reviews: [
      {
        review_id: { type: Number, unique: true },
        date: Date,
        review: String,
        rating: Number,
        created_at: Date,
        updated_at: Date,
        created_by: {
            reviewer_id: Number,
            username: String,
            first_name: String,
            last_name: String,
            avatar: String,
        },
      }
    ],
}

```

---

## Notes

### Moongose

- Sync real database with the model. We need to import and use the Model first in order for moongose to sync the changes.

- Only import the model once in the project otherwise the same changes (ex. ID increment would be created multiple times)

---

## About

This template project was originally generated by [cdimascio/generator-express-no-stress-typescript](https://github.com/cdimascio/generator-express-no-stress-typescript), and added with `mongoose` and several DevOps tools (`Dependabot` and `Azure Pipelines`).

### What you get!

- [Typescript](https://www.typescriptlang.org/) - Typescript is a typed superset of JavaScript that compiles to plain JavaScript
- [Express.js](https://www.expressjs.com) - Fast, unopinionated, minimalist web framework for Node.js
- [Mongoose](https://github.com/motdotla/dotenv) - Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
- [Pino](https://github.com/pinojs/pino) - Extremely fast node.js logger, inspired by Bunyan. It also includes a shell utility to pretty-print its log files
- [dotenv](https://github.com/motdotla/dotenv) - Loads environment variables from .env for nodejs projects
- [Swagger](http://swagger.io/) - is a simple yet powerful representation of your RESTful API.
- [SwaggerUI](http://swagger.io/) - dynamically generate beautiful documentation and sandbox from a Swagger-compliant API
- [express-openapi-validator](https://github.com/cdimascio/express-openapi-validator) - An OpenApi validator for ExpressJS that automatically validates API requests using an OpenAPI 3.x specification

More information [here](https://github.com/cdimascio/generator-express-no-stress-typescript#what-you-get)
