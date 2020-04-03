import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './Header';
import Routes from './Routes';

import './App.css';

import firebase from 'firebase/app';
import firebaseConfig from './firebase.config';


firebase.initializeApp(firebaseConfig);

interface IAuthContext {
  isLoggedIn: boolean;
  setLoggedIn: any;
}

export const AuthContext = React.createContext<IAuthContext | null>(null);

function App() {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  /* Look in the browser's stored session to see if user is already logged in.
  Without this, it "forgets" that you logged in every time you change routes and the app isn't usable. */
  function readSession() {
    const user = window.sessionStorage.getItem(`firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
    );
    if (user) setLoggedIn(true);
  }

  return (
    /* https://reactjs.org/docs/context.html */
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, setLoggedIn }}>

    <div className="App">
      <Router>
        <Header isLoggedIn={isLoggedIn} />

        <Routes isLoggedIn={isLoggedIn} />

    {/* 
        <Switch>
          {protectedRoutes.map(route => (
            <ProtectedRouteHoc
              key={route.path}
              isLoggedIn={isLoggedIn}
              path={route.path}
              RouteComponent={route.main}
              exact={route.exact}
              public={route.public}
              />
          ))}
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
          </Switch>  */}
      </Router>
    </div>
    </AuthContext.Provider>
  );
}

const rootElement = document.getElementById("root");
export default App;
