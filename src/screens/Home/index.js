import React, {Component} from 'react';
import {StyleSheet, Text, FlatList, View, TouchableOpacity, Image} from 'react-native';
import LogoutButton from "../../components/LogoutButton";
import {Container, Content, CardItem, Card, Thumbnail, Icon, Left, Right, Button, Grid, Col} from 'native-base';
import {inject, observer} from "mobx-react";
import ProductDetailListItem from "../Products/ProductDetailListItem";
import Navbar from "../../components/Navbar";

@inject("ProductStore")
@observer
export default class Home extends Component {

    componentDidMount(): void {
        this.props.ProductStore.getProducts();
    }

    render() {
        const {ProductStore} = this.props;
        return (
            <Container>
                <Navbar/>
                    <FlatList data={ProductStore.products}
                              keyExtractor={item => item.id}
                              renderItem={({item}) => <ProductDetailListItem item={item}/>}
                    />
            </Container>
        );
    }
}