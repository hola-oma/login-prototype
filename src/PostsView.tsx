import React, { useState, useEffect } from 'react';
import firebase, { User } from 'firebase/app';
import 'firebase/firestore'; // if database type is firestore, import this 

import { roles } from './enums/enums';

interface IPostsView {
  user: User;
}

const PostsView: React.FC<IPostsView> = ({ user, ...props}) => {

  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const db = firebase.firestore();
    db.collection("users").doc(user?.uid).get()
      .then((doc:any) => {
        setDisplayName(doc.data().displayName);
        setRole(doc.data().role);
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