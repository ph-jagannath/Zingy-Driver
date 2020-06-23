import { createAppContainer } from "react-navigation";
import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import bookings from "../screen/bookings";
import cancelBooking from "../screen/cancelBooking";
import transactionHistory from "../screen/transactioHistory";
import notifications from "../screen/notifications";
import setting from "../screen/setting";
import privacyPolicy from "../screen/privacyPolicy";
import termsConditions from "../screen/termsConditions";
import aboutUs from "../screen/aboutUs";
import faqs from "../screen/faqs";
import help from "../screen/help";
import home from "../screen/home";
import UserDrawer from "../component/userDrawer";
import { createStackNavigator } from "react-navigation-stack";
import pendingDetails from "../screen/pendingDetails";
import tracking from "../screen/tracking";
import confirm from "../screen/confirm";
// import taskDetails from "../screen/taskDetails";
import activeTask from "../screen/activeTask";
import shopping from "../screen/shopping";
import taskDetails from "../screen/taskDetails";
import map from "../screen/map";
import chat from "../screen/chat";
import ContactUs from "../screen/contactus";
export default createAppContainer(
  createDrawerNavigator(
    {
      home: createStackNavigator(
        {
          home: { screen: home },
        },

        {
          initialRouteName: "home",
          headerLayoutPreset: "center",
        }
      ),

      bookings: createStackNavigator(
        {
          bookings: { screen: bookings },
          PendingDetails: { screen: pendingDetails },
          Tracking: { screen: tracking },
          Confirm: { screen: confirm },
          activeTask: { screen: activeTask },
          taskDetails: { screen: taskDetails },
          map: { screen: map },
          chat: { screen: chat },
        },

        {
          initialRouteName: "bookings",
          headerLayoutPreset: "center",
        }
      ),

      cancelBooking: createStackNavigator(
        {
          cancelBooking: { screen: cancelBooking },
        },
        {
          initialRouteName: "cancelBooking",
          headerLayoutPreset: "center",
        }
      ),
      transactionHistory: createStackNavigator(
        {
          transactionHistory: { screen: transactionHistory },
        },
        {
          initialRouteName: "transactionHistory",
          headerLayoutPreset: "center",
        }
      ),
      Shopping: createStackNavigator(
        {
          Shopping: { screen: shopping },
        },
        {
          initialRouteName: "Shopping",
          headerLayoutPreset: "center",
        }
      ),
      notifications: createStackNavigator(
        {
          notifications: { screen: notifications },
        },
        {
          initialRouteName: "notifications",
          headerLayoutPreset: "center",
        }
      ),
      setting: createStackNavigator(
        {
          setting: { screen: setting },
          contact: { screen: ContactUs },
          privacyPolicy: { screen: privacyPolicy },
          termsConditions: { screen: termsConditions },
          aboutUs: { screen: aboutUs },
          faqs: { screen: faqs },
          help: { screen: help },
        },
        {
          initialRouteName: "setting",
          headerLayoutPreset: "center",
        }
      ),
    },
    {
      drawerType: "slide",
      unmountInactiveRoutes: true,
      contentComponent: (props) => <UserDrawer {...props} />,
      initialRouteName: "home",
    }
  )
);
