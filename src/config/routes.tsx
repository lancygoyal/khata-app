import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import EnRoute from "../components/enRoute";
import SignIn from "../pages/signin";
import SignUp from "../pages/signup";

const Routes = [
  { path: "/", component: SignIn, type: "signin", to: "/signup" },
  { path: "/signup", component: SignUp, type: "signup" },
  { path: "/signin", component: SignIn, type: "signin", to: "/signup" }
];

const Routers = ({ store }) => (
  <Router>
    {Routes.map((route, index) => (
      <EnRoute key={index} exact {...route} store={store} />
    ))}
  </Router>
);

export default Routers;
