import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  RefreshControl,
} from "react-native";
import { Icon } from "react-native-elements";
import global from "../global";
import axios from "axios";
import haversine from "haversine";

export default class activeTask extends Component {
  constructor(props) {
    super(props);
    this.getData();
    this.state = {
      data: [],
    };
  }

  getData = () => {
    this.setState({
      buttonLoading: true,
    });
    // this.props.navigation.navigate("UserApp");
    axios({
      method: "post",
      url: "my_bookings_driver",
      data: { user_id: global.USER.user_id, type: "2" },
    }).then(
      function (response) {
        console.log(response.data);
        if (response.data.response.status) {
          console.log(response.data.response);
          this.setState({ data: response.data.response.data });
        } else {
          this.setState({ data: [], buttonLoading: false });
          // Alert.alert("Car Wash", response.data.response.message);
        }
      }.bind(this)
    );
  };

  render() {
    return (
      <View style={styles.bgContainer}>
        <FlatList
          data={this.state.data}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                this.getData();
              }}
            />
          }
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
                if (d.status == "0" || d.status == "1") {
                  this.props.navigation.navigate("PendingDetails", {
                    data: d,
                  });
                } else if (d.status == "5" || d.status == "9") {
                  this.props.navigation.navigate("Tracking", {
                    data: d,
                  });
                } else {
                  this.props.navigation.navigate("taskDetails", {
                    data: d,
                  });
                }
              }}
            >
              <View style={styles.faltlist}>
                <View>
                  <Text style={styles.nameText}>{d.first_name}</Text>
                  <Text style={styles.nameText}>
                    {d.vehicle_make !== "" ? d.plan_name : "Two Wheeler Wash"}
                  </Text>
                  <Text style={styles.addressText}>{d.booking_address}</Text>
                  <View style={styles.distanceContainer}>
                    <Text>Distance : </Text>
                    <Text style={styles.nameText}>
                      {haversine(
                        {
                          latitude: global.DRIVER_LOCATION[0],
                          longitude: global.DRIVER_LOCATION[1],
                        },
                        { latitude: d.booking_lat, longitude: d.booking_long },
                        { unit: "mile" }
                      ).toFixed(4)}{" "}
                      Miles
                    </Text>
                  </View>
                  <View style={styles.distanceContainer}>
                    <Text>Status : </Text>
                    <Text style={styles.nameText}>
                      {d.status == "0"
                        ? "Initiated"
                        : d.status == "1"
                        ? "Scheduled"
                        : d.status == "2"
                        ? "Completed"
                        : d.status == "3"
                        ? "Canceled"
                        : d.status == "4"
                        ? "Refunded"
                        : d.status == "5"
                        ? "Start Wash"
                        : d.status == "6"
                        ? "Cancelled"
                        : d.status == "7"
                        ? "Cancelled"
                        : d.status == "8"
                        ? "Cancelled"
                        : d.status == "9"
                        ? "Reached"
                        : ""}
                    </Text>
                  </View>
                  <View style={styles.distanceContainer}>
                    <Text>Type : </Text>
                    <Text style={styles.nameText}>
                      {d.booking_type == "1"
                        ? "On Demand"
                        : d.booking_type == "2"
                        ? "Schedule"
                        : ""}
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
