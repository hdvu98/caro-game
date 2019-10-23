import GameContainer from "./containers/Game";
import Login from "./components/SignIn";
import SignUp from "./components/SignUp";
  
  const routes = [
    {
      path: "/",
      exact: true,
      props: {
        title:
          "Game Caro Vietnam",
        description:
          "Game Caro Vietnam"
      },
      component: GameContainer
    },
    {
      path: "/home",
      exact: true,
      props: {
        title:
          "Game Caro Vietnam",
        description:
          "Game Caro Vietnam"
      },
      component: GameContainer
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
  