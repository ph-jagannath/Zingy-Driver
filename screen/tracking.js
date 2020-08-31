import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from "react-native";
import { Icon, Overlay, Button, Avatar } from "react-native-elements";
import logo from "../assets/logo.png";
import MapView from "react-native-maps";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import global from "../global";
import axios from "axios";
import moment from "moment";
// import * as Location from "expo-location";

export default class tracking extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.mapRef = null;

    this.getLocationAsync();
    this.getPermissionAsync();
    this.state = {
      before_visible: false,
      after_visible: false,
      track_status: 0,
      field: "",
      //   flag: global.ASSETS.FLAG,
      profile_image: "",
      before_image1: "",
      before_image2: "",
      before_image3: "",
      before_image4: "",
      after_image1: "",
      after_image2: "",
      after_image3: "",
      after_image4: "",
    };
  }

  // Get camera and files permissions
  getPermissionAsync = async () => {
    if (global.CONSTANT.DEVICETYPE == "ios") {
      // const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      const { status, permissions } = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL
      );
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  chooseUpload = () => {
    // this.setState({
    //   isVisible: !this.state.isVisible
    // });
  };

  // Image Picker function
  _pickImage = async (v) => {
    let field = this.state.field;

    let { status } = await Permissions.askAsync(
      // Permissions.CAMERA
      Permissions.CAMERA_ROLL
    );
    // console.log(status);
    let result = await ImagePicker.launchCameraAsync({
      quality: 0.2,
      // allowsEditing: true
    });

    // console.log(result);

    if (!result.cancelled) {
      this.setState({ [v]: result.uri });
    }
  };

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

  // Reached
  startMoving = (v) => {
    this.setState({
      buttonLoading: true,
    });
    // this.props.navigation.navigate("UserApp");
    axios({
      method: "post",
      url: "start_moving_on",
      data: {
        booking_id: v.booking_id,
        user_id: global.USER.user_id,
        language: global.CONSTANT.LANGUAGE,
      },
    }).then(
      function (response) {
        console.log(response.data);
        if (response.data.response.status) {
          console.log(response.data.response);
          global.BOOKING_TRACK_STATUS[0] = "9";
          this.setState({ buttonLoading: false });
        } else {
          this.setState({ buttonLoading: false });
          Alert.alert("Car Wash", response.data.response.message);
        }
      }.bind(this)
    );
  };

  upload_before(v) {
    if (
      this.state.before_image1 == "" ||
      this.state.before_image2 == "" ||
      this.state.before_image3 == "" ||
      this.state.before_image4 == ""
    ) {
      Alert.alert(
        "CarnaWashApp",
        "Please Upload all images of the vehicle before starting wash"
      );
    } else {
      this.setState({
        buttonLoading: true,
      });
      // this.props.navigation.navigate("UserApp");
      var data = new FormData();

      data.append("befor_image_1", {
        uri: this.state.before_image1,
        name: "before_image1.jpg",
        type: "image/jpg",
      });
      data.append("befor_image_2", {
        uri: this.state.before_image2,
        name: "before_image2.jpg",
        type: "image/jpg",
      });
      data.append("befor_image_3", {
        uri: this.state.before_image3,
        name: "before_image3.jpg",
        type: "image/jpg",
      });
      data.append("befor_image_4", {
        uri: this.state.before_image4,
        name: "before_image4.jpg",
        type: "image/jpg",
      });
      axios({
        method: "post",
        url: "booking_image/" + v.booking_id,
        data,
      }).then(
        function (response) {
          console.log(response.data);

          this.setState({ before_visible: false });
          if (response.data.response.status) {
            this.startWash(v);
          } else {
            this.setState({ buttonLoading: false });
            Alert.alert("Car Wash", response.data.response.message);
          }
        }.bind(this)
      );
    }
  }
  // start_wash
  startWash = (v) => {
    this.setState({
      buttonLoading: true,
    });
    // this.props.navigation.navigate("UserApp");
    axios({
      method: "post",
      url: "start_wash",
      data: {
        booking_id: v.booking_id,
        user_id: global.USER.user_id,
        start_wash_time: moment().format("YYYY-MM-DD HH:MM:SS").toString(),
        language: global.CONSTANT.LANGUAGE,
      },
    }).then(
      function (response) {
        console.log(response.data);
        if (response.data.response.status) {
          global.BOOKING_TRACK_STATUS[0] = "5";
          this.setState({ buttonLoading: false });
        } else {
          this.setState({ buttonLoading: false });
          Alert.alert("Car Wash", response.data.response.message);
        }
      }.bind(this)
    );
  };

  afterUpload(v) {
    if (
      this.state.after_image1 == "" ||
      this.state.after_image2 == "" ||
      this.state.after_image3 == "" ||
      this.state.after_image4 == ""
    ) {
      Alert.alert(
        "CarnaWashApp",
        "Please Upload all images of the vehicle before starting wash"
      );
    } else {
      this.setState({
        buttonLoading: true,
      });
      // this.props.navigation.navigate("UserApp");
      var data = new FormData();

      data.append("after_image_1", {
        uri: this.state.after_image1,
        name: "after_image1.jpg",
        type: "image/jpg",
      });
      data.append("after_image_2", {
        uri: this.state.after_image2,
        name: "after_image2.jpg",
        type: "image/jpg",
      });
      data.append("after_image_3", {
        uri: this.state.after_image3,
        name: "after_image3.jpg",
        type: "image/jpg",
      });
      data.append("after_image_4", {
        uri: this.state.after_image4,
        name: "after_image4.jpg",
        type: "image/jpg",
      });
      axios({
        method: "post",
        url: "booking_image/" + v.booking_id,
        data,
      }).then(
        function (response) {
          console.log("after upload", response.data);
          this.setState({ after_visible: false });

          if (response.data.response.status) {
            this.completeWash(v);
          } else {
            this.setState({ buttonLoading: false });
            Alert.alert("Car Wash", response.data.response.message);
          }
        }.bind(this)
      );
    }
  }
  // complete_wash
  completeWash = (v) => {
    this.setState({
      buttonLoading: true,
    });
    // this.props.navigation.navigate("UserApp");
    axios({
      method: "post",
      url: "complete_wash",
      data: {
        booking_id: v.booking_id,
        user_id: global.USER.user_id,
        complete_wash_duration: "COMPLETE WASH",
        language: global.CONSTANT.LANGUAGE,
      },
    }).then(
      function (response) {
        console.log(response.data);
        if (response.data.response.status) {
          console.log("complete_wash", response.data.response);
          global.BOOKING_TRACK_STATUS[0] = "2";
          this.props.navigation.navigate("Confirm", {
            new_data: v,
          });

          this.setState({ buttonLoading: false });
        } else {
          this.setState({ buttonLoading: false });
          Alert.alert("Car Wash", response.data.response.message);
        }
      }.bind(this)
    );
  };

  render() {
    let d = this.props.navigation.getParam("data", "no-data");

    return (
      // background container
      <View style={styles.bgContainer}>
        {/* header container */}
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
                  width: 100,
                  height: 80,
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
              />
            </View>
            <Icon
              name="forum-outline"
              color="#fff"
              reverse
              reverseColor={global.COLOR.PRIMARY}
              type="material-community"
              size={20}
              Component={TouchableOpacity}
              containerStyle={styles.iconContainer}
              onPress={() => {
                global.CHAT_DETAILS = d;
                this.props.navigation.navigate("chat");
              }}
            />
          </View>
        </View>
        {/* upper Container */}
        <View style={styles.upperContainer}>
          <MapView
            showsUserLocation
            showsMyLocationButton
            style={{ flex: 1 }}
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
        {/* bottom Container */}
        <View style={styles.bottomContainer}>
          <View style={styles.flatlist}>
            {d.user_vehicle_id ? (
              <>
                <Text style={styles.addressText}>Car : {d.vehicle_model}</Text>
                <Text style={styles.addressText}>
                  Color : {d.vehicle_color}
                </Text>
                <Text style={styles.addressText}>
                  Plate Number : {d.vehicle_plate_code} -{" "}
                  {d.vehicle_plate_number}
                </Text>
                <View style={styles.packageContainer}>
                  <Text style={{ marginHorizontal: 10, width: 300 }}>
                    Package : {d.plan_name} - {d.plan_service}
                  </Text>
                </View>
              </>
            ) : (
              <>
                <Text
                  style={[
                    styles.addressText,
                    { color: global.COLOR.PRIMARY_DARK },
                  ]}
                >
                  Two Wheeler Wash
                </Text>
              </>
            )}
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
            <Text style={styles.nameText}>{d.first_name}</Text>
          </View>
          <View>
            <Button
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.buttonStyle}
              loading={this.state.buttonLoading}
              title={
                global.BOOKING_TRACK_STATUS[0] == "1"
                  ? "REACHED"
                  : global.BOOKING_TRACK_STATUS[0] == "9"
                  ? "START WASH"
                  : global.BOOKING_TRACK_STATUS[0] == "5"
                  ? "COMPLETE WASH"
                  : "COMPLETED"
              }
              titleStyle={styles.buttonTitle}
              TouchableComponent={TouchableOpacity}
              onPress={() =>
                global.BOOKING_TRACK_STATUS[0] == "1"
                  ? this.startMoving(d)
                  : global.BOOKING_TRACK_STATUS[0] == "9"
                  ? this.setState({
                      before_visible: true,
                    })
                  : global.BOOKING_TRACK_STATUS[0] == "5"
                  ? this.setState({
                      after_visible: true,
                    })
                  : Alert.alert("CARNAWASHAPP", "Booking has been completed")
              }
            />
          </View>
        </View>
        {/* before image overlay container */}
        <Overlay
          overlayStyle={styles.overlay}
          containerStyle={styles.overlayContainer}
          isVisible={this.state.before_visible}
          transparent={true}
          //  width={global.CONSTANT.WIDTH - 40}
          height={150}
          animationType="slide"
          onRequestClose={() => this.setState({ before_visible: false })}
          onBackdropPress={() => this.setState({ before_visible: false })}
        >
          <View>
            <Text style={styles.washText}> Before Wash</Text>
          </View>
          <View style={styles.flexContainer}>
            <Avatar
              //   rounded
              size={140}
              overlayContainerStyle={{ borderColor: "#000", borderWidth: 2 }}
              source={
                this.state.before_image1 == ""
                  ? global.ASSETS.ADD
                  : { uri: this.state.before_image1 }
              }
              onPress={() => {
                this._pickImage("before_image1");
              }}
            />
            <Avatar
              //   rounded
              size={140}
              overlayContainerStyle={{ borderColor: "#000", borderWidth: 2 }}
              source={
                this.state.before_image2 == ""
                  ? global.ASSETS.ADD
                  : { uri: this.state.before_image2 }
              }
              onPress={() => {
                this._pickImage("before_image2");
              }}
            />
          </View>
          <View style={styles.flexContainer}>
            <Avatar
              //   rounded
              size={140}
              overlayContainerStyle={{ borderColor: "#000", borderWidth: 2 }}
              source={
                this.state.before_image3 == ""
                  ? global.ASSETS.ADD
                  : { uri: this.state.before_image3 }
              }
              onPress={() => {
                this._pickImage("before_image3");
              }}
            />

            <Avatar
              //   rounded
              size={140}
              overlayContainerStyle={{ borderColor: "#000", borderWidth: 2 }}
              source={
                this.state.before_image4 == ""
                  ? global.ASSETS.ADD
                  : { uri: this.state.before_image4 }
              }
              onPress={() => {
                this._pickImage("before_image4");
              }}
            />
          </View>
          <View>
            <Button
              containerStyle={styles.overlayButtonContainer}
              buttonStyle={styles.overlayButtonStyle}
              title="Start Wash"
              titleStyle={styles.overlayButtonTitle}
              TouchableComponent={TouchableOpacity}
              loading={this.state.buttonLoading}
              onPress={() => {
                this.upload_before(d);
              }}
            />
          </View>
        </Overlay>
        {/* after image overlay container */}
        <Overlay
          overlayStyle={styles.overlay}
          containerStyle={styles.overlayContainer}
          isVisible={this.state.after_visible}
          transparent={true}
          //  width={global.CONSTANT.WIDTH - 40}
          height={150}
          animationType="slide"
          onRequestClose={() => this.setState({ after_visible: false })}
          onBackdropPress={() => this.setState({ after_visible: false })}
        >
          <View>
            <Text style={styles.washText}> After Wash</Text>
          </View>
          <View style={styles.flexContainer}>
            <Avatar
              //   rounded
              size={140}
              overlayContainerStyle={{ borderColor: "#000", borderWidth: 2 }}
              source={
                this.state.after_image1 == ""
                  ? global.ASSETS.ADD
                  : { uri: this.state.after_image1 }
              }
              onPress={() => {
                this._pickImage("after_image1");
              }}
            />
            <Avatar
              //   rounded
              size={140}
              overlayContainerStyle={{ borderColor: "#000", borderWidth: 2 }}
              source={
                this.state.after_image2 == ""
                  ? global.ASSETS.ADD
                  : { uri: this.state.after_image2 }
              }
              onPress={() => {
                this._pickImage("after_image2");
              }}
            />
          </View>
          <View style={styles.flexContainer}>
            <Avatar
              //   rounded
              size={140}
              overlayContainerStyle={{ borderColor: "#000", borderWidth: 2 }}
              source={
                this.state.after_image3 == ""
                  ? global.ASSETS.ADD
                  : { uri: this.state.after_image3 }
              }
              onPress={() => {
                this._pickImage("after_image3");
              }}
            />

            <Avatar
              //   rounded
              size={140}
              overlayContainerStyle={{ borderColor: "#000", borderWidth: 2 }}
              source={
                this.state.after_image4 == ""
                  ? global.ASSETS.ADD
                  : { uri: this.state.after_image4 }
              }
              onPress={() => {
                this._pickImage("after_image4");
              }}
            />
          </View>
          <View>
            <Button
              containerStyle={styles.overlayButtonContainer}
              buttonStyle={styles.overlayButtonStyle}
              title="COMPLETE WASH"
              titleStyle={styles.overlayButtonTitle}
              TouchableComponent={TouchableOpacity}
              loading={this.state.buttonLoading}
              onPress={() => this.afterUpload(d)}
            />
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
    // marginTop: 10
  },
  header: {
    backgroundColor: global.COLOR.PRIMARY,
  },

  iconContainer: {
    marginTop: 10,
  },
  upperContainer: {
    flex: 0.6,
  },
  bottomContainer: {
    flex: 0.4,
  },
  addressText: {
    width: 200,
    fontSize: 14,
    marginHorizontal: 10,
    marginTop: 4,
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
    marginTop: 20,
  },
  buttonContainer: {
    alignSelf: "center",
    marginTop: 25,
    // marginHorizontal: 70
  },
  buttonStyle: {
    backgroundColor: global.COLOR.PRIMARY,
    height: 40,
    width: 270,
    // borderRadius: 40
    // marginTop: 50
  },
  buttonTitle: {
    color: "#fff",
    // fontWeight: "bold",
    fontSize: 20,
  },
  overlay: {
    backgroundColor: "#e2e2e2",
    // marginTop: global.CONSTANT.HEIGHT - 170,
    flex: 0.7,
    justifyContent: "center",
    borderRadius: 20,
    width: "100%",

    // marginTop: -170,
  },
  overlayContainer: {
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  washText: {
    color: "#000",
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
  },

  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 17,
  },
  overlayButtonContainer: {
    alignSelf: "center",
    marginTop: 10,
  },
  overlayButtonStyle: {
    backgroundColor: global.COLOR.PRIMARY,
    height: 40,
    width: 270,
  },
  overlayButtonTitle: {
    color: "#fff",
    // fontWeight: "bold",
    fontSize: 20,
  },
});
