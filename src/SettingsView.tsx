import React, { useState } from 'react';
import firebase, { User } from 'firebase/app';

import 'firebase/firestore'; // if database type is firestore, import this 

interface ISettingsView {
  user: User;
}

const SettingsView: React.FC<ISettingsView> = ({ user }) => {

  const [username, setUsername] = useState(user ? user.displayName : '');
  const [role, setRole] = useState(""); // use an enum for this? 

  /* UPDATE ACCOUNT SETTINGS */
  const handleForm = (e: any) => {
    e.preventDefault();
    var user = firebase.auth().currentUser;

    user?.updateProfile({
      displayName: username
    }).then(function() {
      console.log("Update successful")
    }).catch(e => {
      console.log("Failed to update username");
      //setErrors(e.message);
    });
  }

  /* GET EXISTING ACCOUNT SETTINGS */
      // get this user's record from the user's collection in the firestore database
    const db = firebase.firestore();
    db.collection("users").doc(user?.user?.uid).get({
      displayName: 'Grandpa',
      role: role
    }).then(() => {
      console.log("Set role [" + role + "] for user with ID " + user?.user?.uid);
      Auth?.setLoggedIn(true);
      if (history) history.push('/posts');
    });

  return (
    <div>
      <h2>Account Settings</h2>
      Display Name
      <form onSubmit={e => handleForm(e)}>
        <input
          value={username? username : ''}
          onChange={e => setUsername(e.target.value)}
          name="username"
          type="username"
          placeholder="username"
        />

      <br />
      <button type="submit">Update settings</button>
      
      </form>
    </div>
  )
}

export default SettingsView;