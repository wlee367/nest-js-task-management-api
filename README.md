## Description

API to manage users and tasks, written using the [Nest.JS](https://github.com/nestjs/nest) framework, utilizing TypeScript, TypeORM, Passport.JS, JWT, PostgresSQL, and Jest for integration testing.

## Why Nest?
NestJS is a framework built on top of Express, and provides an [an out-of-the-box application architecture which allows developers and teams to create highly testable, scalable, loosely coupled, and easily maintainable applications](https://docs.nestjs.com/). 

The architecture NestJS provides out of the box is known as the [Repository Pattern](https://deviq.com/repository-pattern/). Simply put, the repository pattern creates a new Repository implementation for each entity you have in your application, followed by the `service` layer, and the `controller` layer. The `Repository` layer is responsible for dealing strictly with the database operations (such as Create, Read, Update, Delete functionality of your entity). The `Service` layer is responsible for dealing with the business logic of any operation regarding the entity. The `Controller` layer is responsible for handling incoming requests to the server and returning responses to the client. 

Having such layers of abstractions make it easier to unit test the application - as with the repository patter, all your tests will have the entity in question in test in memory - making it the repository's responsibility to make sure operations persist to the database, the service's reponsibility to test business logic, and the controller's responsibility to handle requests and responses between the client and the server. Having this layer of abstraction also allows for more loosely coupled applications, making it easier to scale and maintain. 

## Current endpoints:
- `POST /auth/signup` 
- `POST /auth/signin`
- `GET /tasks`
- `GET /tasks/:id`
- `POST /tasks`
- `PATCH /tasks/:id/status`
- `DELETE /tasks/:id`


## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# run tests in watchmode
$ yarn test:watch
```

## TODO:
1. Deploy application to AWS
2. Connect application to frontend web application (link here)
3. Update this Readme.md once 1 and 2 are done. 
