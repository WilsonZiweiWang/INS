import React from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css';
import App from './App';
import Firebase, { FirebaseContext } from './Firebase';

import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';//used to pass the store to the 'App'/root
import rootReducer from './reducers/RootReducer';

const store = createStore(rootReducer);

//syntax for provider to surround the root component
ReactDOM.render(<FirebaseContext.Provider value={new Firebase()}>
    <Provider store={store}><App /></Provider>
</FirebaseContext.Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
