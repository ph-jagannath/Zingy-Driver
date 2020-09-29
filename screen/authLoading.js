import React, { Component } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  AsyncStorage,
} from "react-native";
import global from "../global";
import i18n from "i18n-js";
import Axios from "axios";

let user_check = "";
export default class authLoading extends Component {
  constructor(props) {
    super(props);
    this.getLanguage();
    this.getToken();
    this.state = { accessToken: "", user: "" };
  }

  async getToken() {
    try {
      let accessToken = await AsyncStorage.getItem(global.AUTHTOKEN).then(
        (value) => {
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
          (value) => {
            if (value) {
              console.log(value);
              global.USER = JSON.parse(value);
              return value;
            }
          }
        );

        Axios({
          method: "post",
          url: `update_notification_setting`,
          data: {
            user_type: "2",
            device_id: global.CONSTANT.DEVICEID,
            user_id: global.USER.user_id,
            reason_for_offline: "",
            device_type: global.CONSTANT.DEVICETYPE,
            not_status: 1,
          },
        }).then(
          function (response) {
            console.log(response.data);
          }.bind(this)
        );
        this.props.navigation.navigate("UserApp");
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  }

  async getLanguage() {
    try {
      let language = await AsyncStorage.getItem("LANGUAGE").then((value) => {
        if (value) {
          console.log(value);
          return value;
        }
      });
      if (!language) {
        await AsyncStorage.setItem("LANGUAGE", "en", (err) => {
          if (err) {
            console.log("an error store language async");
            throw err;
          }
          console.log("Language Stored");

          i18n.locale = "en";
        }).catch((err) => {
          console.log("error is: " + err);
        });
        // }}
      } else {
        i18n.locale = language;
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
    justifyContent: "center",
  },
});
