import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import {inject} from "mobx-react";

@inject('AuthStore','UserStore')
export default class LogoutButton extends Component {


    render() {
        return (
            <TouchableOpacity style={styles.buttonContainer} onPress={() => this._logout()}>
                <Icon size={25} name={'ios-exit'}/>
            </TouchableOpacity>
        );
    }

    _logout = async () => {
        await this.props.UserStore.user
        await this.props.AuthStore.removeToken()
    }

}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 10
    }, logoutButtonText: {
        fontSize: 15
    }
});
