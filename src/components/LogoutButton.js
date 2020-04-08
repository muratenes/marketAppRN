import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import {inject} from "mobx-react";

@inject('AuthStore')
export default class LogoutButton extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.buttonContainer}
                              onPress={() =>  this.props.AuthStore.removeToken()}
            >
                <Icon size={25} name={'ios-exit'}/>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 10
    }, logoutButtonText: {
        fontSize: 15
    }
});