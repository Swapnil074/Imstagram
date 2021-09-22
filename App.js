import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as firebase from "firebase";
import { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./components/redux/reducers";
import thunk from "redux-thunk";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "./components/auth/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Main from "./components/main/Main";
import Add from "./components/main/main/Add";
import Save from "./components/main/main/Save";
import Comment from "./components/main/main/Comment";

const store = createStore(rootReducer, applyMiddleware(thunk));

const firebaseConfig = {
  apiKey: "AIzaSyB3O7all7GmRWG4xw0aLjF2VVwCy3O96Ys",
  authDomain: "imstagram-fdeec.firebaseapp.com",
  projectId: "imstagram-fdeec",
  storageBucket: "imstagram-fdeec.appspot.com",
  messagingSenderId: "666938288310",
  appId: "1:666938288310:web:c1880f64fa346f0355de17",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createNativeStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Loading</Text>
        </View>
      );
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="landing"
              component={Landing}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen name="login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="main">
            <Stack.Screen
              name="main"
              component={Main}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="add"
              component={Add}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="save"
              component={Save}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Comment"
              component={Comment}
              navigation={this.props.navigation}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
