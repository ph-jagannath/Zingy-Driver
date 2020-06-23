import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { Icon } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Linking } from "expo";
import global from "../global";
import { RadioButton } from "react-native-paper";
import i18n from "i18n-js";

export default class setting extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Settings",
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
    this.getLanguage();
    this.state = {
      language: "en",
    };
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
          this.setState({
            language: "en",
          });
          i18n.locale = "en";
        }).catch((err) => {
          console.log("error is: " + err);
        });
        // }}
      } else {
        i18n.locale = language;

        this.setState({ language });
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  }

  render() {
    return (
      <View style={styles.bgContainer}>
        {/* privacy policy */}
        <TouchableOpacity
          style={styles.aboutContainer}
          onPress={() => this.props.navigation.navigate("privacyPolicy")}
        >
          <View>
            <Text style={styles.aboutText}>Privacy Policies</Text>
          </View>
          <Icon
            name="chevron-right"
            iconStyle={styles.leftIcon}
            color="gray"
            type="material-community"
            size={35}
          />
        </TouchableOpacity>
        {/* terms and condition */}
        <TouchableOpacity
          style={styles.aboutContainer}
          onPress={() => this.props.navigation.navigate("termsConditions")}
        >
          <View>
            <Text style={styles.aboutText}>Terms and conditions</Text>
          </View>
          <Icon
            name="chevron-right"
            iconStyle={styles.leftIcon}
            color="gray"
            type="material-community"
            size={35}
          />
        </TouchableOpacity>
        {/* about us */}
        <TouchableOpacity
          style={styles.aboutContainer}
          onPress={() => this.props.navigation.navigate("aboutUs")}
        >
          <View>
            <Text style={styles.aboutText}>About us</Text>
          </View>
          <Icon
            name="chevron-right"
            iconStyle={styles.leftIcon}
            color="gray"
            type="material-community"
            size={35}
          />
        </TouchableOpacity>
        {/* suggestions */}
        <TouchableOpacity
          style={styles.aboutContainer}
          onPress={() =>
            Linking.openURL(`mailto: ${global.CONSTANT.SUPPORT_MAIL}`)
          }
        >
          <View>
            <Text style={styles.aboutText}>Suggestions</Text>
          </View>
          <Icon
            name="chevron-right"
            iconStyle={styles.leftIcon}
            color="gray"
            type="material-community"
            size={35}
          />
        </TouchableOpacity>
        {/* FAQs conatiner */}
        <TouchableOpacity
          style={styles.aboutContainer}
          onPress={() => this.props.navigation.navigate("faqs")}
        >
          <View>
            <Text style={styles.aboutText}>FAQs</Text>
          </View>
          <Icon
            name="chevron-right"
            iconStyle={styles.leftIcon}
            color="gray"
            type="material-community"
            size={35}
          />
        </TouchableOpacity>
        {/* help container */}
        <TouchableOpacity
          style={styles.aboutContainer}
          onPress={() => this.props.navigation.navigate("help")}
        >
          <View>
            <Text style={styles.aboutText}>Help</Text>
          </View>
          <Icon
            name="chevron-right"
            iconStyle={styles.leftIcon}
            color="gray"
            type="material-community"
            size={35}
          />
        </TouchableOpacity>
        {/* Report user */}
        <TouchableOpacity
          style={styles.aboutContainer}
          onPress={() =>
            Linking.openURL(`mailto: ${global.CONSTANT.SUPPORT_MAIL}`)
          }
        >
          <View>
            <Text style={styles.aboutText}>Report user</Text>
          </View>
          <Icon
            name="chevron-right"
            iconStyle={styles.leftIcon}
            color="gray"
            type="material-community"
            size={35}
          />
        </TouchableOpacity>
        {/* contact us */}
        <TouchableOpacity
          style={styles.aboutContainer}
          onPress={() =>
            // Linking.openURL(`mailto: ${global.CONSTANT.SUPPORT_MAIL}`)
            this.props.navigation.navigate("contact")
          }
        >
          <View>
            <Text style={styles.aboutText}>Contact us</Text>
          </View>
          <Icon
            name="chevron-right"
            iconStyle={styles.leftIcon}
            color="gray"
            type="material-community"
            size={35}
          />
        </TouchableOpacity>
        {/* contact us */}
        <TouchableOpacity
          style={styles.aboutContainer}
          // onPress={() =>
          // Linking.openURL(`mailto: ${global.CONSTANT.SUPPORT_MAIL}`)
          // this.props.navigation.navigate("contact")
          // }
        >
          <View>
            <Text style={styles.aboutText}>Change Language</Text>

            <RadioButton.Group
              onValueChange={async (value) => {
                await AsyncStorage.setItem("LANGUAGE", value, (err) => {
                  if (err) {
                    console.log("an error store language async");
                    throw err;
                  }
                  console.log("Language Stored");
                  i18n.locale = value;
                  this.setState({ language: value });
                }).catch((err) => {
                  console.log("error is: " + err);
                });
              }}
              value={this.state.language}
            >
              <View style={{ paddingLeft: 20 }}>
                <View style={styles.radioItem}>
                  <RadioButton color={global.COLOR.PRIMARY} value="en" />
                  <Text style={styles.radioText}>English</Text>
                </View>
                <View style={styles.radioItem}>
                  <RadioButton color={global.COLOR.PRIMARY} value="it" />
                  <Text style={styles.radioText}>Italian</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    width: null,
  },
  aboutContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // margin: 10,
    // marginVertical: 20,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    // height: 60,
    // justifyContent: "center"
  },

  aboutText: {
    color: "gray",
    fontWeight: "normal",
    fontSize: 16,
    margin: 16,
    // textAlign: "center",
  },
  leftIcon: {
    marginTop: 10,
  },
  radioItem: {
    flexDirection: "row",
  },
  radioText: {
    alignSelf: "center",
    fontSize: 16,
  },
});
