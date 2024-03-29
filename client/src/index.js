import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import LeaderboardReducer from './redux-store/reducers/LeaderboardReducer.js';
import StudentHistoryReducer from './redux-store/reducers/StudentHistoryReducer.js';
import CategoriesReducer from './redux-store/reducers/CategoriesReducer';
import teacherDashboardReducer from './redux-store/reducers/teacherDashboardReducer';
import App from './App';
import QuizzesReducer from './redux-store/reducers/QuizzesReducer';

const rootReducer = combineReducers({
  leaderboard: LeaderboardReducer,
  studentHistory: StudentHistoryReducer,
  categories: CategoriesReducer,
  teacherDash: teacherDashboardReducer,
  quizzes: QuizzesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
