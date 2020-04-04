import React, { useState, useEffect } from 'react';

import { roles } from './enums/enums';

import { getUserSettings } from "services/user";

const PostsView: React.FC = () => {

  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    // todo: get user posts
    getUserSettings()
      .then((doc:any) => {
        setDisplayName(doc.displayName);
        setRole(doc.role);
      });
  }, []); // fires on page load if this is empty [] 

  return (
    <>
    <h1>Welcome, {displayName}!</h1>
    <h2>Account type: {role}</h2>
    {role === roles.poster && <div>Offer the option to make a post</div>}
    {role === roles.receiver && <div>View the latest post(s) from linked posters</div>}
    <div>If no account is linked, remind the user to link with another user</div>
    </>
  )
}

export default PostsView;