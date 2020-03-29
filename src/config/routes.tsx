import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import EnRoute from "../components/enRoute";
import SignIn from "../pages/signin";
import SignUp from "../pages/signup";
import Daybook from "../pages/daybook";
import Books from "../pages/books";
import Settings from "../pages/settings";

const Routes = [
  { path: "/", component: Daybook, type: "private" },
  { path: "/daybook", component: Daybook, type: "private" },
  { path: "/books", component: Books, type: "private" },
  { path: "/settings", component: Settings, type: "private" },
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
