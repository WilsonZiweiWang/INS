import React from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';//used to pass the store to the 'App'/root
import PostReducer from './reducers/PostReducer';

const store = createStore(PostReducer);


//syntax for provider to surround the root component
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
