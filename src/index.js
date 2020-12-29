import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import firebase from 'firebase';

import './index.css';

import store from "./store";
import App from './App';

firebase.initializeApp({
  apiKey: 'AIzaSyAKTYgjtDgcF2k_1aFZtRCAwz88N3W6PGg',
  authDomain: 'my--note.firebaseapp.com',
  projectId: 'my--note'
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
