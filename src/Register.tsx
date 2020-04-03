import React, { useState, useContext } from "react";
import { AuthContext } from "./App";
import firebase from 'firebase/app';
import 'firebase/auth'; // for authentication

import { RouteComponentProps } from 'react-router-dom'; // give us 'history' object

interface IRegister extends RouteComponentProps<any> {
  // empty for now 
  // got help here: https://stackoverflow.com/questions/49342390/typescript-how-to-add-type-check-for-history-object-in-react 
}

const Register: React.FC<IRegister> = ({ history }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");

  const Auth = useContext(AuthContext);

  /* EMAIL/PASS ACCOUNT CREATION */
  const handleForm = (e: any) => {
    e.preventDefault();
    firebase.auth()
            .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
              firebase.auth()
              .createUserWithEmailAndPassword(email, password)
              .then(res => {
                console.log(res)
                if (history) history.push('/posts')
                if (res.user) Auth?.setLoggedIn(true);
              })
            .catch(e => {
              setErrors(e.message);
            });
          })
  };

  /* JOIN USING GOOGLE ACCOUNT */
  const handleGoogleJoin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
            .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
              firebase
              .auth()
              .signInWithPopup(provider)
              .then(result => {
                console.log(result)
                if (history) history.push('/reports')
                Auth?.setLoggedIn(true)
              })
              .catch(e => setErrors(e.message))
            })
  }

  return (
    <div>
      <h1>Create an account</h1>
      <p>Enter your email address and a password.</p>
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
        <button type="submit">Sign up</button>

        <hr />
        <h2>Other sign-up methods</h2>
        {/* Google sign in */}
        <button onClick={() => handleGoogleJoin()} className="googleBtn" type="button">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="logo"
          />
          Join With Google
        </button>

        <span className="error">{error}</span>
      </form>
    </div>
  );
};

export default Register;