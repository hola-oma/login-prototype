import React, { useState } from 'react';
import firebase, { User } from 'firebase/app';

interface ISettingsView {
  user: User;
}

const SettingsView: React.FC<ISettingsView> = ({ user }) => {

  const [username, setUsername] = useState(user ? user.displayName : '');
  const [accountType, setAccountType] = useState(""); // use an enum for this? 

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