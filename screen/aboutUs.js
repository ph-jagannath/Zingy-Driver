import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";
import { Icon } from "react-native-elements";
import {
  TouchableWithoutFeedback,
  ScrollView
} from "react-native-gesture-handler";
import global from "../global";

export default class privacyPlicy extends Component {
  static navigationOptions = {
    title: "About Us",
    headerStyle: {
      backgroundColor: global.COLOR.PRIMARY
    },

    headerTintColor: "#fff",

    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
  constructor(props) {
    super(props);
    this.getData();
    this.state = {
      loading: true,
      text: ""
    };
  }

  getData() {
    axios({
      method: "post",
      url: "pages_view",
      data: {
        page_slug: "about_us",
        language: global.CONSTANT.LANGUAGE
      }
    }).then(
      function(response) {
        console.log(response.data);
        this.setState({
          loading: false,
          text: response.data.response.data[0].contents
        });
      }.bind(this)
    );
  }
  render() {
    if (this.state.loading) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color={global.COLOR.PRIMARY} />
        </View>
      );
    }
    return (
      <WebView
        originWhitelist={["*"]}
        scalesPageToFit={true}
        automaticallyAdjustContentInsets={true}
        // contentInset={{ top: 0, left: 0, bottom: 0, right: 0 }}
        style={{ flex: 1 }}
        source={{
          html: `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0 maximum-scale=1.0"></head><body>${this.state.text}</body></html>`
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    width: null
  },
  dummyText: {
    fontSize: 16,
    margin: 10,

    textAlign: "justify"
  }
});
