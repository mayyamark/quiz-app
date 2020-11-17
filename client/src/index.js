import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import LeaderboardReducer from './redux-store/reducers/LeaderboardReducer.js';
import createQuizReducer from  './redux-store/reducers/createQuizReducer.js';
import StudentHistoryReducer from './redux-store/reducers/StudentHistoryReducer.js';
import CategoriesReducer from './redux-store/reducers/CategoriesReducer';
import App from './App';
import QuizesReducer from './redux-store/reducers/QuizesReducer';

const rootReducer = combineReducers({
  leaderboard: LeaderboardReducer,
  createAQuiz: createQuizReducer,
  studentHistory: StudentHistoryReducer,
  categories: CategoriesReducer,
  quizes: QuizesReducer,
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
