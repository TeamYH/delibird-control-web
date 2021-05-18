import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './shared/App';
import Root from './client/Root';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from "./serviceWorker";
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from "react-redux";
import {applyMiddleware, createStore} from 'redux';
import promiseMiddlerware from 'redux-promise';
import reducer from './_reducers';
import reduxThunk from 'redux-thunk';

const createStoreWidthMiddleware = applyMiddleware(
  promiseMiddlerware,
  reduxThunk
)(createStore);

ReactDOM.render(
  <React.StrictMode>
    <Provider
      store={createStoreWidthMiddleware(
        reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.unregister();
// reportWebVitals();