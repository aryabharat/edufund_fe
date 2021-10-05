import Charts from './components/chart'
import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import useToken from './components/App/useToken';
import './App.css';

function App() {
  const { token, setToken } = useToken();
  console.log('aaaaaaa', sessionStorage.getItem('token'), token)
  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Charts token={token} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
