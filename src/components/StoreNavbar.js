import React, {Component} from "react";
import {Button, Header, Title, Left, Text, Body, Right, Badge} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import {inject} from "mobx-react";


@inject("AuthStore")
export default class StoreNavbar extends Component {
    render() {
        return (
            <Header>
                <Left>
                    <Button transparent>
                        <Icon name='list' color={'white'} size={20}/>
                    </Button>
                </Left>
                <Body>
                    <Title>{this.props.title} </Title>
                </Body>
                <Right>
                    <Button transparent>
                        <Icon name='sign-out' color={'white'} size={20} onPress={() => this.props.AuthStore.removeToken()}/>
                    </Button>
                </Right>
            </Header>
        );
    }
}
