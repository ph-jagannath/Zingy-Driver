// import Axios from "axios";
// import Loader from "../Components/Loader";
// import * as RootNavigation from "./RootNavigation";
// import { Alert } from "react-native";
// import AsyncStorage from "@react-native-community/async-storage";
// import NetInfo from "@react-native-community/netinfo";
// import global from "./global";
// import i18n from "i18n-js";
// import * as SplashScreen from "expo-splash-screen";

// // Network listener
// const unsubscribe = NetInfo.addEventListener((state) => {
//   console.log("Is connected?", state.isConnected);
//   if (!state.isConnected) {
//     Alert.alert("Alert", "No Internet Connection Available");
//   }
// });

// // base url
// Axios.defaults.baseURL = "https://krn.testingdemo.net/public/api/v1/";

// // log request
// Axios.interceptors.request.use((request) => {
//   console.log("Starting Request :", request.baseURL + request.url);
//   console.log("Request Data :", request.data);
//   console.log("Request Header :", request.headers.Authorization);
//   return request;
// });

// // log response
// Axios.interceptors.response.use((response, error) => {
//   if (error) {
//     throw error;
//   }
//   console.log("Response: \n", response.status, response.data);
//   return response;
// });
