import React, { useState, useEffect } from 'react';
import firebase, { User } from 'firebase/app';
import 'firebase/firestore'; // if database type is firestore, import this 

import { roles } from './enums/enums';

import { RouteComponentProps } from 'react-router-dom'; // give us 'history' object



interface ISettingsView extends RouteComponentProps<any>{
  user: User;
}

const SettingsView: React.FC<ISettingsView> = ({ history, user }) => {

  //const [username, setUsername] = useState(user ? user.displayName : '');
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("");

  const [ loading, setLoading ] = useState(true);

  /* UPDATE ACCOUNT SETTINGS */
  const handleForm = (e: any) => {
    e.preventDefault();

    const db = firebase.firestore();
    var user = firebase.auth().currentUser;
    
    db.collection("users").doc(user?.uid).set({
      displayName: displayName,
      role: role
    }).then(() => {
      console.log("Update successful");
      if (history) history.push('/posts')
    }).catch(err => {
      console.log("Error updating user");
    });
  }

  useEffect(() => {
    const db = firebase.firestore();
    db.collection("users").doc(user?.uid).get()
      .then((doc:any) => {
        setDisplayName(doc.data().displayName);
        setRole(doc.data().role);
        console.log(doc.data());
      });
  }, []); // fires on page load if this is empty [] 

  return (
    <div>
      <h2>Account Settings</h2>
      <form onSubmit={e => handleForm(e)}>
        Display Name
        <input
          value={displayName? displayName : ''}
          onChange={e => setDisplayName(e.target.value)}
          name="displayName"
          type="displayName"
          placeholder="displayName"
        />
        <br/>

        <h2>Role [be careful changing this!]</h2>
        <label>
        <input
          type="radio"
          name="accountType"
          id="receiver"
          value="receiver"
          checked={role == roles.receiver}
          onChange={e => setRole(roles.receiver)}
          />
          <b>Receive</b> posts
        </label>
        <br/>
        <label>
          <input
            type="radio"
            name="accountType"
            id="poster"
            value="poster"
            checked={role == roles.poster}
            onChange={e => setRole(roles.poster)}
            />
           <b>Make</b> posts
        </label>

      <br />
      <button type="submit">Update settings</button>
      
      </form>
    </div>
  )
}

export default SettingsView;