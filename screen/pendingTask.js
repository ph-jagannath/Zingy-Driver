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
import { TouchableOpacity } from "react-native-gesture-handler";
import global from "../global";
import axios from "axios";
import moment from "moment";

export default class pendingTask extends Component {
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
      if (unit == "m") {
        dist = dist * 1609.34;
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
      url: "my_bookings_driver",
      data: { user_id: global.USER.user_id, type: "1" },
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
                this.props.navigation.navigate("PendingDetails", {
                  data: d,
                });
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
                    {d.vehicle_type ? d.plan_name : "Two Wheeler Wash"}
                  </Text>
                  {d.vehicle_type && (
                    <Text style={styles.nameText}>{d.vehicle_model}</Text>
                  )}
                  <Text style={styles.addressText}>
                    Location : {d.booking_address}
                  </Text>
                  <View style={styles.distanceContainer}>
                    <Text>Distance : </Text>
                    <Text style={styles.nameText}>
                      {this.distance(
                        d.user_lat,
                        d.user_lon,
                        d.booking_lat,
                        d.booking_long,
                        "K"
                      )}
                      KM
                    </Text>
                  </View>
                  <View style={styles.distanceContainer}>
                    <Text>Status : </Text>
                    <Text style={styles.nameText}>
                      {d.status == "1" ? "On Demand" : "Schedule"}
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
