import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Backend from "../Backend";
import global from "../global";
export default class chat extends Component {
  static navigationOptions = {
    title: "Live Chat",
    headerStyle: {
      backgroundColor: global.COLOR.PRIMARY,
    },

    headerTintColor: "#fff",

    headerTitleStyle: {
      fontWeight: "bold",
    },
  };
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };
  }

  componentWillMount() {}

  componentDidMount() {
    Backend.loadMessages((message) => {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, message),
        };
      });
    });
  }
  componentWillUnmount() {
    Backend.closeChat();
  }

  render() {
    return (
      <View style={styles.appContainer}>
        <GiftedChat
          messages={this.state.messages}
          onSend={(messages) => Backend.sendMessage(messages)}
          multiline={false}
          user={{
            _id: Backend.getUid(),
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});
