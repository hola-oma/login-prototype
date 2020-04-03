import React from 'react';
import firebase, { User } from 'firebase/app';

interface IPostsView {
  user: User;
}

const PostsView: React.FC<IPostsView> = ({ user, ...props}) => {
  return (
    <>
    <h1>Welcome, {user.displayName}!</h1>
    <div>If account type is poster, offer the option to make a post</div>
    <div>If account type is receiver, view the latest post(s)</div>
    <div>If no account type is set, prompt the user to pick a type and link with another user</div>
    </>
  )
}

export default PostsView;