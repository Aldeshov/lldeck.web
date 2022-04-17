import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import {defaultStore} from './stores';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import theme from "./configs/Theme";
import {ThemeProvider} from "@mui/material";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Provider store={defaultStore}>
                <ThemeProvider theme={theme}>
                    <App/>
                </ThemeProvider>
            </Provider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
