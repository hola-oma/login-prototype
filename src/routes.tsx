import React from "react";
import Login from "./Login";
import Join from "./Join";
import PostsView from './PostsView';
import { RouteComponentProps, withRouter, Switch } from "react-router";
import { Route } from "react-router-dom";
import ProtectedRouteHoc from "ProtectedRouteHoc";

interface IRoutes {
  isLoggedIn: boolean;
}

class Routes extends React.Component<RouteComponentProps & IRoutes, {}> {   // {} is a better alternative to "any"
  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Switch>
          <Route exact path="/" component={Join} />
          <Route exact path="/join" component={Join} />
          <Route exact path="/login" component={Login} />
          <ProtectedRouteHoc exact path="/posts" isLoggedIn={isLoggedIn} public={false} RouteComponent={PostsView} />
        </Switch>
      </div>
    );
  }
}

/*  Old way 
const protectedRoutes = [
  { name: "posts", path: "/posts", exact: true, public: false, main: (props: any) => <PostsView {...props} /> }
];
*/

export default withRouter(Routes);

