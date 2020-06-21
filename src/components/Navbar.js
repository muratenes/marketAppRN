import React, {Component} from "react";
import {Button, Container, Header, Title, Left, Text, Body, Right, Badge} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import {inject, observer} from "mobx-react";
import NavigationService from "../NavigationService";
import {Linking} from 'react-native'
import AsyncStorage from "@react-native-community/async-storage";
import AuthStore from "../store/AuthStore";


@inject("AuthStore", "BasketStore")
@observer
export default class Navbar extends Component {


    componentDidMount(): void {
        //this.props.BasketStore.getBasket()
    }


    render() {
        const {BasketStore} = this.props;
        return (
            <Header>
                <Body>
                    <Title>{this.props.title}</Title>
                </Body>
                <Right>
                    {this.props.AuthStore.user && <Button transparent onPress={() => Linking.openURL(`tel:${this.props.AuthStore.user.store_user.phone}`)}>
                        <Icon name='phone' color={'white'} size={20}/>
                    </Button>}
                    <Button transparent onPress={() => NavigationService.navigate('BasketList')}>
                        <Badge style={{position: 'absolute'}} danger><Text>{BasketStore.basketItems ? BasketStore.basketItems.length  : 0 }</Text></Badge>
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
