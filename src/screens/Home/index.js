import React, {Component} from 'react';
import {StyleSheet, Text, FlatList, ScrollView, View} from 'react-native';
import LogoutButton from "../../components/LogoutButton";
import {Container} from 'native-base';
import {inject, observer} from "mobx-react";
import ProductDetailListItem from "../Products/ProductDetailListItem";
import Navbar from "../../components/Navbar";RefreshControl
import {RefreshControl} from 'react-native';

import AuthLoading from "../AuthLoading";

@inject("ProductStore")
@observer
export default class Home extends Component {

    state = {
        text: ''
    }

    componentDidMount(): void {
        this.props.ProductStore.getProducts();
    }

    onRefresh = () => {
        this.setState({
            page: 1,
            refreshing: true
        }, () => {
            this.props.ProductStore.getProducts();
        });
    };

    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View style={{
                paddingVertical: 20
            }}>
            </View>
        )
    };


    render() {
        return (
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={this.props.ProductStore.refreshing}
                    onRefresh={this.onRefresh}
                />
            }>
                <Navbar title={'Ürünler'}/>
                <FlatList
                    ListFooterComponent={this.renderFooter}
                    renderItem={({item}) => <ProductDetailListItem item={item}/>}
                    keyExtractor={item => ''+item.id}
                    data={this.props.ProductStore.products}
                    //refreshing={this.props.ProductStore.refreshing}
                    //onRefresh={this.onRefresh}
                />
            </ScrollView>
        );
    }
}