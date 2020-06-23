import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Linking } from "expo";
import global from "../global";

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
    height: 60,
    // justifyContent: "center"
  },

  aboutText: {
    color: "gray",
    fontWeight: "normal",
    fontSize: 16,
    margin: 16,
    textAlign: "center",
  },
  leftIcon: {
    marginTop: 10,
  },
});
