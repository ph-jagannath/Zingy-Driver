import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { Icon, Avatar } from "react-native-elements";
import TimeAgo from "react-native-timeago";
import global from "../global";
import axios from "axios";

export default class transactioHistory extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "My Transaction History",
    headerStyle: {
      backgroundColor: global.COLOR.PRIMARY,
    },
    headerLeft: (
      <Icon
        name="menu"
        color="#fff"
        type="material-community"
        size={35}
        iconStyle={{ marginHorizontal: 10 }}
        Component={TouchableOpacity}
        onPress={() => navigation.openDrawer()}
      />
    ),
    headerRight: (
      <Icon
        name="bell-outline"
        color="#fff"
        type="material-community"
        size={35}
        iconStyle={{ marginHorizontal: 10 }}
        Component={TouchableOpacity}
        onPress={() => navigation.navigate("notifications")}
      />
    ),

    headerTintColor: "#fff",

    headerTitleStyle: {
      fontWeight: "bold",
    },
  });
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
      url: "transaction_list_driver",
      data: {
        user_id: global.USER.user_id,
        language: global.CONSTANT.LANGUAGE,
        type: "2",
      },
    }).then(
      function (response) {
        console.log(response.data);
        if (response.data.response.status) {
          console.log(response.data.response);
          this.setState({ data: response.data.response.data });
        } else {
          this.setState({ buttonLoading: false });
          // Alert.alert("Login Status", response.data.response.message);
        }
      }.bind(this)
    );
  };

  render() {
    return (
      <View style={styles.bgContainer}>
        <FlatList
          data={this.state.data}
          ListEmptyComponent={
            <Text
              style={{ alignSelf: "center", color: "#000", marginTop: 200 }}
            >
              No Transactions Available
            </Text>
          }
          renderItem={({ item: d }) => (
            <View style={styles.flatlist}>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-start" }}
              >
                <View style={styles.avatar}>
                  <Avatar
                    rounded
                    size={70}
                    source={{
                      uri: d.img == "" ? global.ASSETS.PROFILE : d.img,
                    }}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.nameText}>{d.first_name}</Text>
                  <Text style={styles.timeText}>
                    Txn Id : {d.transaction_id == "" ? "NA" : d.transaction_id}
                  </Text>
                  <TimeAgo style={styles.timeText} time={d.created} />
                  {/* <Text style={styles.timeText}>{d.created}</Text> */}
                </View>
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.nameText}> {d.amount} AUD</Text>
              </View>
            </View>
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
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "100",
  },
  flatlist: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  avatar: {
    // width: 10
    marginRight: 10,
    margin: 6,
  },
  textContainer: {
    alignSelf: "center",
  },
  nameText: {
    color: global.COLOR.PRIMARY,
    fontSize: 18,
  },
  timeText: {
    fontSize: 12,
    color: "gray",
  },
});
