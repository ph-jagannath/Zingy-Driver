import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  Alert,
  RefreshControl,
} from "react-native";
import { Icon } from "react-native-elements";
import global from "../global";
import axios from "axios";
import moment from "moment";
import haversine from "haversine";

export default class pendingTask extends Component {
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
      data: { user_id: global.USER.user_id, type: "1" },
    }).then(
      function (response) {
        if (response.data.response.status) {
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
          showsVerticalScrollIndicator={false}
          data={this.state.data}
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
                global.BOOKING_TRACK_STATUS[0] = d.status;
                if (moment(d.booking_date).isSame(moment(), "day")) {
                  if (d.status == "0" || d.status == "1") {
                    this.props.navigation.navigate("PendingDetails", {
                      data: d,
                    });
                  } else if (d.status == "5" || d.status == "9") {
                    this.props.navigation.navigate("Tracking", {
                      data: d,
                    });
                  }
                }
              }}
            >
              <View style={styles.faltlist}>
                <View style={{ justifyContent: "center" }}>
                  <Image
                    source={global.ASSETS.CAR_ICON}
                    style={{
                      width: 40,
                      height: 30,
                      alignSelf: "center",
                      resizeMode: "contain",
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.nameText}>
                    {d.vehicle_make !== "" ? d.plan_name : "Two Wheeler Wash"}
                  </Text>
                  {d.vehicle_make !== "" && (
                    <Text style={styles.nameText}>
                      {d.vehicle_make} {d.vehicle_model}
                    </Text>
                  )}
                  <Text style={styles.addressText}>
                    Location : {d.booking_address}
                  </Text>
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
                    <Text style={styles.nameText}>
                      {moment(d.booking_time, ["HH:mm"]).format("h:mm A")}
                    </Text>
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
    color: global.COLOR.PRIMARY_DARK,
    fontSize: 16,
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
