import React, { useState, useContext, ReactPropTypes } from "react";
import { AuthContext } from "./App";
import firebase from 'firebase';
import { RouteComponentProps } from 'react-router-dom'; // give us 'history' object

interface IJoin extends RouteComponentProps<any> {
  // empty for now 
  // got help here: https://stackoverflow.com/questions/49342390/typescript-how-to-add-type-check-for-history-object-in-react 
}

const Join: React.FC<IJoin> = ({ history }) => {

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
  const handleGoogleLogin = () => {
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
      <h1>Join</h1>
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
        <hr />
        <button className="googleBtn" type="button">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="logo"
          />
          Join With Google
        </button>

        <button type="submit">Sign up</button>

        <span>{error}</span>
      </form>
    </div>
  );
};

export default Join;