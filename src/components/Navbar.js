import React, {Component} from "react";
import {Button, Container, Header, Title,Left,Text,Body,Right} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import {inject} from "mobx-react";

@inject("AuthStore")
export default class Navbar extends Component {
    render() {
        return (
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='list' color={'white'} size={20} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Header</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='phone' color={'white'} size={20} />
                        </Button>
                        <Button transparent>
                            <Icon name='shopping-basket' color={'white'} size={20} />
                        </Button>
                        <Button transparent>
                            <Icon name='sign-out' color={'white'} size={20} onPress={() =>  this.props.AuthStore.removeToken()} />
                        </Button>
                    </Right>
                </Header>
        );
    }
}
