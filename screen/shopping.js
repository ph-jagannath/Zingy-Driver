import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Icon } from "react-native-elements";
import axios from "axios";
import { WebView } from "react-native-webview";
import global from "../global";

export default class shopping extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Products",
    headerStyle: {
      backgroundColor: global.COLOR.PRIMARY,
    },
    headerLeft: (
      <Icon
        name="menu"
        color="#fff"
        type="material-community"
        size={35}
        iconStyle={{ marginHorizontal: 10 }}
        Component={TouchableOpacity}
        onPress={() => navigation.openDrawer()}
      />
    ),
    headerRight: (
      <Icon
        name="bell-outline"
        color="#fff"
        type="material-community"
        size={35}
        iconStyle={{ marginHorizontal: 10 }}
        Component={TouchableOpacity}
        onPress={() => navigation.navigate("notifications")}
      />
    ),

    headerTintColor: "#fff",

    headerTitleStyle: {
      fontWeight: "bold",
    },
  });
  constructor(props) {
    super(props);

    this.state = {
      buttonLoading: false,
      data: "",
    };
  }

  render() {
    return (
      <WebView
        originWhitelist={["*"]}
        scalesPageToFit={true}
        style={{ flex: 1 }}
        cacheEnabled={false}
        cacheMode="LOAD_NO_CACHE"
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator
            color="black"
            size="large"
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          />
        )}
        showsVerticalScrollIndicator={false}
        source={{
          uri: `https://dacwash.com/webservices/service_provider_login/${global.USER.user_id}`,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    width: null,
  },
});
