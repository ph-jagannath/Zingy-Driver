import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import MainNavigator from "./navigators/MainNavigator";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import global from "./global";
console.disableYellowBox = true;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.token();
    this.state = {};
  }

  token = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
    global.CONSTANT.DEVICEID = token;
  };
  render() {
    return <MainNavigator />;
  }
}

const styles = StyleSheet.create({});
