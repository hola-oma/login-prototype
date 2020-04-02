import React, { useState } from 'react';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import routes from "./routes.js";
import Header from "./Header";
import './App.css';

import * as firebase from 'firebase/app';
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

interface IAuthContext {
  isLoggedIn: boolean;
  setLoggedIn: any;
}

export const AuthContext = React.createContext<IAuthContext | null>(null);

function App() {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    /* https://reactjs.org/docs/context.html */
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, setLoggedIn }}>

    <div className="App">
      <Router>
        <Header />
        Is logged in? {JSON.stringify(isLoggedIn)}
        <Switch>
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
        </Switch>
      </Router>
    </div>
    </AuthContext.Provider>
  );
}

const rootElement = document.getElementById("root");
export default App;
