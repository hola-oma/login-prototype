import React from 'react';

const PostsView: React.FC = ({...props}) => {
  return (
    <>
    <div>If account type is poster, offer the option to make a post</div>
    <div>If account type is receiver, view the latest post(s)</div>
    <div>If no account type is set, prompt the user to pick a type and link with another user</div>
    </>
  )
}

export default PostsView;