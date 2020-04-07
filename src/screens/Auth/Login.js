import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LoginForm from "./LoginForm";
import {Body, Header, Title} from "native-base";


export default class Login extends Component {
    render() {
        return (
            <React.Fragment>
                <Header>
                    <Body>
                        <Title>Giriş</Title>
                    </Body>
                </Header>
                <LoginForm/>
            </React.Fragment>
        );
    }
}

