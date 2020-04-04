import React, { useState, useEffect } from 'react';

import { roles } from './enums/enums';

import { RouteComponentProps } from 'react-router-dom'; // give us 'history' object

import { getUserSettings, updateUserSettings } from './services/user';

interface ISettingsView extends RouteComponentProps<any>{
}

const SettingsView: React.FC<ISettingsView> = ({ history }) => {

  //const [username, setUsername] = useState(user ? user.displayName : '');
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("");

  /* UPDATE ACCOUNT SETTINGS */
  const handleForm = (e: any) => {
    e.preventDefault();
    updateUserSettings({displayName, role})
      .then(() => {
        if (history) history.push('/posts')
      }).catch(err => {
        console.log("Error updating user");
      });
  }

  useEffect(() => {
    getUserSettings()
      .then((doc:any) => {
        setDisplayName(doc.displayName);
        setRole(doc.role);
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