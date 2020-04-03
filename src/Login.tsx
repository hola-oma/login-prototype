import React, { useState, useContext } from "react";
import { AuthContext } from "./App";
import firebase from 'firebase/app';
import 'firebase/auth'; // for authentication

import { RouteComponentProps, Link } from 'react-router-dom'; // give us 'history' object 

interface ILogin extends RouteComponentProps<any> {
  // this was different from the tutorial, got typescript help from: 
  // https://stackoverflow.com/questions/49342390/typescript-how-to-add-type-check-for-history-object-in-react
}

const Login: React.FC<ILogin> = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");

  const Auth = useContext(AuthContext);

    /* EMAIL/PASS LOGIN, must exist in database */
  const handleForm = (e: any) => {
    e.preventDefault();
    firebase.auth()
            .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
              firebase.auth()
              .signInWithEmailAndPassword(email, password)
              .then(res => {
                if (res.user) Auth?.setLoggedIn(true);
                if (history) history.push('/posts')
              })
              .catch(e => {
                setErrors(e.message);
              });
            })
  };

  /* LOG IN USING GOOGLE ACCOUNT */
  const handleGoogleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
            .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
              firebase.auth()
                      .signInWithPopup(provider)
                      .then(result => {
                        console.log(result)
                        if (history) history.push('/posts')
                        Auth?.setLoggedIn(true)
                      })
                      .catch(e => setErrors(e.message))
                    })
  }

  return (
    <div>
      <h1>Welcome!</h1>
      <p>Please log in to send a message to your loved one.</p>

      <form onSubmit={e => handleForm(e)}>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="email"
        />
        <input
          onChange={e => setPassword(e.target.value)}
          name="password"
          value={password}
          type="password"
          placeholder="password"
        />
        <br />
        <button type="submit">Log in</button>
        <br />
        <Link to="/register">Register</Link>

        <hr />
        <h2>Other sign-in methods</h2>
        <button className="googleBtn" type="button" onClick={ () => handleGoogleLogin() }>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="logo"
          />
          Log in With Google
        </button>


        <span className="error">{error}</span>
      </form>
    </div>
  );
};

export default Login;