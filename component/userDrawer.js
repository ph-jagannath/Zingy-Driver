import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  AsyncStorage,
  BackHandler,
  Alert,
  ScrollView,
  ImageBackground,
  Share,
} from "react-native";
import { Avatar, Icon, Image } from "react-native-elements";
import profile from "../assets/profile.png";
import global from "../global";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import axios from "axios";
import * as WebBrowser from "expo-web-browser";

const DATA = {
  profile_image: "https://placeimg.com/640/480/any",
  name: "Welcome",
};
export default class userDrawer extends Component {
  constructor(props) {
    super(props);
    this.updateLocation();
    this.startInterval();

    this.state = {};
  }

  startInterval = async () => {
    setInterval(async () => {
      // get current Location
      // if (global.INTERVALS[0] == 1) {
      //   this.fetchNewBookings();
      // }
      if (global.INTERVALS[0] == 1) {
        this.updateLocation();
      }
    }, 10000);
  };

  updateLocation = async () => {
    // get current Location
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied",
      });
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: 6,
    });
    // get location end
    // set location
    let lat, lng;
    lat = location.coords.latitude;
    lng = location.coords.longitude;
    global.DRIVER_LOCATION[0] = lat;
    global.DRIVER_LOCATION[1] = lng;
    axios({
      method: "post",
      url: `update_location_sp`,
      data: {
        user_id: global.USER.user_id,
        latitude: lat,
        language: global.CONSTANT.LANGUAGE,
        longitude: lng,
      },
    }).then(
      function (response) {
        // console.log(response.data);
      }.bind(this)
    );
  };
  //  Logout Functionality
  handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout!",
      [
        {
          text: "Yes",
          onPress: () => {
            AsyncStorage.multiRemove([global.AUTHTOKEN, global.USER_ROLE]);
            this.props.navigation.navigate("Auth");
          },
        },
        {
          text: "Cancel",
          // onPress: () => {
          //   BackHandler.exitApp();
          // }
        },
      ],
      { cancelable: false }
    );
  };

  render() {
    console.log("cuurent screen", this.props.activeItemKey);
    return (
      //  bg container
      <View style={styles.bgContainer}>
        {/* avatar container */}
        <View style={styles.container}>
          <Avatar rounded size={100} source={profile} />
          <View>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text
              style={styles.nameText}
            >{`${global.USER.first_name} ${global.USER.last_name}`}</Text>
          </View>
        </View>
        {/* route container */}
        <View style={styles.routeContainer}>
          {/* 0 home container */}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("home")}
            style={{
              backgroundColor:
                this.props.activeItemKey == "home"
                  ? global.COLOR.PRIMARY
                  : "#fff",
            }}
          >
            <View>
              <Text
                style={[
                  styles.text,
                  {
                    color: this.props.activeItemKey == "home" ? "#fff" : "#000",
                  },
                ]}
              >
                Home
              </Text>
            </View>
          </TouchableOpacity>
          {/* 1 booking container */}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("bookings")}
            style={{
              backgroundColor:
                this.props.activeItemKey == "bookings"
                  ? global.COLOR.PRIMARY
                  : "#fff",
            }}
          >
            <View>
              <Text
                style={[
                  styles.text,
                  {
                    color:
                      this.props.activeItemKey == "bookings" ? "#fff" : "#000",
                  },
                ]}
              >
                Bookings
              </Text>
            </View>
          </TouchableOpacity>
          {/* 2 cancel booking container */}
          {/* <TouchableOpacity
            onPress={() => this.props.navigation.navigate("cancelBooking")}
            style={{
              backgroundColor:
                this.props.activeItemKey == "cancelBooking"
                  ? global.COLOR.PRIMARY
                  : "#fff"
            }}
          >
            <View>
              <Text
                style={[
                  styles.text,
                  {
                    color:
                      this.props.activeItemKey == "cancelBooking"
                        ? "#fff"
                        : "#000"
                  }
                ]}
              >
                Cancel Booking
              </Text>
            </View>
          </TouchableOpacity> */}
          {/* 3 cancel booking container */}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("transactionHistory")}
            style={{
              backgroundColor:
                this.props.activeItemKey == "transactionHistory"
                  ? global.COLOR.PRIMARY
                  : "#fff",
            }}
          >
            <View>
              <Text
                style={[
                  styles.text,
                  {
                    color:
                      this.props.activeItemKey == "transactionHistory"
                        ? "#fff"
                        : "#000",
                  },
                ]}
              >
                Transaction History
              </Text>
            </View>
          </TouchableOpacity>
          {/* 4 soppnig container */}
          <TouchableOpacity
            onPress={
              () => this.props.navigation.navigate("Shopping")
              // () =>
              //   WebBrowser.openBrowserAsync(
              //     `https://carnawashapp.com/webservices/service_provider_login/${global.USER.user_id}`
              //   )
            }
            style={{
              backgroundColor:
                this.props.activeItemKey == "Shopping"
                  ? global.COLOR.PRIMARY
                  : "#fff",
            }}
          >
            <View>
              <Text
                style={[
                  styles.text,
                  {
                    color:
                      this.props.activeItemKey == "Shopping" ? "#fff" : "#000",
                  },
                ]}
              >
                Products
              </Text>
            </View>
          </TouchableOpacity>
          {/* 4 cancel booking container */}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("notifications")}
            style={{
              backgroundColor:
                this.props.activeItemKey == "notifications"
                  ? global.COLOR.PRIMARY
                  : "#fff",
            }}
          >
            <View>
              <Text
                style={[
                  styles.text,
                  {
                    color:
                      this.props.activeItemKey == "notifications"
                        ? "#fff"
                        : "#000",
                  },
                ]}
              >
                Notifications
              </Text>
            </View>
          </TouchableOpacity>
          {/* 5 cancel booking container */}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("setting")}
            style={{
              backgroundColor:
                this.props.activeItemKey == "setting"
                  ? global.COLOR.PRIMARY
                  : "#fff",
            }}
          >
            <View>
              <Text
                style={[
                  styles.text,
                  {
                    color:
                      this.props.activeItemKey == "setting" ? "#fff" : "#000",
                  },
                ]}
              >
                Settings
              </Text>
            </View>
          </TouchableOpacity>
          {/* logout Container */}
          <TouchableOpacity onPress={() => this.handleLogout()}>
            <View>
              <Text
                style={[
                  styles.text,
                  {
                    color: this.state.selected == "7" ? "#fff" : "#000",
                  },
                ]}
              >
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    width: null,
  },
  container: {
    marginTop: global.CONSTANT.STATUSBAR,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "stretch",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  nameText: {
    fontSize: 20,
    marginTop: 10,
    color: "#4d67a3",
    // fontWeight: "bold"
  },
  routeContainer: {
    // marginHorizontal: 5,
    // flex: 0.65,
    marginTop: 40,
  },

  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "200",
    margin: 18,
  },
});
