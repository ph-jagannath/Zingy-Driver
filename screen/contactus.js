import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Alert,
  AsyncStorage,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Input, Divider, Icon } from "react-native-elements";
import axios from "axios";

import { Linking } from "expo";
import global from "../global";

export default class ContactUs extends Component {
  static navigationOptions = {
    title: "Contact Us",
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
      email: "",
      phone: global.USER.mobile,
      comments: "",
      subject: "",
      name: `${global.USER.first_name} ${global.USER.last_name}`,
      buttonloading: false,
    };
  }

  // Validate
  handleValidate = () => {
    if (this.state.name == "") {
      Alert.alert("Alert", "Please enter Name");
    } else if (this.state.email == "") {
      Alert.alert("Alert", "Please enter e-mail address ");
    } else if (this.state.phone == "") {
      Alert.alert("Alert", "Please enter mobile number ");
    } else if (this.state.subject == "") {
      Alert.alert("Alert", "Please enter Subject ");
    } else if (this.state.comments == "") {
      Alert.alert("Alert", "Please enter Message ");
    } else if (this.state.email !== "") {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(this.state.email) === false) {
      } else {
        this.handleContact();
      }
    }
  };

  handleContact = () => {
    this.setState({
      buttonloading: true,
    });
    axios({
      method: "post",
      url: "contactUs",
      data: {
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        subject: this.state.subject,
        comments: this.state.comments,
      },
      headers: { Authorization: "Bearer " + global.AUTHTOKEN },
    }).then(
      async function (response) {
        console.log(response.data);
        this.setState({
          buttonloading: false,
        });
        if (response.data.response.status) {
          // this.props.navigation.navigate("Home");
          Alert.alert(
            "CARNAWASHAPP",
            response.data.response.message,
            [
              {
                text: "Home",
                onPress: () => {
                  this.props.navigation.navigate("home");
                },
              },
            ],
            { cancelable: false }
          );
        } else {
          Alert.alert("CARNAWASHAPP", response.data.response.message);
        }
      }.bind(this)
    );
  };

  render() {
    return (
      // background container
      <ImageBackground
        // source={global.ASSETS.}
        style={styles.bgContainer}
        imageStyle={{ resizeMode: "stretch" }}
      >
        <KeyboardAwareScrollView
          // style={styles.container}
          enableOnAndroid
          extraScrollHeight={130}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <View style={styles.bottomContainer}>
            <View style={styles.formContainer}>
              {/* Name container */}
              <View style={styles.inputContainer}>
                <Input
                  label="Name"
                  labelStyle={styles.labelText}
                  inputContainerStyle={{
                    borderBottomWidth: 0,
                    backgroundColor: "#37A2F0",
                    height: 45,

                    // marginLeft: -40,
                    paddingLeft: 10,
                  }}
                  keyboardType="default"
                  inputStyle={{ color: "#000", fontSize: 16 }}
                  onChangeText={(v) => this.setState({ name: v })}
                  value={this.state.name}
                />
              </View>
              {/* Email container */}
              <View style={styles.inputContainer}>
                <Input
                  label="Email"
                  labelStyle={styles.labelText}
                  inputContainerStyle={{
                    borderBottomWidth: 0,
                    backgroundColor: "#37A2F0",
                    height: 45,

                    // marginLeft: -40,
                    paddingLeft: 10,
                  }}
                  keyboardType="email-address"
                  inputStyle={{ color: "#000", fontSize: 16 }}
                  onChangeText={(v) => this.setState({ email: v })}
                  value={this.state.email}
                />
              </View>
              {/* Phone container */}
              <View style={styles.inputContainer}>
                <Input
                  label="Mobile"
                  labelStyle={styles.labelText}
                  inputContainerStyle={{
                    borderBottomWidth: 0,
                    backgroundColor: "#37A2F0",
                    height: 45,

                    // marginLeft: -40,
                    paddingLeft: 10,
                  }}
                  keyboardType="phone-pad"
                  inputStyle={{ color: "#000", fontSize: 16 }}
                  onChangeText={(v) => this.setState({ phone: v })}
                  value={this.state.phone}
                />
              </View>
              {/* subject container */}
              <View style={styles.inputContainer}>
                <Input
                  label="Subject"
                  labelStyle={styles.labelText}
                  inputContainerStyle={{
                    borderBottomWidth: 0,
                    backgroundColor: "#37A2F0",
                    height: 45,

                    // marginLeft: -40,
                    paddingLeft: 10,
                  }}
                  keyboardType="default"
                  inputStyle={{ color: "#000", fontSize: 16 }}
                  onChangeText={(v) => this.setState({ subject: v })}
                  value={this.state.subject}
                />
              </View>
              {/* subject container */}
              <View style={styles.inputContainer}>
                <Input
                  label="Message"
                  labelStyle={styles.labelText}
                  inputContainerStyle={{
                    borderBottomWidth: 0,
                    backgroundColor: "#37A2F0",
                    height: 90,

                    // marginLeft: -40,
                    paddingLeft: 10,
                  }}
                  multiline
                  numberOfLines={4}
                  keyboardType="default"
                  inputStyle={{ color: "#000", fontSize: 16 }}
                  onChangeText={(v) => this.setState({ comments: v })}
                  value={this.state.comments}
                />
              </View>
            </View>
          </View>
          <View>
            <Button
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.buttonStyle}
              loading={this.state.buttonloading}
              title="SUBMIT"
              titleStyle={styles.buttonTitle}
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
  container: {
    // justifyContent: "space-evenly"
    marginTop: 60,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  welocmeHeader: {
    alignItems: "center",
    // marginTop: global.CONSTANT.STATUSBAR + 10
  },
  heading: {
    alignSelf: "center",
    fontSize: 26,
    // fontFamily: "OpenSans-Bold",
    // marginTop: -8
  },
  bottomText: {
    textAlign: "center",
    // fontFamily: "OpenSans-Light",
    marginHorizontal: 30,
    marginVertical: 10,
  },
  avatarContainer: {
    alignSelf: "center",
    marginTop: 10,
    // marginTop: "-13%"
  },
  userContainer: {
    backgroundColor: "#37A2F0",
    borderWidth: 3,
    height: 40,
    width: 100,
  },
  userText: {
    color: "#000",
    alignSelf: "center",
    marginVertical: 10,
  },
  formContainer: {
    marginHorizontal: 20,
  },
  inputContainer: {
    flexDirection: "row",
    // marginHorizontal: 10,
    // marginRight: 30,
    marginVertical: "1%",
  },
  buttonContainer: {
    width: 150,
    justifyContent: "center",
    // alignContent: "center"
    alignSelf: "center",
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: "#000",
    height: 50,
    width: 200,
    // alignSelf: "center",
    marginTop: 20,
  },
  buttonTitle: {
    color: "#fff",
    // fontFamily: global.FONT.REGULAR,
    fontSize: 20,
    paddingTop: 0,
    paddingBottom: 0,
    // textAlign: "center",
    // marginBottom: 5
    // justifyContent: "center"
  },
  locationIcon: {
    width: 45,
    height: 45,
    marginRight: -15,
    zIndex: 9,
    borderRightWidth: 1,
    borderColor: "gray",
  },
  labelText: {
    // marginHorizontal: "3%",
    // fontFamily: global.FONT.REGULAR,
    fontSize: 18,
    marginBottom: 2,
    marginTop: "2%",
    color: "#000",
    fontWeight: "normal",
  },
  welcomText: {
    textAlign: "center",
    // fontFamily: global.FONT.LIGHT,
    marginVertical: "2%",
    marginHorizontal: 14,
    textTransform: "capitalize",
  },

  bottomContainer: {
    justifyContent: "space-evenly",
  },
  overlay: {
    backgroundColor: "#000",
    marginTop: global.CONSTANT.HEIGHT - 170,
    flex: 1,
    justifyContent: "flex-end",
    borderRadius: 20,
  },
  overlayContainer: {
    backgroundColor: "transparent",
  },
  overlayTitle: {
    alignSelf: "center",
    // fontFamily: global.FONT.BOLD,
    fontSize: 22,
    color: global.COLOR.PRIMARY,
    textTransform: "capitalize",
  },
  distanceContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginHorizontal: 30,
  },
  durationContainer: {
    backgroundColor: global.COLOR.PRIMARY,
    height: 70,
    width: 70,
    borderRadius: 10,
    marginVertical: 20,
  },
  modelIcon: {
    marginVertical: 4,
  },
  overlayText: {
    alignSelf: "center",
    // fontFamily: global.FONT.SEMIBOLD,
    fontSize: 14,
    color: "#000",
  },
  vehicleContainer: {
    flexDirection: "row",
    marginHorizontal: 30,
    marginRight: 45,
    marginVertical: "1%",
    backgroundColor: global.COLOR.PRIMARY,
  },
  picker: {
    height: 45,
    width: null,
    backgroundColor: global.COLOR.PRIMARY,
    marginHorizontal: 27,
  },
  iosPicker: {
    width: 400,
    height: 88,
    backgroundColor: global.COLOR.PRIMARY,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 15,
  },
  pickerItems: {
    height: 88,
    color: "white",
    paddingLeft: -49,
  },
  noteIcon: {
    width: 45,
    height: "95%",
    marginRight: -15,
    zIndex: 9,
    borderRightWidth: 1,
    borderColor: "gray",
  },
  phone_container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  phone_text_container: {
    flexDirection: "row",
    backgroundColor: "#282c34",
    marginTop: 10,
    height: 40,
    width: 160,
    justifyContent: "space-evenly",
    alignItems: "center",
    alignSelf: "center",
  },
  phone_text: {
    color: "#fff",
    fontSize: 20,
    // fontFamily: global.FONT.REGULAR,
  },
  divider: {
    height: 1,
    width: 38,
    backgroundColor: "gray",
    alignSelf: "center",
    marginTop: 10,
    marginHorizontal: 10,
  },
  dividerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  orText: {
    alignSelf: "center",
    fontSize: 18,
    // fontFamily: "OpenSans-Light",
    marginTop: 10,
  },
});
