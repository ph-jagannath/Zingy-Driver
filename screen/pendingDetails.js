import React, { Component } from "react";
import { Text, StyleSheet, View, Image, Alert } from "react-native";
import MapView from "react-native-maps";
import { Button } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import global from "../global";
import axios from "axios";

export default class pendingDetails extends Component {
  static navigationOptions = {
    title: "PENDING REQUEST",
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
    this.mapRef = null;
    // this._getLocationAsync();
    this.state = {
      data: [],
    };
  }

  startBooking = (v) => {
    this.setState({
      buttonLoading: true,
    });
    axios({
      method: "post",
      url: "booking_start",
      data: { booking_id: v.booking_id, user_id: global.USER.user_id },
    }).then(
      function (response) {
        if (response.data.response.status) {
          global.BOOKING_TRACK_STATUS[0] = v.status;
          this.setState({ buttonLoading: false });
          this.props.navigation.navigate("Tracking", {
            data: v,
          });
        } else {
          this.setState({ buttonLoading: false });
          Alert.alert(
            "Car Wash",
            response.data.response.message,
            [
              {
                text: "OK",
                onPress: () => {
                  this.props.navigation.navigate("bookings");
                },
              },
            ],
            { cancelable: true }
          );
        }
      }.bind(this)
    );
  };
  render() {
    let d = this.props.navigation.getParam("data", "no-data");
    return (
      // background container
      <View style={styles.bgContainer}>
        {/* upper container */}
        <View style={styles.upperContainer}>
          <View>
            {/* name container */}
            <View style={styles.nameContainer}>
              <Text style={styles.nameText}>{d.first_name}</Text>
              <Text style={styles.addressText}>Contact : {d.mobile}</Text>
              <Text style={styles.addressText}>
                Requested at : {d.booking_date} at {d.booking_time}
              </Text>
              {d.user_vehicle_id && (
                <>
                  <Text style={styles.addressText}>
                    Vehicle color : {d.vehicle_color}
                  </Text>
                  <Text style={styles.addressText}>
                    Plate Number : {d.vehicle_plate_number}
                  </Text>
                  <Text style={styles.addressText}>
                    No of times washed before : {d.no_of_washs}
                  </Text>
                </>
              )}
            </View>
            {/* address container */}
            <View style={styles.nameContainer}>
              <Text style={styles.nameText}>Location : </Text>
              <Text>{d.booking_address}</Text>
            </View>
            {/* commments container */}
            <View style={styles.nameContainer}>
              {/* <Text style={styles.nameText}>Comments</Text> */}
              {/* image conytainer */}
              <View style={styles.imageContainer}>
                <View>
                  <Image
                    source={{ uri: d.vehicle_make_logo }}
                    style={styles.image}
                  />
                </View>
                <View style={styles.commentContainer}>
                  <Text style={styles.addressText}>{d.vehicle_model}</Text>
                  <Text style={styles.addressText}></Text>
                  <Text style={styles.itemContainer}>
                    {d.plan_name} - {d.plan_service}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* bottom container */}
        <View style={styles.bottomContainer}>
          <MapView
            style={{ flex: 0.8, marginBottom: this.state.marginBottom }}
            // zoomEnabled={false}
            // scrollEnabled={false}
            cacheEnabled={true}
            moveOnMarkerPress={false}
            zoomTapEnabled={false}
            showsMyLocationButton={false}
            // liteMode={true}
            pitchEnabled={false}
            ref={(ref) => {
              this.mapRef = ref;
            }}
            onLayout={() =>
              this.mapRef.fitToCoordinates(
                [
                  {
                    latitude: Number(d.user_lat),
                    longitude: Number(d.user_lon),
                  },
                  {
                    latitude: Number(d.booking_lat),
                    longitude: Number(d.booking_long),
                  },
                ],
                {
                  edgePadding: { top: 0, right: 0, bottom: 0, left: 0 },
                  animated: true,
                }
              )
            }
          >
            <MapView.Marker
              coordinate={{
                latitude: Number(d.user_lat),
                longitude: Number(d.user_lon),
              }}
              pinColor="#c10000"
            />
            <MapView.Marker
              coordinate={{
                latitude: Number(d.booking_lat),
                longitude: Number(d.booking_long),
              }}
              pinColor="#008000"
            />
            <MapView.Polyline
              coordinates={[
                {
                  latitude: Number(d.user_lat),
                  longitude: Number(d.user_lon),
                },
                {
                  latitude: Number(d.booking_lat),
                  longitude: Number(d.booking_long),
                },
              ]}
              strokeWidth={3}
              strokeColor="blue"
            />
          </MapView>
          <View>
            <Button
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.buttonStyle}
              loading={this.state.buttonLoading}
              title="Start"
              titleStyle={styles.buttonTitle}
              TouchableComponent={TouchableOpacity}
              onPress={() => this.startBooking(d)}
            />
          </View>
          <View>
            <Button
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.buttonStyle}
              // loading={this.state.buttonLoading}
              title="Map"
              titleStyle={styles.buttonTitle}
              TouchableComponent={TouchableOpacity}
              onPress={() => {
                this.props.navigation.navigate("map", {
                  map: d,
                });
              }}
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
  icon: {
    margin: 10,
  },
  iconContainer: {
    alignSelf: "flex-end",
  },
  nameText: {
    color: global.COLOR.PRIMARY,
    fontSize: 16,
  },
  addressText: {
    width: 260,
    fontSize: 14,
  },
  itemContainer: {
    width: 210,
    fontSize: 16,
  },
  nameContainer: {
    marginTop: 6,
    marginHorizontal: 10,
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  commentContainer: {
    marginTop: 14,
  },
  upperContainer: {
    flex: 0.5,
    justifyContent: "space-evenly",
  },
  bottomContainer: {
    flex: 0.5,
  },
  buttonContainer: {
    alignSelf: "center",
    marginTop: 10,
    // marginHorizontal: 70
  },
  buttonStyle: {
    backgroundColor: global.COLOR.PRIMARY,
    height: 50,
    width: 300,
    borderRadius: 40,
    // marginTop: 50
  },
  buttonTitle: {
    color: "#fff",
    // fontWeight: "bold",
    fontSize: 20,
  },
});
