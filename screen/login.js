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

export default class login extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      number: "", //chnage
      password: "", //change
      buttonLoading: false,
      // device_id: ""
    };
  }

  async storeToken(responseData) {
    console.log(responseData);
    await AsyncStorage.setItem(global.AUTHTOKEN, responseData, (err) => {
      if (err) {
        console.log("an error store token async");
        throw err;
      }
      console.log("Token Stored");
    }).catch((err) => {
      console.log("error is: " + err);
    });
  }

  getToken = async (data) => {
    try {
      let accessToken = await AsyncStorage.getItem(global.AUTHTOKEN).then(
        (value) => {
          if (value) {
            console.log("abc");
            return value;
          }
        }
      );

      if (!accessToken) {
        console.log("no access token");
      } else {
        global.AUTHTOKEN = accessToken;
        // store user data
        AsyncStorage.setItem(global.USER_DATA, JSON.stringify(data), (err) => {
          if (err) {
            console.log("an error");
            throw err;
          }
          console.log("User Data Stored");
        }).catch((err) => {
          console.log("error is: " + err);
        });

        let userData = await AsyncStorage.getItem(global.USER_DATA).then(
          (value) => {
            if (value) {
              // console.log(value);

              return value;
            }
          }
        );
        global.USER = JSON.parse(userData);
        axios({
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
  };
  // Validate
  handleValidate = () => {
    if (this.state.number == "") {
      Alert.alert(" Alert", "Please enter phone number");
      // } else if (this.state.number.length < 5) {
      //   Alert.alert(" Alert", "Number field should greater than 5 characters");
    } else if (this.state.password == "") {
      Alert.alert("Login Alert", "Please enter password");
    } else if (this.state.password.length < 6) {
      Alert.alert(
        "Login Alert",
        "Password field should not be less than 6 characters"
      );
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
      url: "driver_login",
      data: {
        password: this.state.password,
        device_id: global.CONSTANT.DEVICEID,
        mobile: this.state.number,
        device_type: global.CONSTANT.DEVICETYPE,
        language: global.CONSTANT.LANGUAGE,
      },
      headers: { "Content-Type": "application/json" },
      validateStatus: (status) => {
        return true; // I'm always returning true, you may want to do it depending on the status received
      },
    }).then(
      function (response) {
        console.log(response.data);
        if (response.data.response.status) {
          console.log(response.data.response.data[0]);
          this.storeToken(response.data.response.data[0].user_id);
          this.getToken(response.data.response.data[0]);
        } else {
          this.setState({ buttonLoading: false });
          Alert.alert("Login Status", response.data.response.message);
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
            {/* password container */}

            {/* form container */}
            <View style={styles.fromContainer}>
              <Input
                label="Password"
                labelStyle={styles.labelText}
                secureTextEntry={true}
                textContentType="password"
                inputContainerStyle={styles.inputFiedContainer}
                keyboardType="default"
                inputStyle={styles.inputText}
                onChangeText={(v) => this.setState({ password: v })}
                value={this.state.password}
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
});
