import React, {Component} from 'react';
import {FlatList, ScrollView, View, RefreshControl, StyleSheet} from 'react-native';
import {inject, observer} from "mobx-react";
import StoreProductListItem from "./StoreProductListItem";
import StoreNavbar from "../../../components/StoreNavbar";
import NavigationService from "../../../NavigationService";


@inject("ProductStore", "UserStore")
@observer
export default class ProductList extends Component {

    state = {
        text: ''
    }

    componentDidMount(): void {
        this.props.ProductStore.getProducts();
        const item = {"id": 2, "title": "Yumurta", "active": 1, "price": "0.90", "discount_price": null, "image": "http://192.168.0.21:8000/uploads/products/yumurta.png"};
        NavigationService.navigate('StoreProductDetail', {item})

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
                <StoreNavbar title={'Ürünlerim'}/>
                <FlatList
                    columnWrapperStyle={{justifyContent: 'space-between'}}
                    horizontal={false}
                    numColumns={2}
                    ListFooterComponent={this.renderFooter}
                    renderItem={({item}) => <StoreProductListItem item={item}/>}
                    keyExtractor={item => '' + item.id}
                    data={this.props.ProductStore.products}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    flatList: {
        flex: 1, alignItems: 'flex-start'
    }
});