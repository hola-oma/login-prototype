import React from "react";
import PostsView from "PostsView";

const protectedRoutes = [
  { name: "posts", path: "/posts", exact: true, public: false, main: (props: any) => <PostsView {...props} /> }
];

export default protectedRoutes;