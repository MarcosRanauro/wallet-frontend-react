import React from 'react';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/carteira" component={ Wallet } />
    </Switch>
  );
}

export default App;