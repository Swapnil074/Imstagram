import React from "react";
import { Text, View, Button } from "react-native";

export default function Landing({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Button
        title="Register"
        onPress={() => navigation.navigate("register")}
      />
      <Button title="Login" onPress={() => navigation.navigate("login")} />
    </View>
  );
}
