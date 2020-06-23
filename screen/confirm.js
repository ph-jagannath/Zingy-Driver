import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Icon, Button } from "react-native-elements";
import MapView from "react-native-maps";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import global from "../global";
import axios from "axios";

export default class confirm extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Order Cost",
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

    headerTintColor: "#fff",

    headerTitleStyle: {
      fontWeight: "bold",
    },
  });
  constructor(props) {
    super(props);
    this.getLocationAsync();
    this.state = {
      data: "",
    };
  }

  getLocationAsync = async () => {
    console.log(this.props.navigation.state.routeName);

    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied",
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      loading: false,
    });
  };

  // complete_wash
  confirmPayment = (v) => {
    this.setState({
      buttonLoading: true,
    });
    // this.props.navigation.navigate("UserApp");
    axios({
      method: "post",
      url: "payment_confirmation",
      data: {
        booking_id: v.booking_id,
        user_id: global.USER.user_id,
        amount: v.booking_amount,
        language: global.CONSTANT.LANGUAGE,
      },
    }).then(
      function (response) {
        console.log(response.data);
        if (response.data.response.status) {
          console.log(response.data.response);
          global.BOOKING_TRACK_STATUS[0] = "2";
          this.props.navigation.navigate("home");

          this.setState({ buttonLoading: false });
        } else {
          this.setState({ buttonLoading: false });
          Alert.alert("Car Wash", response.data.response.message);
        }
      }.bind(this)
    );
  };

  render() {
    let d = this.props.navigation.getParam("new_data", "no-data");

    //   background container
    return (
      <View style={styles.bgContainer}>
        {/* upper container */}
        <View style={styles.upperConatainer}>
          <MapView
            showsUserLocation
            showsMyLocationButton
            style={{ flex: 1 }}
            region={{
              latitude: 26.92207,
              longitude: 75.778885,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
        {/* bottom container */}
        <View style={styles.bottomContainer}>
          <View>
            <View style={styles.flatlist}>
              <View style={styles.mobileContainer}>
                <Icon
                  name="cellphone-android"
                  // iconStyle={styles.menuIcon}
                  color="#000"
                  type="material-community"
                  size={30}
                />
                <Text style={styles.numberText}>{d.mobile}</Text>
              </View>
              <Text style={styles.addressText}>
                Car : {d.vehicle_make} {d.vehicle_model}
              </Text>
              <Text style={styles.addressText}>Color : {d.vehicle_color}</Text>
              <Text style={styles.addressText}>
                Plate Number : {d.vehicle_plate_code} - {d.vehicle_plate_number}
              </Text>
              <View style={styles.packageContainer}>
                <Text style={styles.addressText}>Package :</Text>
                <Text style={styles.addressText}>
                  {d.plan_name} - {d.plan_service}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 0.7 }}>
            <Image source={global.ASSETS.TICK} style={styles.tickImage} />
            <Text style={styles.confirmText}>Please confirm your booking.</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.buttonStyle}
              loading={this.state.buttonLoading}
              title="Confirm Booking"
              titleStyle={styles.buttonTitle}
              TouchableComponent={TouchableOpacity}
              onPress={() => this.confirmPayment(d)}
            />
          </View>
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
  upperConatainer: {
    flex: 0.3,
  },
  bottomContainer: {
    flex: 0.7,
  },
  addressText: {
    // width: 200,
    fontSize: 16,
    marginHorizontal: 10,
    margin: 4,
  },
  packageContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  mobileContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginHorizontal: 4,
  },
  numberText: {
    alignSelf: "center",
    fontSize: 14,
  },
  nameText: {
    // color: global.COLOR.PRIMARY,
    fontSize: 16,
    marginHorizontal: 10,
    marginTop: 4,
  },
  flatlist: {
    marginHorizontal: 10,
    marginTop: 30,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  tickImage: {
    height: 130,
    width: 130,
    resizeMode: "cover",
    alignSelf: "center",
    marginVertical: 10,
  },
  confirmText: {
    fontSize: 18,
    textAlign: "center",
  },
  buttonContainer: {
    alignSelf: "center",
    marginTop: 10,
    flex: 0.3,
    // marginHorizontal: 70
  },
  buttonStyle: {
    backgroundColor: global.COLOR.PRIMARY,
    height: 60,
    width: 310,
    // borderRadius: 40
    // marginTop: 50
  },
  buttonTitle: {
    color: "#fff",
    // fontWeight: "bold",
    fontSize: 20,
  },
});
