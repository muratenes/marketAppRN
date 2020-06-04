import React, {Component} from 'react';
import {FlatList, ScrollView, View, RefreshControl, StyleSheet} from 'react-native';
import {inject, observer} from "mobx-react";
import {Fab, Button,Text} from 'native-base';


import StoreProductListItem from "./StoreProductListItem";
import StoreNavbar from "../../../components/StoreNavbar";
import NavigationService from "../../../NavigationService";
import Icon from "react-native-vector-icons/FontAwesome";


@inject("ProductStore", "UserStore","OrderStore")
@observer
export default class ProductList extends Component {

    state = {
        text: '',
        active: false
    }

    componentDidMount(): void {
        this.props.ProductStore.getStoreProducts();
        const item = {"id": 23, "title": "Yumurta", "active": 1, "price": "0.90", "discount_price": null, "image": "http://192.168.0.21:8000/uploads/products/yumurta.png","image_url": "http://192.168.0.21:8000/uploads/products/yumurta.png"};
        // NavigationService.navigate('StoreProductDetail', {item})
       // this.redirectToAddNewProductPage()

    }

    onRefresh = () => {
        this.setState({
            page: 1,
            refreshing: true
        }, () => {
            this.props.ProductStore.getStoreProducts();
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
    redirectToAddNewProductPage = () => {
        const item = {"id": 0, "title": "", "active": 1, "price": "0", "discount_price": null, "image": ""};
        NavigationService.navigate('StoreProductDetail', {item})
    }

    render() {
        return (
            <View style={{flex: 1}}>
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
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{backgroundColor: '#5067FF'}}
                    position="bottomRight"
                    onPress={this.redirectToAddNewProductPage}>
                    <Icon name="plus"/>
                </Fab>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    flatList: {
        flex: 1, alignItems: 'flex-start'
    }
});
