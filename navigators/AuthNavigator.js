import { createAppContainer } from "react-navigation";
import Login from "../screen/login";
// import Signup from "../screen/signup";
// import Forgot from "../screen/forgot";

import { createStackNavigator } from "react-navigation-stack";

export default createAppContainer(
  createStackNavigator(
    {
      Login: { screen: Login }
    },
    {
      initialRouteName: "Login",
      headerLayoutPreset: "center"
    }
  )
);
