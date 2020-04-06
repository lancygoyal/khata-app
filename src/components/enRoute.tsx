import React from "react";
import { Route, Redirect } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import Layout from "./layout";

export default ({
  component: Component,
  type = "private",
  to = "/signin",
  store,
  ...rest
}) => (
    <Route
      {...rest}
      render={(props: any) => {
        if (type === "private")
          return store.getState().app.isLogin ? (
            <Layout store={store} {...props}>
              <Component {...props} />
            </Layout>
          ) : (
              <Redirect
                to={{
                  pathname: to,
                  state: { from: props.location },
                }}
              />
            );
        else if (type === "signin")
          return !isEmpty(store.getState().users) ? (
            <Component {...props} />
          ) : (
              <Redirect
                to={{
                  pathname: to,
                  state: { from: props.location },
                }}
              />
            );
        else if (type === "signup")
          return isEmpty(store.getState().users) ? (
            <Component {...props} />
          ) : (
              <Redirect
                to={{
                  pathname: to,
                  state: { from: props.location },
                }}
              />
            );
      }}
    />
  );
