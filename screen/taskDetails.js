import React, { Component } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import global from "../global";

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
    console.log("s", d);
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
              {d.booking_date} {d.booking_time}
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
                  {/* {d.country_code} */}
                  {d.mobile}
                </Text>
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.mobileText}>
                {global.CONSTANT.CURRENCY} {d.booking_amount}
              </Text>
              {/* <Text style={styles.mobileText}>{global.CONSTANT.CURRENCY}</Text> */}
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
