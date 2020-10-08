import { createAppContainer } from "react-navigation";
import Login from "../screen/login";
// import Signup from "../screen/signup";
// import Forgot from "../screen/forgot";

import { createStackNavigator } from "react-navigation-stack";
import Forgot from "../screen/Forgot";

export default createAppContainer(
  createStackNavigator(
    {
      Login: { screen: Login },
      Forgot: { screen: Forgot },
    },
    {
      initialRouteName: "Login",
      headerLayoutPreset: "center",
    }
  )
);
