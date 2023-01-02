import React from "react";
import { Redirect } from "react-router-dom";

// lazy load all the views
const Dashboard = React.lazy(() => import("../pages/dashboard/index"));
const StarterPage = React.lazy(() => import("../pages/StarterPage/index"));

// auth
const Login = React.lazy(() => import("../pages/Auth/Login"));
const Logout = React.lazy(() => import("../pages/Auth/Logout"));
const ForgetPassword = React.lazy(() => import("../pages/Auth/ForgetPassword"));
const Register = React.lazy(() => import("../pages/Auth/Register"));
const LockScreen = React.lazy(() => import("../pages/Auth/LockScreen"));
const Twofactor = React.lazy(() => import("../pages/Auth/Twofactor"));
const Log = React.lazy(() => import("../pages/Auth/Log"));

// declare all routes
const authProtectedRoutes = [
  { path: "/pages-starter", component: StarterPage },
  { path: "/dashboard", component: Dashboard },

  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" />,
  },
];

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/twofactor", component: Twofactor },
  { path: "/forget-password", component: ForgetPassword },
  { path: "/register", component: Register },
  // { path: "/lock-screen", component: LockScreen},
  { path: "/log", component: Log},
  { path: "/dashboard/:id", component: Log}

];

const routes = [...authProtectedRoutes, ...publicRoutes];

export { authProtectedRoutes, publicRoutes, routes };
