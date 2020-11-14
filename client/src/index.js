import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import LeaderboardReducer from './redux-store/reducers/LeaderboardReducer.js';
import quizesReducer from  './redux-store/reducers/quizesReducer.js';
import categoriesReducer from  './redux-store/reducers/categoriesReducer.js';
import App from './App';

const rootReducer = combineReducers({
  leaderboard: LeaderboardReducer,
  quizes: quizesReducer,
  categories: categoriesReducer,
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
