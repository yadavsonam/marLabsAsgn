import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import theStore from './store';
import App from './App';

ReactDOM.render(
    <Provider store={theStore}>
        <App />
    </Provider>,
    document.getElementById('root')
);
