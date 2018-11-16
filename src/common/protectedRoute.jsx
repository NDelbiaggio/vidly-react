import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import auth from "../services/authService";

class ProtectedRoute extends Component {
  render() {
    const { component: Component, render, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          if (!auth.getCurrentUser())
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: {
                    from: this.props.location
                  }
                }}
              />
            );
          return Component ? <Component {...props} /> : render(props);
        }}
      />
    );
  }
}

export default ProtectedRoute;
