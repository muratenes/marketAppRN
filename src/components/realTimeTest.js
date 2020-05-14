import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {Toast} from 'native-base';


import Echo from 'laravel-echo/dist/echo';
import Socketio from 'socket.io-client';
import AuthStore from "../store/AuthStore";
import OrderStore from "../store/OrderStore";

export default class realTimeTest extends Component {
    state = {
        onlineCount: 0,
        color: '#f1f1f1'
    };

    constructor(props) {
        super(props);
        const localIp = "192.168.0.21";
        let channelName = 'user-channel';
        let eventName = '.UserEvent';
        const user = {
            "id": 1,
            "name": "ferhat",
            "email": "ahmet@gmail.com",
            "email_verified_at": null,
            "created_at": "2020-05-12T20:20:27.000000Z",
            "updated_at": "2020-05-12T20:20:27.000000Z"
        };
        let echo = new Echo({
            broadcaster: 'socket.io',
            host: `http://${localIp}:6001`,
            client: Socketio,
            auth: {headers: {Authorization: "Bearer " + AuthStore.token}}
        });

        echo.private('user.' + user.id)
            .listen('PrivateEvent', (data) => {
                console.log(data)
                OrderStore.setPendingOrderCount(data.pendingOrderCount);
                OrderStore.getStoreOrders()
                Toast.show({
                    text: "Yeni Siparişin Var !",
                    buttonText: "Tamam",
                    buttonTextStyle: {color: "#008000"},
                    buttonStyle: {backgroundColor: "#5cb85c"}
                })

            });
    }


    render() {
        return (
           <View></View>
        );
    }
}
