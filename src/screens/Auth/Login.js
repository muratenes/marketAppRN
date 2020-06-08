import React, {Component} from 'react';
import LoginForm from "./LoginForm";
import {Body, Header, Title,Button} from "native-base";


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

