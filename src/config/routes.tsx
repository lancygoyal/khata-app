import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import EnRoute from "../components/enRoute";
import SignIn from "../pages/signin";
import SignUp from "../pages/signup";
import Home from "../pages/home";

const Routes = [
  { path: "/", component: Home, type: "private" },
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
