import * as React from "react";
import { Alert } from "react-native";

const createTwoButtonAlert = () => {
    Alert.alert(
    "Alert Title",
    "My Alert Msg",
    console.log('jean')
    [
        {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: false }
    );
}
export default createTwoButtonAlert;