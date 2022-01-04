## Intorduction

We are very excited to show you our final Telerik Academy project!

As part of our volunteering work to improve the quality of education in the country, we, **Nadya & Mayya** were tasked to implement an application that can be used to effectively create and carry out online quizzes.

The application has two main parts:

- **Teacher’s dashboard** – here, teachers can create categories, quizzes, and check students' performance
- **Student's dashboard** – students solve quizzes and view leaderboard.

## Tech stack

- **Backend Packages**: express, passport, passport-jwt, bcrypt, cors, body-parser, helmet, mariadb, moment, eslint, jsdoc, dotenv, nodemon;

- **Frontend packages**: React, axios, jwt-decode, react-dom, react-router-dom, redux, react-redux, redux-thunk, moment, sweetalert, material-ui, eslint;

# Directory organisation

```bash
├── client
│   ├── public
│   │   ├── index.html
│   │   └── quiz-app-favicon.png
│   ├── src
│   │   ├── auth
│   │   │   └── **/*.js
│   │   ├── avatars
│   │   │   ├── students
│   │   │   │   └── **/*.png
│   │   │   └── teachers
│   │   │       └── **/*.png
│   │   ├── common
│   │   │   └── **/*.js
│   │   ├── components
│   │   │   ├── common
│   │   │   │   ├── Alerts
│   │   │   │   │   └── **/*.js
│   │   │   │   ├── CustomTable
│   │   │   │   │   └── **/*.js
│   │   │   │   ├── ErrorPage
│   │   │   │   │   ├── **/*.png
│   │   │   │   │   ├── **/*.css
│   │   │   │   │   └── **/*.js
│   │   │   │   └── NavBar
│   │   │   │       ├── **/*.css
│   │   │   │       └── **/*.js
│   │   │   ├── private
│   │   │   │   ├── Categories
│   │   │   │   │   ├── **/*.css
│   │   │   │   │   └── **/*.js
│   │   │   │   ├── CreateQuiz
│   │   │   │   │   ├── **/*.css
│   │   │   │   │   └── **/*.js
│   │   │   │   ├── LeaderBoard
│   │   │   │   │   ├── **/*.css
│   │   │   │   │   └── **/*.js
│   │   │   │   ├── LeaderBoardPage
│   │   │   │   │   ├── **/*.css
│   │   │   │   │   └── **/*.js
│   │   │   │   ├── Quizzes
│   │   │   │   │   ├── **/*.css
│   │   │   │   │   └── **/*.js
│   │   │   │   ├── SolvePage
│   │   │   │   │   ├── **/*.css
│   │   │   │   │   └── **/*.js
│   │   │   │   ├── StudentDashboard
│   │   │   │   │   ├── **/*.css
│   │   │   │   │   └── **/*.js
│   │   │   │   ├── StudentHistory
│   │   │   │   │   ├── **/*.css
│   │   │   │   │   └── **/*.js
│   │   │   │   ├── StudentHistoryPage
│   │   │   │   │   ├── **/*.css
│   │   │   │   │   └── **/*.js
│   │   │   │   ├── TeacherDashboard
│   │   │   │   │   ├── **/*.css
│   │   │   │   │   └── **/*.js
│   │   │   │   ├── ViewQuiz
│   │   │   │   │   ├── **/*.css
│   │   │   │   │   └── **/*.js
│   │   │   │   └───── PrivateApp.js
│   │   │   └── public
│   │   │       ├── LandingPage
│   │   │       │   ├── **/*.css
│   │   │       │   └── **/*.js
│   │   │       ├── LoginForm
│   │   │       │   ├── **/*.css
│   │   │       │   └── **/*.js
│   │   │       ├── RegisterForm
│   │   │       │   ├── **/*.css
│   │   │       │   └── **/*.js
│   │   │       └───── PublicApp.js
│   │   ├── containers
│   │   │   ├── private
│   │   │   │   ├── Categories
│   │   │   │   │   ├── **/*.css
│   │   │   │   │   └── **/*.js
│   │   │   │   ├── CreateQuiz
│   │   │   │   │   ├── **/*.css
│   │   │   │   │   └── **/*.js
│   │   │   │   ├── LeaderBoard
│   │   │   │   │   ├── **/*.css
│   │   │   │   │   └── **/*.js
│   │   │   │   ├── LeaderBoardPage
│   │   │   │   │   ├── **/*.css
│   │   │   │   │   └── **/*.js
│   │   │   │   ├── Quizzes
│   │   │   │   │   ├── **/*.css
│   │   │   │   │   └── **/*.js
│   │   │   │   ├── SolvePage
│   │   │   │   │   ├── **/*.css
│   │   │   │   │   └── **/*.js
│   │   │   │   ├── StudentHistory
│   │   │   │   │   ├── **/*.css
│   │   │   │   │   └── **/*.js
│   │   │   │   ├── StudentHistoryPage
│   │   │   │   │   ├── **/*.css
│   │   │   │   │   └── **/*.js
│   │   │   │   ├── TeacherDashboard
│   │   │   │   │   ├── **/*.css
│   │   │   │   │   └── **/*.js
│   │   │   │   └── ViewQuiz
│   │   │   │       ├── **/*.css
│   │   │   │       └── **/*.js
│   │   │   └── public/Authentication
│   │   │           └── **/*.js
│   │   ├── custom-hooks
│   │   │   └── **/*.js
│   │   ├── redux-store
│   │   │   ├──actions
│   │   │   │   └── **/*.js
│   │   │   └──reducers
│   │   │       └── **/*.js
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── axios-config.js
│   │   ├── index.css
│   │   └── index.js
│   ├── .dockerignore
│   ├── .eslintrc.js
│   ├── .gitignore
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
├── database
│   └── schema.sql
├── server
│    ├── auth
│    │   └── **/*.js
│    ├── controllers
│    │   └── **/*.js
│    ├── data
│    │   ├── blacklist-data
│    │   │   └── **/*.js
│    │   └── quiz-app-data
│    │       └── **/*.js
│    ├── middlewares
│    │   └── **/*.js
│    ├── services
│    │   └── **/*.js
│    ├── validators
│    │   └── **/*.schema.js
│    ├── app.js
│    ├── config.js
│    ├── .dockerignore
│    ├── .eslintrc.js
│    ├── .gitignore
│    ├── Dockerfile
│    ├── package.json
│    ├── package-lock.json
│    └── README.md
├── docker-compose.yml
└── README.md
```

