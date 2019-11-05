import Login from "./components/SignIn";
import SignUp from "./components/SignUp";
import UpdateProfile from './components/UpdateProfile';
import ResetPassword from './components/ResetPassword';
import LogOutPage from './containers/LogOut';
import UploadAvatar from './containers/UploadAvatar';
import Game from './containers/Game';
import GameOnlineContainer from './containers/GameOnline';
  
  const routes = [
    {
      path: "/game-two-players",
      exact: true,
      props: {
        title:
          "Caro Vietnam 2 players",
        description:
          "Game Caro Vietnam"
      },
      component: GameOnlineContainer
    },
    {
      path: "/game-one-player",
      exact: true,
      props: {
        title:
          "Caro Vietnam 1 player",
        description:
          "Game Caro Vietnam"
      },
      component: Game
    },
    {
      path: "/upload-avatar",
      exact: true,
      props: {
        title:
          "Change Avatar",
        description:
          "Game Caro Vietnam"
      },
      component: UploadAvatar
    },
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
  