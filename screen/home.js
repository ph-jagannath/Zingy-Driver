import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Switch,
} from "react-native";
import { Icon, Overlay } from "react-native-elements";
import MapView from "react-native-maps";
import { RadioButton, Divider, Snackbar } from "react-native-paper";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import axios from "axios";
import global from "../global";

export default class home extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this._getLocationAsync();
    this.state = {
      alert: false,
      switchValue: true,
      active: true,
      isVisible: false,
      checked: "",
      latitude: 35.917973,
      longitude: 14.409943,
      latitudeDelta: 0.006,
      longitudeDelta: 0.003,
      marginBottom: 1,
      key: 0,
    };
  }

  _onMapReady = () => this.setState({ marginBottom: 0 });

  _getLocationAsync = async () => {
    console.log(this.props.navigation.state.routeName);

    let { status } = await Location.getPermissionsAsync({});
    if (status !== "granted") {
      alert("Permission to access location was denied");
      this.setState({
        errorMessage: "Permission to access location was denied",
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    this.setState({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      marginBottom: 0,
      key: Math.random(),
      loading: false,
    });
  };

  // Validate
  handleValidate = () => {
    console.log(this.state.checked);
    if (this.state.checked == "") {
      Alert.alert("Alert", "Please select one reason to turn off location");
    } else {
      this.handleOffline(false);
    }
  };

  handleOffline = (val) => {
    this.setState({
      isVisible: false,
      switchValue: val,
      alert: true,
    });
    axios({
      method: "post",
      url: `update_notification_setting`,
      data: {
        user_type: "2",
        device_id: global.CONSTANT.DEVICEID,
        user_id: global.USER.user_id,
        reason_for_offline: this.state.checked,
        device_type: global.CONSTANT.DEVICETYPE,
        not_status: val ? 1 : 0,
      },
    }).then(
      function (response) {
        console.log(response.data);
      }.bind(this)
    );
  };

  toggleSwitch = (val) => {
    console.log("val: ", val);
    // console.log(global.USER);
    this.setState({
      switchValue: val,
      isVisible: !val ? true : false,
    });
    if (val) {
      this.handleOffline(val);
    }
    // global.IS_ONLINE[0] = val ? "true" : "false";

    // this.changeStatus(val);
  };

  render() {
    return (
      // bg container
      <View style={styles.bgContainer}>
        <View style={styles.header}>
          {/* header container */}
          <View style={styles.headerContainer}>
            {/* menu icon */}
            <View>
              <Icon
                name="menu"
                iconStyle={styles.menuIcon}
                color="#fff"
                type="material-community"
                size={40}
                Component={TouchableOpacity}
                onPress={() => this.props.navigation.openDrawer()}
              />
            </View>
            {/* logo container */}
            <View style={styles.logo}>
              <Image
                source={global.ASSETS.LOGO_WHITE}
                style={{
                  width: 80,
                  height: 60,
                  resizeMode: "cover",
                  // alignSelf: "center",
                }}
              />
            </View>
            {/* switch toggle container */}
            <View style={styles.switch}>
              <Switch
                trackColor={{ false: "#fff", true: "#3b5599" }}
                thumbColor={this.state.switchValue ? "#3b5599" : "#fff"}
                onValueChange={this.toggleSwitch}
                value={this.state.switchValue}
              />
            </View>
          </View>
        </View>
        {/* map view container */}
        <MapView
          key={this.state.key}
          loadingEnabled={false}
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
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta,
          }}
        />
        <Snackbar
          visible={this.state.alert}
          onDismiss={() => this.setState({ alert: false })}
          duration={1500}
        >
          {`Your status changed to ${
            this.state.switchValue ? "Online" : "Offline"
          } Successfuly`}
        </Snackbar>
        {/* overlay */}
        <Overlay
          overlayStyle={styles.overlay}
          containerStyle={styles.overlayContainer}
          isVisible={this.state.isVisible}
          transparent={true}
          width={300}
          // width={global.CONSTANT.WIDTH - 40}
          height={240}
          animationType="slide"
        >
          <View>
            <View>
              <Text style={styles.overlayTitle}>
                Are you sure you want to off your {"\n"} location?
              </Text>
            </View>
            <View>
              <Text style={styles.reasonText}>Reason</Text>
            </View>
            <View>
              <View style={styles.radioButtonContainer}>
                <RadioButton
                  color={global.COLOR.PRIMARY}
                  value="Break"
                  status={
                    this.state.checked === "Break" ? "checked" : "unchecked"
                  }
                  onPress={() => {
                    this.setState({ checked: "Break" });
                  }}
                />
                <Text style={styles.radioText}>Break</Text>
              </View>
              <View style={styles.radioButtonContainer}>
                <RadioButton
                  color={global.COLOR.PRIMARY}
                  value="Finished"
                  status={
                    this.state.checked === "Finished" ? "checked" : "unchecked"
                  }
                  onPress={() => {
                    this.setState({ checked: "Finished" });
                  }}
                />
                <Text style={styles.radioText}>Finished</Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.handleValidate();
                }}
              >
                <View style={{ width: 120, height: 40 }}>
                  <Text style={styles.yesButton}>Yes</Text>
                </View>
              </TouchableOpacity>
              <Divider style={styles.divider} />
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    isVisible: false,
                    switchValue: true,
                  })
                }
              >
                <View style={{ width: 120, height: 40 }}>
                  <Text style={styles.noButton}>No</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Overlay>
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
    justifyContent: "space-between",
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
    marginTop: 9,
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
