# Quiz App Frontend

## Project description

The frontend part of the Quiz App, where teachers can create categories, quizzes, and check students' performance and students solve quizzes and view leaderboard.

## Tech stack

This is a JavaScript application. The main packages, that are used are:

- ReactJS
- Redux
- Axios
- Material UI
- Sweetalert
- Moment JS

The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Directory Structure

```bash
client
├── public
│   ├── index.html
│   └── quiz-app-favicon.png
├── src
│   ├── auth
│   │   └── **/*.js
│   ├── avatars
│   │   ├── students
│   │   │   └── **/*.png
│   │   └── teachers
│   │       └── **/*.png
│   ├── common
│   │   └── **/*.js
│   ├── components
│   │   ├── common
│   │   │   ├── Alerts
│   │   │   │   └── **/*.js
│   │   │   ├── CustomTable
│   │   │   │   └── **/*.js
│   │   │   ├── ErrorPage
│   │   │   │   ├── **/*.png
│   │   │   │   ├── **/*.css
│   │   │   │   └── **/*.js
│   │   │   └── NavBar
│   │   │       ├── **/*.css
│   │   │       └── **/*.js
│   │   ├── private
│   │   │   ├── Categories
│   │   │   │   ├── **/*.css
│   │   │   │   └── **/*.js
│   │   │   ├── CreateQuiz
│   │   │   │   ├── **/*.css
│   │   │   │   └── **/*.js
│   │   │   ├── LeaderBoard
│   │   │   │   ├── **/*.css
│   │   │   │   └── **/*.js
│   │   │   ├── LeaderBoardPage
│   │   │   │   ├── **/*.css
│   │   │   │   └── **/*.js
│   │   │   ├── Quizzes
│   │   │   │   ├── **/*.css
│   │   │   │   └── **/*.js
│   │   │   ├── SolvePage
│   │   │   │   ├── **/*.css
│   │   │   │   └── **/*.js
│   │   │   ├── StudentDashboard
│   │   │   │   ├── **/*.css
│   │   │   │   └── **/*.js
│   │   │   ├── StudentHistory
│   │   │   │   ├── **/*.css
│   │   │   │   └── **/*.js
│   │   │   ├── StudentHistoryPage
│   │   │   │   ├── **/*.css
│   │   │   │   └── **/*.js
│   │   │   ├── TeacherDashboard
│   │   │   │   ├── **/*.css
│   │   │   │   └── **/*.js
│   │   │   ├── ViewQuiz
│   │   │   │   ├── **/*.css
│   │   │   │   └── **/*.js
│   │   │   └───── PrivateApp.js
│   │   └── public
│   │       ├── LandingPage
│   │       │   ├── **/*.css
│   │       │   └── **/*.js
│   │       ├── LoginForm
│   │       │   ├── **/*.css
│   │       │   └── **/*.js
│   │       ├── RegisterForm
│   │       │   ├── **/*.css
│   │       │   └── **/*.js
│   │       └───── PublicApp.js
│   ├── containers
│   │   ├── private
│   │   │   ├── Categories
│   │   │   │   ├── **/*.css
│   │   │   │   └── **/*.js
│   │   │   ├── CreateQuiz
│   │   │   │   ├── **/*.css
│   │   │   │   └── **/*.js
│   │   │   ├── LeaderBoard
│   │   │   │   ├── **/*.css
│   │   │   │   └── **/*.js
│   │   │   ├── LeaderBoardPage
│   │   │   │   ├── **/*.css
│   │   │   │   └── **/*.js
│   │   │   ├── Quizzes
│   │   │   │   ├── **/*.css
│   │   │   │   └── **/*.js
│   │   │   ├── SolvePage
│   │   │   │   ├── **/*.css
│   │   │   │   └── **/*.js
│   │   │   ├── StudentHistory
│   │   │   │   ├── **/*.css
│   │   │   │   └── **/*.js
│   │   │   ├── StudentHistoryPage
│   │   │   │   ├── **/*.css
│   │   │   │   └── **/*.js
│   │   │   ├── TeacherDashboard
│   │   │   │   ├── **/*.css
│   │   │   │   └── **/*.js
│   │   │   └── ViewQuiz
│   │   │       ├── **/*.css
│   │   │       └── **/*.js
│   │   └── public/Authentication
│   │           └── **/*.js
│   ├── custom-hooks
│   │   └── **/*.js
│   ├── redux-store
│   │   ├──actions
│   │   │   └── **/*.js
│   │   └──reducers
│   │       └── **/*.js
│   ├── App.css
│   ├── App.js
│   ├── axios-config.js
│   ├── index.css
│   └── index.js
├── .dockerignore
├── .eslintrc.js
├── .gitignore
├── Dockerfile
├── package.json
└── package-lock.json
```

- **public**: the place with the index.html and our favicon;
- **src**: the directory where the frontend magic happens:
  - **auth**: a directory with authorization context configuration;
  - **avatars**: contains all of our users avatars;
  - **common**: a directory with helpers- wrappers for token management,search parameter management and alerts from sweetalert;
  - **components**: contains our presentational components:
    - **common**: common presentational components;
    - **private**: private presentational components;
    - **public**: public presentational components;
  - **containers**: logic components:
    - **public**: private logic components;
    - **private**: public logic components;
  - **custom-hooks**: a directory with some custom hooks
  - **redux-store**: a directory with redux set-ups:
    - **actions**: redux actions;
    - **reducers**: redux reducers;

## Available scripts

In the project directory, you can run:

### Start

```sh
npm start
```

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.

### Build

```sh
npm run build
```

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. The app is ready to be deployed!

### Eject

```sh
npm run eject
```

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
