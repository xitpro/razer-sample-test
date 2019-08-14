import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import thunk from 'redux-thunk';

import { createStore,applyMiddleware } from "redux";
import { Provider } from "react-redux";

import './assets/css/main.css';
import './assets/css/profile.css';
import './assets/css/tooltip.css';

import './assets/fonts/roboto.css';
import './assets/fonts/razerf5.css';
/* reducer*/
import reducer from "./store/reducer";

let store = createStore(reducer,applyMiddleware(thunk));

const app = <Provider store={store}>
                <App />
            </Provider>;

ReactDOM.render(app, document.getElementById('root'));


serviceWorker.unregister();
