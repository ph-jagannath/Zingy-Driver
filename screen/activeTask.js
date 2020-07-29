import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import global from "../global";
import axios from "axios";

export default class activeTask extends Component {
  constructor(props) {
    super(props);
    this.getData();
    this.state = {
      data: [],
    };
  }
  // Calculate Distance using Coordinates
  distance(lat1, lon1, lat2, lon2, unit) {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") {
        dist = dist * 1.609344;
      }
      if (unit == "N") {
        dist = dist * 0.8684;
      }
      dist = Math.round(dist * 100) / 100;
      return dist;
    }
  }
  getData = () => {
    this.setState({
      buttonLoading: true,
    });
    // this.props.navigation.navigate("UserApp");
    axios({
      method: "post",
      url: "my_bookings_driver ",
      data: { user_id: global.USER.user_id, type: "2" },
    }).then(
      function (response) {
        console.log(response.data);
        if (response.data.response.status) {
          console.log(response.data.response);
          this.setState({ data: response.data.response.data });
        } else {
          this.setState({ buttonLoading: false });
          Alert.alert("Car Wash", response.data.response.message);
        }
      }.bind(this)
    );
  };

  render() {
    return (
      <View style={styles.bgContainer}>
        <FlatList
          data={this.state.data}
          ListEmptyComponent={
            <Text
              style={{ alignSelf: "center", color: "#000", marginTop: 200 }}
            >
              No Bookings Available
            </Text>
          }
          renderItem={({ item: d }) => (
            <TouchableWithoutFeedback
              onPress={() => {
                console.log(d);
                global.BOOKING_TRACK_STATUS[0] = d.status;
                this.props.navigation.navigate(
                  d.status == "6" || d.status == "7" || d.status == "8"
                    ? "PendingDetails"
                    : d.status == "9" || d.status == "5"
                    ? "Tracking"
                    : "taskDetails",
                  {
                    data: d,
                  }
                );
              }}
            >
              <View style={styles.faltlist}>
                <View>
                  <Text style={styles.nameText}>{d.first_name}</Text>
                  <Text style={styles.addressText}>
                    {d.vehicle_make} {d.vehicle_model}
                  </Text>
                  <Text style={styles.addressText}>{d.booking_address}</Text>
                  <View style={styles.distanceContainer}>
                    <Text>Distance : </Text>
                    <Text style={styles.nameText}>
                      {this.distance(
                        global.DRIVER_LOCATION[0],
                        global.DRIVER_LOCATION[1],
                        d.booking_lat,
                        d.booking_long,
                        "K"
                      )}
                    </Text>
                  </View>
                  <View style={styles.distanceContainer}>
                    <Text>Status : </Text>
                    <Text style={styles.nameText}>
                      {d.status == "9"
                        ? "Reached"
                        : d.status == "2"
                        ? "Completed"
                        : d.status == "5"
                        ? "Start Wash"
                        : d.status}
                    </Text>
                  </View>
                </View>
                <View style={styles.rightContainer}>
                  <View>
                    <Text>{d.booking_date}</Text>
                    <Text style={styles.nameText}>{d.booking_time}</Text>
                  </View>

                  <Icon
                    name="chevron-right"
                    color="gray"
                    type="material-community"
                    size={40}
                    iconStyle={{ marginHorizontal: 5 }}
                    // Component={TouchableOpacity}
                    // onPress={}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    width: null,
  },
  nameText: {
    color: global.COLOR.PRIMARY,
    fontSize: 18,
  },
  addressText: {
    width: 210,
    fontSize: 16,
  },
  faltlist: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
  },
  rightContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf: "center",
  },
  distanceContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
