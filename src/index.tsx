import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home';
import SignIn from './components/authentication/SignIn';
import SignUp from './components/authentication/SignUp';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
 <BrowserRouter>
 <Route exact path="/" component={Home} />
  <Route path="/sign_in" component={SignIn} />
  <Route path="/sign_up" component={SignUp} />
 </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
