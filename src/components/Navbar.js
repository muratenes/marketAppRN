import React, {Component} from "react";
import {Button, Container, Header, Title, Left, Text, Body, Right, Badge} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import {inject} from "mobx-react";
import NavigationService from "../NavigationService";
import AsyncStorage from "@react-native-community/async-storage";


@inject("AuthStore", "BasketStore")
export default class Navbar extends Component {

    componentDidMount(): void {
        this.props.BasketStore.getBasket()
    }

    render() {
        const {BasketStore} = this.props;
        return (
            <Header>
                <Left>
                    <Button transparent>
                        <Icon name='list' color={'white'} size={20}/>
                    </Button>
                </Left>
                <Body>
                    <Title>{this.props.title}</Title>
                </Body>
                <Right>
                    <Button transparent>
                        <Icon name='phone' color={'white'} size={20}/>
                    </Button>
                    <Button transparent onPress={() => NavigationService.navigate('BasketList')}>
                        <Badge style={{position: 'absolute'}} danger><Text>{BasketStore.basketItems.length}</Text></Badge>
                        <Icon name='shopping-basket' color={'white'} size={20}/>
                    </Button>
                    <Button transparent>
                        <Icon name='sign-out' color={'white'} size={20} onPress={() => this.props.AuthStore.removeToken()}/>
                    </Button>
                </Right>
            </Header>
        );
    }
}
