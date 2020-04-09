import React, {Component} from 'react';
import {StyleSheet, Text, FlatList, View, TouchableOpacity, Image} from 'react-native';
import LogoutButton from "../../components/LogoutButton";
import {Container, Content, CardItem, Card, Thumbnail, Icon, Left, Right, Button, Grid, Col} from 'native-base';
import {inject, observer} from "mobx-react";
import ProductDetailListItem from "../Products/ProductDetailListItem";

@inject("ProductStore")
@observer
export default class BasketList extends Component {
    static navigationOptions = {
        headerRight: () => <LogoutButton/>,
    }


    render() {
        return (
            <Container>
             <Text>Sepet</Text>
            </Container>
        );
    }
}