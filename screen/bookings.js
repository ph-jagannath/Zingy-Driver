import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import ScrollableTabView from "react-native-scrollable-tab-view";
import PendingTask from "./pendingTask";
import ActiveTask from "../screen/activeTask";
import global from "../global";

export default class bookings extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "My Task",
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
      fontWeight: "bold"
    }
  });
  constructor(props) {
    super(props);
    this.state = {
      my_Task: "tasks"
    };
  }

  render() {
    return (
      <ScrollableTabView
        tabBarBackgroundColor={global.COLOR.PRIMARY}
        tabBarActiveTextColor="#fff"
        tabBarUnderlineStyle={{ backgroundColor: "#fff" }}
        initialPage={1}
        locked={true}
      >
        <ActiveTask tabLabel="TASKS" navigation={this.props.navigation} />
        <PendingTask tabLabel="PENDING" navigation={this.props.navigation} />
      </ScrollableTabView>
    );
  }
}
