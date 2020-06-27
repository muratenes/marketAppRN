/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AuthStore from "./src/store/AuthStore";
import axios from 'axios';
import {Toast} from "native-base";

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);

axios.interceptors.request.use(request => {
    const token = AuthStore.token;
    request.headers.common['Accept'] = "application/json";
    if (token) {
        request.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return request;
});

axios.interceptors.response.use((response) => {
    if (response.status === 200) {
        if (response.data.hasOwnProperty("message")) {
            if (!response.data.status) {
                Toast.show({
                    text: response.data.message,
                    buttonText: "Tamam",
                    buttonTextStyle: {color: "#008000"},
                    buttonStyle: {backgroundColor: "#5cb85c"},
                    duration: 1500
                })
            }
        }

    }
    return response;
}, (error) => {
    if (error.response.status === 400) {
        if (error.response.data.hasOwnProperty("validation_errors")) {
            var errorText = "";
            var validationErrors = error.response.data.validation_errors;
            var keys = Object.keys(validationErrors);
            Object.keys(validationErrors).forEach(function (key) {
                errorText = validationErrors[key];
            });
            Toast.show({
                text: errorText,
                buttonText: "Tamam",
                buttonTextStyle: {color: "#008000"},
                buttonStyle: {backgroundColor: "#5cb85c"},
                duration: 1500
            })
            // alert(errorText)
        }
    }
    return Promise.reject(error.message);
});
