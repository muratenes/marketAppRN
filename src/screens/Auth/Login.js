import React, {Component} from 'react';
import LoginForm from "./LoginForm";
import { Image, StyleSheet ,Dimensions} from 'react-native';
import {Body, Header, Title,View} from "native-base";


export default class Login extends Component {
    render() {
        return (
            <React.Fragment>
                <Header>
                    <Body>
                        <Title>Giriş</Title>
                    </Body>
                </Header>
                <View style={styles.container}>
                    <Image source={require('./../../assets/logo-black.png')} style={styles.stretch}  />
                </View>
                <LoginForm/>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    stretch: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height /3 ,
        resizeMode: 'cover',
    },
})
