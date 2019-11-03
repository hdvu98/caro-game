import Login from "./components/SignIn";
import SignUp from "./components/SignUp";
  
  const routes = [

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
  