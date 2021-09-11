import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './components/private-route/PrivateRoute';
import Header from './components/header/Header';
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage';
// import Database from './pages/Database';
// import Firestore from './pages/Firestore';
// import Storage from './pages/Storage';
// import Messaging from './pages/Messaging';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Switch>

          <PrivateRoute exact path="/" component={Dashboard} />

          <Route path='/auth' component={AuthPage} />
          
          {/* <Route path='/database'>
            <Database />
          </Route>
          <Route path='/firestore'>
            <Firestore />
          </Route>
          <Route path='/storage'>
            <Storage />
          </Route>
          <Route path='/messaging'>
            <Messaging />
          </Route> */}
        </Switch>
      </main>
    </div>
  );
}

export default App;