1. **client**: contains our React app
   - _public_: the place with the index.html and our favicon;
   - _src_: the directory where the frontend magic happens:
     - auth: a directory with authorization context configuration;
     - avatars: contains all of our users avatars;
     - common: a directory with helpers- wrappers for token management,search parameter management and alerts from sweetalert;
     - components: contains our presentational components:
       - common: common presentational components;
       - private: private presentational components;
       - public: public presentational components;
     - containers: logic components:
       - public: private logic components;
       - private: public logic components;
     - custom-hooks: a directory with some custom hooks
     - redux-store: a directory with redux set-ups:
       - actions: redux actions;
       - reducers: redux reducers;
2. **database**: contains SQL script, which you can import;
3. **server**: contains our Express API:
   - _auth_: a directory with configuration for the authentication;
   - _controllers_: our Express routers;
   - _data_: the place where are all of our SQL queries;
     - blacklist-data: SQL queries related with the blacklist database;
     - quiz-app-data: SQL queries related with the quiz-app database;
   - _middlewares_: a directory with some custom middlewares;
   - _services_: the place where our business logic is;
   - _validators_: all schema validations for the requests with a body;

## Running Guide

### Via Docker

All you need is [Docker Compose](https://docs.docker.com/compose/). [Click here](https://docs.docker.com/compose/install/#install-compose) to get it.

#### Step I:

To start the application, open a terminal in the root directory and run these commands:

- Build the services

```sh
docker-compose build
```

- Allow Docker to start and run the entire application

```sh
docker-compose up -d
```

#### Step II:

To interact with the application, there are a few options:

- Open `http://localhost:3000/` in a browser to see the web application.
- Open Postman and send a request. See the available endpoints in the readme file in the _server_ directory.
- Open `http://localhost:8080/` to open [phpMyAdmin](https://www.phpmyadmin.net/). It allows you to handle the administration of MySQL over the Web. The username and the password are pointed in the docker-compose.yml file.

#### Step III:

To tear down the application, open a terminal in the root directory and run this command:

```sh
docker-compose down --volumes
```

### Manually

Follow these steps to run our application:

#### Step I:

**Import the SQL files**, the schemas and the file with dummy data.

#### Step II:

To access this application you should have a **environment file** (.env) file on the root level in the server directory! The structure should be:

- **SERVER_PORT**: _server listening port_, if no other chosen, the default would be `5000`;
- **DB_HOST**: the DB host, if no other chosen, the default would be `localhost`;
- **DB_USER**: the _username_ of your MariaDB account;
- **DB_PASSWORD**: the _password_ of your MariaDB account;
- **SECRET_KEY**: a string or buffer containing the secret (symmetric) or PEM-encoded public key (asymmetric) for verifying the token's signature;

#### Step III:

Open the Terminal in the server folder and type the following commands:

```
npm i
npm run start
```

**Now our Express server is listening for requests.**

If you want to see our jsdoc documentation, you can run the command to generate the out folder:

```
npm run docs
```

#### Step IV:

Open the Terminal in the client folder and type the following commands:

```
npm i
npm start
```

This will run our React application.
