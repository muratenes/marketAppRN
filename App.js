import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import Router from './src/Router'
import {Provider} from 'mobx-react';
import store from "./src/store/";
import NavigationService from "./src/NavigationService";
import PushNotification from 'react-native-push-notification';

export default class App extends Component {
    componentDidMount(): void {

    }

    sendNotification() {
        PushNotification.localNotification({
            /* iOS and Android properties */
            title: "My Notification Title", // ( optional)
            message: "My Notification Message", // (required)
        });
    }

    render() {
        return (
            <View>
                <Button title={'tikla'} onPress={this.sendNotification}/>
            </View>

            // <Provider {...store}>
            //     <Router
            //         ref={navigatorRef => {
            //             NavigationService.setTopLevelNavigator(navigatorRef);
            //         }}
            //     />
            // </Provider>
        );
    }
}

PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
        console.log("TOKEN:", token);
        console.warn("token",token)
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);

        // process the notification

        // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: "651182115407",

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
    requestPermissions: true
});

const styles = StyleSheet.create({});