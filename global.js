import { Dimensions, Platform } from "react-native";
import Constants from "expo-constants";
import axios from "axios";
import * as Localization from "expo-localization";
import i18n from "i18n-js";

i18n.translations = {
  en: {
    home: "Home",
    bookings: "Bookings",
    transaction_history: "Transaction History",
  },
  it: {
    home: "casa",
    bookings: "prenotazioni",
    transaction_history: "Cronologia delle transazioni",
  },
};

axios.defaults.baseURL =
  // "http://192.168.0.165/project/carwash/webservices/";
  "https://dacwash.com/webservices/";

// log request
axios.interceptors.request.use((request) => {
  console.log("Starting Request :", request.baseURL + request.url);
  console.log("Request Data :", request.data);
  console.log("Request Header :", request.headers.Authorization);
  return request;
});

// log response
axios.interceptors.response.use((response) => {
  console.log("Response: \n", response.status, response.data);
  return response;
});

var { height, width } = Dimensions.get("window");
export default {
  AUTHTOKEN: "AUTH", // for auth in app and key for async storage
  USER_DATA: "USER_DATA", //Key for storing data
  API_TOKEN: "API_TOKEN",

  FONT: {},
  COLOR: {
    PRIMARY: "#0E94DC",
    PRIMARY_DARK: "#0E94DC",
  },
  CONSTANT: {
    // APPNAME: Constants.manifest.name,
    // APPDESCRIPTION: "The best and trending Delivery Service App",
    // PLAYSTOREURL: "",
    // APPSTOREURL: "",
    // APPVERSION: Constants.manifest.version,
    HEIGHT: height,
    WIDTH: width,
    STATUSBAR: Constants.statusBarHeight,
    DEVICETYPE: Platform.OS,
    DEVICEID: "device_id",
    LANGUAGE: "eng",
    SUPPORT_MAIL: "dacwash@gmail.com",
    CURRENCY: "€",
    // DEVICETOKEN: ""
  },
  BOOKING_ID: "", // for getting booking details
  USER: {},
  ASSETS: {
    PROFILE: "https://www.w3schools.com/howto/img_avatar.png",
    TICK: require("./assets/tick.png"),
    ADD: require("./assets/add.png"),
    LOGO_WHITE: require("./assets/LOGO.png"),
    LOGO: require("./assets/LOGO.png"),
    CAR_ICON: require("./assets/car-wash.png"),
  },
  DRIVER_LOCATION: [
    0, //lat
    0, //long
  ],
  INTERVALS: [
    1, //driver location interval
  ],
  BOOKING_TRACK_STATUS: ["0"],
  CHAT_DETAILS: {},

  LANGUAGE: [
    "en", // en || it
  ],
};
