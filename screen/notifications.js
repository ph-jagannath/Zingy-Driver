import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableWithoutFeedback
} from "react-native";
import { Icon, Avatar } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import global from "../global";
import TimeAgo from "react-native-timeago";
import axios from "axios";
import moment from "moment";

export default class notifications extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Notifications",
    headerStyle: {
      backgroundColor: global.COLOR.PRIMARY
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
      <TouchableOpacity onPress={() => {}}>
        <Text style={{ color: "#fff", marginHorizontal: 10, fontSize: 16 }}>
          Clear All
        </Text>
      </TouchableOpacity>
    ),

    headerTintColor: "#fff",

    headerTitleStyle: {
      fontWeight: "bold"
    }
  });
  constructor(props) {
    super(props);
    this.getData();
    this.state = {
      data: []
    };
  }

  getData = () => {
    this.setState({
      buttonLoading: true
    });
    // this.props.navigation.navigate("UserApp");
    axios({
      method: "post",
      url: "notification_list_driver",
      data: {
        user_id: global.USER.user_id,
        language: global.CONSTANT.language,
        type: "2"
      }
    }).then(
      function(response) {
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
          renderItem={({ item: d }) => (
            <View style={styles.flatlist}>
              <View style={styles.flexContainer}>
                <View style={styles.avatarContainer}>
                  <Avatar
                    rounded
                    size={70}
                    source={{
                      uri: !d.img
                        ? global.ASSETS.PROFILE
                        : d.img == ""
                        ? global.ASSETS.PROFILE
                        : d.img
                    }}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.nameText}>{d.name}</Text>
                  <Text style={styles.messageText}>{d.message}</Text>
                </View>
                <View style={styles.dayContainer}>
                  <TimeAgo style={styles.messageText} time={d.created} />
                </View>
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
    justifyContent: "center"
  },
  flatlist: {
    backgroundColor: "rgba(187,187,187,10)",
    borderBottomColor: "#fff",
    borderBottomWidth: 1
  },
  avatarContainer: {
    marginVertical: 10
    // margin: 10
    // marginHorizontal: 10
  },
  nameText: {
    color: global.COLOR.PRIMARY,
    fontSize: 20
  },
  messageText: {
    fontSize: 16,
    color: "gray"
  },
  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10
  },
  textContainer: {
    alignSelf: "center",
    width: 200
  },
  dayContainer: {
    alignSelf: "center",
    marginTop: -40
  }
});
