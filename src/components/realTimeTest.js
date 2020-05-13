import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';


import Echo from 'laravel-echo/dist/echo';
import Socketio from 'socket.io-client';
import AuthStore from "../store/AuthStore";

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
    console.log(AuthStore.token)
    // echo.channel(channelName)
    //     .listen(eventName, event => {
    //         console.log('test ge')
    //         alert('test')
    //     });
    console.log(echo)
    echo.connector.socket.on('connect', () => {
      console.log('bağlandı')
    });

    echo.private('user.' + user.id)
        .listen('PrivateEvent', (e) => {
          console.warn(e);
        });
  }


  render() {
    return (
        <View style={[styles.container, {backgroundColor: this.state.color}]}>
          <Text>test</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countContainer: {
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 5
  },
  count: {
    fontSize: 32
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  color: {
    fontSize: 28,
    padding: 10
  }
});
