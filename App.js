import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, PushNotificationIOS, DeviceEventEmitter} from 'react-native';
import {Root} from 'native-base';
import PushNotification from 'react-native-push-notification';
import firebase from 'react-native-firebase';
import {Provider} from "mobx-react";
import Router from "./src/Router";
import NavigationService from "./src/NavigationService";
import store from './src/store/';
import AuthStore from "./src/store/AuthStore";
import PushNotificationAndroid from 'react-native-push-notification'
import FirebaseService from './src/FirebaseService'
import SocketService from "./src/SocketService";

export default class App extends Component {
    componentDidMount() {
        //FirebaseService.sendTestLocalNotification();
    }

    render() {
        return (
            <Root>
                <Provider {...store}>
                    <Router
                        ref={navigatorRef => {
                            NavigationService.setTopLevelNavigator(navigatorRef);
                        }}
                    />
                </Provider>
            </Root>
        );
    }
}
SocketService.storeOrderSocketIoInitialize();
FirebaseService.checkFirebasePermissions()
FirebaseService.firebaseInitalize()
