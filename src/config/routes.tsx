import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import Hello from "../pages/hello";
import EnRoute from "../components/enRoute";
import SignIn from "../pages/signin";
import SignUp from "../pages/signup";

const Routes = [
  { path: "/", component: SignUp, type: "user" },
  { path: "/signin", component: SignIn, type: "user" },
  { path: "/hello", component: Hello, type: "user" }
];

const Routers = ({ user }) => (
  <Router>
    {Routes.map((route, index) => (
      <EnRoute key={index} exact {...route} auth={false} />
    ))}
  </Router>
);

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Routers);
