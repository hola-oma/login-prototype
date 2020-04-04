import React, { useState, useContext } from "react";
import { AuthContext } from "./App";
import firebase, { auth } from 'firebase/app';
import 'firebase/auth'; // for authentication
import 'firebase/firestore'; // if database type is firestore, import this 
import 'firebase/database'; // for additional user properties, like role 

import { RouteComponentProps } from 'react-router-dom'; // give us 'history' object

enum roles {
  poster = "poster",
  receiver = "receiver"
}

interface IRegister extends RouteComponentProps<any> {
  // empty for now 
  // got help here: https://stackoverflow.com/questions/49342390/typescript-how-to-add-type-check-for-history-object-in-react 
}

const Register: React.FC<IRegister> = ({ history }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");

  const [role, setRole] = useState(roles.receiver); // maybe make this an enum next time 

  const Auth = useContext(AuthContext);

  /* EMAIL/PASS ACCOUNT CREATION */
  const handleForm = (e: any) => {
    e.preventDefault();
    firebase.auth()
            .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then( async () => {
              const user = await auth().createUserWithEmailAndPassword(email, password);
              
              if (user) {
                /*  This was for Realtime Database 
                var ref = firebase.database().ref('users' + user?.user?.uid);              
                ref.set({
                  displayName: 'Grandma',
                  role: role 
                */
                const db = firebase.firestore();
                db.collection("users").doc(user?.user?.uid).set({
                  displayName: 'Grandpa',
                  role: role
                }).then(() => {
                  console.log("Set role [" + role + "] for user with ID " + user?.user?.uid);
                  Auth?.setLoggedIn(true);
                  if (history) history.push('/posts');
                });
              }
            })
            .catch(e => {
              setErrors(e.message);
            });
          }

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
        {/* todo: pass along a desired username at this step */}
        {/* https://stackoverflow.com/questions/39607023/in-firebase-how-do-you-update-the-displayname-field-of-a-user-in-auth */}
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

        <br/>
        <label>
        <input
          type="radio"
          name="accountType"
          id="receiver"
          value="receiver"
          checked={role == roles.receiver}
          onChange={e => setRole(roles.receiver)}
          />
          I want to <b>receive</b> posts
        </label>
        <br/>
        <label>
          <input
            type="radio"
            name="accountType"
            id="poster"
            value="poster"
            onChange={e => setRole(roles.poster)}
            />
          I want to <b>make</b> posts
        </label>
        <br/>
        

        <br /><br />
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