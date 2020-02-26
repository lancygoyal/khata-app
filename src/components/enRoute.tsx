import React from "react";
import { Route, Redirect } from "react-router-dom";
import Layout from "./layout";

export default ({
  component: Component,
  type = "private",
  auth = false,
  to = "/",
  ...rest
}) => (
  <Route
    {...rest}
    render={(props: any) => {
      if (type === "private")
        return auth ? (
          <Layout {...props}>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: to,
              state: { from: props.location }
            }}
          />
        );
      if (type === "user") return <Component {...props} />;
    }}
  />
);
