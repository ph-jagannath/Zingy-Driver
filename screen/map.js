import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { Icon } from "react-native-elements";
import MapView from "react-native-maps";
import global from "../global";

export default class map extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    // this._getLocationAsync();
    this.state = {
      alert: false,
      switchValue: true,
      active: true,
      isVisible: false,
      checked: "",
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.006,
      longitudeDelta: 0.003,
      marginBottom: 1,
    };
  }
  _onMapReady = () => this.setState({ marginBottom: 0 });

  render() {
    let d = this.props.navigation.getParam("map", "no-data");
    return (
      // bg container
      <View style={styles.bgContainer}>
        <View style={styles.header}>
          {/* header container */}
          <View style={styles.headerContainer}>
            {/* menu icon */}
            <View>
              <Icon
                name="chevron-left"
                iconStyle={styles.menuIcon}
                color="#fff"
                type="material-community"
                size={40}
                Component={TouchableOpacity}
                onPress={() => this.props.navigation.goBack()}
              />
            </View>
            {/* logo container */}
            <View style={styles.logo}>
              <Image
                source={global.ASSETS.LOGO_WHITE}
                style={{
                  width: 100,
                  height: 80,
                  resizeMode: "contain",
                  //   justifyContent: "center",
                  marginLeft: 65,
                }}
              />
            </View>
          </View>
        </View>
        {/* map view container */}
        <MapView
          //   loadingEnabled={true}
          showsUserLocation={true}
          showsCompass={false}
          zoomEnabled={true}
          scrollEnabled={true}
          cacheEnabled={false}
          moveOnMarkerPress={false}
          zoomTapEnabled={true}
          showsMyLocationButton={true}
          liteMode={false}
          pitchEnabled={true}
          onMapReady={this._onMapReady}
          provider="google"
          style={{
            flex: 1,

            marginBottom: this.state.marginBottom,
          }}
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
            pinColor="#004000"
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    width: null,
  },
  headerContainer: {
    backgroundColor: global.COLOR.PRIMARY,
    height: 50,
    justifyContent: "flex-start",
    flexDirection: "row",
    margin: 20,
  },
  menuIcon: {
    paddingTop: 20,
    alignSelf: "flex-start",
  },
  switch: {
    marginTop: 25,
  },
  logo: {
    // marginTop: 10
  },
  header: {
    backgroundColor: global.COLOR.PRIMARY,
  },
  overlay: {
    backgroundColor: "#fff",
    marginTop: 70,
    justifyContent: "space-around",
    // flex: 1,
    // justifyContent: "flex-end"
  },
  overlayContainer: {
    backgroundColor: "transparent",
  },
  overlayTitle: {
    textAlign: "center",
    fontWeight: "normal",
    fontSize: 16,
    color: "#000",
    // textTransform: "capitalize"
  },
  reasonText: {
    color: global.COLOR.PRIMARY,
    fontSize: 20,
    margin: 14,
  },
  radioButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  radioText: {
    fontSize: 18,
    color: "#000",
    marginTop: 5,
  },
  buttonContainer: {
    // alignSelf: "center",
    borderTopWidth: 1,
    borderColor: "gray",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginHorizontal: -10,
    marginBottom: -16,
    // marginHorizontal: 70
  },
  yesButton: {
    color: global.COLOR.PRIMARY,
    marginTop: 15,
    alignSelf: "center",
  },
  noButton: {
    color: "red",
    marginTop: 15,
    textAlign: "center",
  },
  divider: {
    height: 54,
    width: 1,
    backgroundColor: "gray",
  },
});
