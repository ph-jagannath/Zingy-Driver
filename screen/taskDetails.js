import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Avatar } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import global from "../global";
import axios from "axios";

// const DATA = [
//   {
//     booking_id: "583",
//     img: "",
//     first_name: "Rachitsharma",
//     last_name: "",
//     mobile: "987654321",
//     country_code: "+61",
//     rating: 0,
//     user_rating: 0,
//     status: "2",
//     charges: "400.00",
//     booking_date: "2020-02-15",
//     booking_time: "19:55:45",
//     start_booking_time: "2020-02-15 20:10:42",
//     booking_address:
//       "Unnamed Road, Ambika Colony, Shiv Nagar, Jaipur, Rajasthan 302029",
//     payment_type: "2",
//     booking_type: "1",
//     fair_review: "",
//     booking_cancel_time: "",
//     complete_wash_duration: "COMPLETE WASH",
//     cancel_reason_text: "",
//     transaction_id: "",
//     UserVehicle: {
//       id: "13",
//       name: null,
//       user_id: "393",
//       make_id: "2",
//       vehicle_model_id: "11",
//       type: null,
//       year: "2019",
//       color: "Brown",
//       country_id: "9",
//       plate_code: "FGA",
//       plate_number: "9797",
//       car_registration: null,
//       insurance_expiry: null,
//       tire_manufactured: null,
//       battery_lifetime: null,
//       tyre_pressure_fr: null,
//       tyre_pressure_fl: null,
//       tyre_pressure_rr: null,
//       tyre_pressure_rl: null,
//       vehicle_picture: null,
//       status: "1",
//       created: "2020-02-08 21:27:58",
//       modified: "2020-02-08 21:27:58",
//       Make: {
//         id: "2",
//         name: "Alfa Romeo",
//         make_logo: "make_logo_1548771537.18.png",
//         status: "1",
//         created: "2018-12-24 00:00:00",
//         modified: "2019-01-29 14:18:57"
//       },
//       VehicleModel: {
//         id: "11",
//         name: "4C",
//         make_id: "2",
//         type: "SUV",
//         status: "1",
//         created: "2019-04-02 00:00:00",
//         modified: "2019-04-02 00:00:00"
//       },
//       Country: []
//     }
//   }
// ];

export default class taskDetails extends Component {
  static navigationOptions = {
    title: "Booking Details",
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
    // this.getData();
    this.state = {
      data: [],
    };
  }
  render() {
    let d = this.props.navigation.getParam("data", "no-data");
    return (
      <View style={styles.bgContainer}>
        <View>
          {/* image container */}
          <View>
            <Image
              source={{
                uri: !d.img
                  ? global.ASSETS.PROFILE
                  : d.img == ""
                  ? global.ASSETS.PROFILE
                  : d.img,
              }}
              style={styles.image}
            ></Image>
            <Text style={styles.seriesText}>{d.name}</Text>
          </View>
          {/* complete container */}
          <View style={styles.completeContainer}>
            <Text style={styles.dateText}>
              {d.booking_date} , {d.booking_time}
            </Text>
            <Text style={styles.nameText}>
              {d.status == "9"
                ? "Reached"
                : d.status == "2"
                ? "Competed"
                : d.status == "5"
                ? "Start Wash"
                : d.status}
            </Text>
          </View>
          <View style={styles.completeContainer}>
            <View
              style={{ flexDirection: "row", justifyContent: "flex-start" }}
            >
              <Image
                source={{ uri: d.vehicle_make_logo }}
                style={styles.logo}
              />
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{d.first_name}</Text>
                <Text style={styles.mobileText}>
                  {d.country_code}
                  {d.mobile}
                </Text>
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.mobileText}>{d.charges}</Text>
              <Text style={styles.mobileText}>AUD</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.addressText}>
              Payment Method : {d.payment_type == "2" ? "Card" : "Cash"}
            </Text>
            <Text style={styles.addressText}>Location : </Text>
            <Text style={styles.addressText}>{d.booking_address}</Text>
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
  image: {
    height: 280,
    width: null,
    resizeMode: "cover",
  },
  seriesText: {
    zIndex: 9,
    position: "absolute",
    marginTop: global.CONSTANT.STATUSBAR + 220,
    color: global.COLOR.PRIMARY,
    fontSize: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    marginHorizontal: 10,
  },
  completeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 20,
  },
  dateText: {
    fontSize: 20,
    color: "gray",
  },
  nameText: {
    fontSize: 20,
    color: global.COLOR.PRIMARY,
  },
  logo: {
    height: 100,
    width: 100,
    resizeMode: "cover",
  },
  mobileText: {
    fontSize: 20,
  },
  textContainer: {
    alignSelf: "center",
    marginHorizontal: 10,
  },
  addressText: {
    fontSize: 18,
  },
});
