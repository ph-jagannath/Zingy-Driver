import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Image,
  AsyncStorage,
} from "react-native";
import axios from "axios";
import background from "../assets/background.png";
import logo from "../assets/logo.png";
import { Button, Input, Overlay } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import global from "../global";

export default class Forgot extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      number: "", //chnage
      buttonLoading: false,
    };
  }

  // Validate
  handleValidate = () => {
    if (this.state.number.trim() == "") {
      Alert.alert("Alert", "Please enter phone number");
    } else {
      this.handleLogin();
    }
  };

  handleLogin = () => {
    this.setState({
      buttonLoading: true,
    });
    // this.props.navigation.navigate("UserApp");
    axios({
      method: "post",
      url: "forget_password_washer",
      data: {
        email: this.state.number,
      },
      headers: { "Content-Type": "application/json" },
      validateStatus: (status) => {
        return true; // I'm always returning true, you may want to do it depending on the status received
      },
    }).then(
      function (response) {
        console.log(response.data);
        this.setState({ buttonLoading: false });
        if (response.data.response.status) {
          Alert.alert(
            "Alert",
            response.data.response.message,
            [
              {
                text: "Ok",
                onPress: () => this.props.navigation.goBack(),
              },
            ],
            { cancelable: false }
          );
        } else {
          Alert.alert("Alert", response.data.response.message);
        }
      }.bind(this)
    );
  };

  render() {
    return (
      // image background
      <ImageBackground
        source={background}
        style={styles.bgContainer}
        imageStyle={{ resizeMode: "stretch" }}
      >
        <KeyboardAwareScrollView
          // style={styles.container}
          enableOnAndroid
          extraScrollHeight={130}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.bgContainer}
        >
          {/* logo container */}
          <View style={styles.logo}>
            <Image
              source={logo}
              style={{
                width: 240,
                height: 200,
                resizeMode: "contain",
                alignSelf: "center",
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            {/* email container */}

            <View style={styles.fromContainer}>
              <Input
                label="Email"
                labelStyle={styles.labelText}
                textContentType="emailAddress"
                inputContainerStyle={styles.inputFiedContainer}
                keyboardType="email-address"
                inputStyle={styles.inputText}
                onChangeText={(v) => this.setState({ number: v })}
                value={this.state.number}
              />
            </View>
          </View>
          {/* login Button */}
          <View>
            <Button
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.buttonStyle}
              loading={this.state.buttonLoading}
              title="LOG IN"
              titleStyle={styles.buttonTitle}
              TouchableComponent={TouchableOpacity}
              onPress={this.handleValidate}
            />
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    width: null,
  },
  logo: {
    marginTop: 100,
  },
  inputContainer: {
    // marginBottom: 50,
    marginHorizontal: 50,
  },
  fromContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginBottom: 30,
  },
  labelText: {
    fontWeight: "bold",
    fontSize: 16,
    // marginVertical: 10,
    color: "#000",
    marginLeft: -11,
  },

  inputText: {
    color: "#000",
    fontSize: 16,
  },
  inputFiedContainer: {
    borderBottomWidth: 0,
  },
  buttonContainer: {
    alignSelf: "center",
    // marginHorizontal: 70
  },
  buttonStyle: {
    backgroundColor: global.COLOR.PRIMARY,
    height: 40,
    width: 270,
    // marginTop: 50
  },
  buttonTitle: {
    color: "#fff",
    // fontWeight: "bold",
    fontSize: 18,
  },
  forgot_pass: {
    marginTop: -15,
    marginBottom: 30,
    fontSize: 16,
    // marginTop: hp(2),
    // marginHorizontal: wp(5),
    alignSelf: "flex-end",
    color: global.COLOR.PRIMARY,
  },
});
