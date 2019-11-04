import Login from "./components/SignIn";
import SignUp from "./components/SignUp";
import UpdateProfile from './components/UpdateProfile';
import ResetPassword from './components/ResetPassword';
import LogOutPage from './containers/LogOut';
  
  const routes = [
    {
      path: "/logout",
      exact: true,
      props: {
        title:
          "Reset Password",
        description:
          "Game Caro Vietnam"
      },
      component: LogOutPage
    },
    {
      path: "/reset-password",
      exact: true,
      props: {
        title:
          "Reset Password",
        description:
          "Game Caro Vietnam"
      },
      component: ResetPassword
    }
    ,{
      path: "/update-profile",
      exact: true,
      props: {
        title:
          "Profile",
        description:
          "Game Caro Vietnam"
      },
      component: UpdateProfile
    },
    {
      path: "/login",
      exact: true,
      props: {
        title:
          "Login",
        description:
          "Game Caro Vietnam"
      },
      component: Login
    },
    {
      path: "/register",
      exact: true,
      props: {
        title:
          "Create an account",
        description:
          "Game Caro Vietnam"
      },
      component: SignUp
    },
  ];
  
  
  export default routes;
  