import { createSwitchNavigator, createAppContainer } from "react-navigation";
import UserNavigator from "./UserNavigator";
import AuthNavigator from "./AuthNavigator";
import authLoading from "../screen/authLoading";
export default createAppContainer(
  createSwitchNavigator(
    {
      UserApp: UserNavigator,
      Auth: AuthNavigator,
      authLoading: authLoading
    },
    {
      initialRouteName: "authLoading"
    }
  )
);
