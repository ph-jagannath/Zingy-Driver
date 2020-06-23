import React, { Component } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  AsyncStorage
} from "react-native";
import global from "../global";

let user_check = "";
export default class authLoading extends Component {
  constructor(props) {
    super(props);
    this.getToken();
    this.state = { accessToken: "", user: "" };
  }

  async getToken() {
    try {
      let accessToken = await AsyncStorage.getItem(global.AUTHTOKEN).then(
        value => {
          if (value) {
            // console.log(value);

            return value;
          }
        }
      );

      if (!accessToken) {
        console.log("no access token");
        this.props.navigation.navigate("Auth");
      } else {
        console.log("logged_in");

        global.API_TOKEN = accessToken;

        let userData = await AsyncStorage.getItem(global.USER_DATA).then(
          value => {
            if (value) {
              console.log(value);
              global.USER = JSON.parse(value);
              return value;
            }
          }
        );

        this.props.navigation.navigate("UserApp");
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={global.COLOR.PRIMARY} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
