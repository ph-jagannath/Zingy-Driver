import firebase from "firebase";
import global from "./global";
import moment from "moment";
import Axios from "axios";

class Backend {
  uid = "";
  messageRef = null;

  constructor() {
    firebase.initializeApp({
      apiKey: "AIzaSyBKeDPnuTSTNiElCtke3R6WQ06JZoWId2A",
      authDomain: "dacwash.firebaseapp.com",
      databaseURL: "https://dacwash.firebaseio.com",
      projectId: "dacwash",
      storageBucket: "dacwash.appspot.com",
      messagingSenderId: "244777178350",
      appId: "1:244777178350:web:ec2ee54e5cf047d5348fff",
      measurementId: "G-D2MN5CS9GW",
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setUid(user.uid);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            alert(error.message);
          });
      }
    });
  }

  setUid(value) {
    this.uid = value;
    this.uid = global.CHAT_DETAILS.booking_driver_id;
  }
  getUid() {
    // return this.uid;
    return global.CHAT_DETAILS.booking_driver_id;
  }

  loadMessages(callback) {
    let d = global.CHAT_DETAILS;
    let chat_id =
      Number(d.user_id) > Number(d.booking_driver_id)
        ? `${d.user_id}_${d.booking_driver_id}`
        : `${d.booking_driver_id}_${d.user_id}`;

    this.messageRef = firebase
      .database()
      .ref()
      .child("ChatHistory")
      .child(`${chat_id}`);
    this.messageRef.off();

    const onRecieve = (data) => {
      const msg = data.val();

      callback({
        _id: data.key,
        text: msg.Message,
        createdAt: Date.now(),
        user: {
          _id: msg.SenderId,
          name: msg.Sendername,
          avatar: global.ASSETS.PROFILE,
        },
      });
    };
    this.messageRef.limitToLast(20).on("child_added", onRecieve);
  }

  sendMessage(msg) {
    let data = global.CHAT_DETAILS;
    for (let i = 0; i < msg.length; i++) {
      this.messageRef.push({
        // text: msg[i].text,
        // user: msg[i].user
        Message: msg[i].text,
        Time: "",
        Date: moment().format("YYYY-MM-DD hh:mm a").toString(),
        Timestamp: "",
        chatType: "Text",
        SenderId: data.booking_driver_id,
        ReciverId: data.user_id,
        Sendername: `${global.USER.first_name} ${global.USER.last_name}`,
        Receivername: data.first_name,
        Count: "0",
        sendImage: global.ASSETS.PROFILE,
      });
      Axios({
        method: "post",
        url: "sendNotification",
        data: {
          receiver_id: data.user_id,
          sender_id: data.booking_driver_id,
          receiver_type: "1",
          message: msg[i].text,
        },
      }).then(
        function (response) {
          console.log(response.data);
          // if (response.data.response.status) {
          //   console.log(response.data.response);
          //   global.BOOKING_TRACK_STATUS[0] = "2";
          //   this.props.navigation.navigate("home");

          //   this.setState({ buttonLoading: false });
          // } else {
          //   this.setState({ buttonLoading: false });
          //   Alert.alert("Car Wash", response.data.response.message);
          // }
        }.bind(this)
      );
    }
  }
  closeChat() {
    if (this.messageRef) {
      this.messageRef.off();
    }
  }
}
export default new Backend();
