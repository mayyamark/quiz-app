# Intorduction
We are very excited to show you our final Telerik Academy project!

As part of our volunteering work to improve the quality of education in the country, we, **Nadya & Mayya** were tasked to implement an application that can be used to effectively create and carry out online quizzes.

The application has two main parts:
  - **Teacher’s dashboard** – here, teachers can create categories, quizzes, and check students' performance
  - **Student's dashboard** – students solve quizzes and view leaderboard.

# Used packages
- **Backend Packages**: express, passport, passport-jwt, bcrypt, cors, body-parser, helmet, mariadb, moment, eslint, jsdoc, dotenv, nodemon;

- **Frontend packages**: React, axios, jwt-decode, react-dom, react-router-dom, redux, react-redux, redux-thunk, moment, sweetalert, material-ui, eslint;

# Directory organisation
Here is a snapshot of the directory organisation:

<img src="https://i.ibb.co/TT75jbT/folder-structure.png">

1. **client**: contains our React app
    - *public*: the place with the index.html and our favicon;
    - *src*: the directory where the frontend magic happens:
      - auth: a directory with authorization context configuration;
      - avatars: contains all of our users avatars;
      - common: a directory with helpers- wrappers for token management,search parameter management and alerts from sweetalert;
      - components: contains our presentational components:
        - common: common presentational components;
        - private: private presentational components;
        - public: public presebtational components;
      - containers: logic components:
        - public: private logic components;
        - private: public logic components;
      - custom-hooks: a directory with some custom hooks
      - redux-store: a directory with redux set-ups:
        - actions: redux actions;
        - reducers: redux reducers;
2. **database**: contains SQL files with the DB schemas and some dummy data, which you can import;
3. **server**: contains our Express API:
    - *auth*: a directory with configuration for the authentication;
    - *controllers*: our Express routers;
    - *data*: the place where are all of our SQL queries;
      - blacklist-data: SQL queries related with the blacklist database;
      - quiz-app-data: SQL queries related with the quiz-app database;
    - *middlewares*: a directory with some custom middlewares;
    - *services*: the place where our business logic is;
    - *validators*: all schema validations for the requests with a body;



# Running Guide
Follow these steps to run our application:
## Step I:
**Import the SQL files**, the schemas and the file with dummy data.

## Step II:
To access this application you should have a **environment file** (.env) file  on the root level in the server directory! The structure should be:

- **PORT**: *server listening port*, if no other chosen, the default would be 5000;
- **DB_USER**: the *username* of your MariaDB account;
- **DB_PASSWORD**: the *password* of your MariaDB account;
- **SECRET_KEY**: a string or buffer containing the secret (symmetric) or PEM-encoded public key (asymmetric) for verifying the token's signature;


## Step III:
Open the Terminal in the server folder and type the following commands:
```
npm i
npm run start:dev
```
**Now our Express server is listening for requests.**

If you want to see our jsdoc documentation, you can run the command to generate the out folder:
```
npm run docs
```

## Step IV:
Open the Terminal in the client folder and type the following commands:
```
npm i
npm start
```
This will run our React application.

## Step V: Enjoy!

