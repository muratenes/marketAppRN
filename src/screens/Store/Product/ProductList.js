import React, {Component} from 'react';
import {FlatList, ScrollView, View, RefreshControl, StyleSheet, Dimensions} from 'react-native';
import {inject, observer} from "mobx-react";
import {Fab, Button, Text} from 'native-base';


import StoreProductListItem from "./StoreProductListItem";
import StoreNavbar from "../../../components/StoreNavbar";
import NavigationService from "../../../NavigationService";
import Icon from "react-native-vector-icons/FontAwesome";
import {ROLE_STORE} from "../../../constants";
import ProductDetailListItem from "../../Products/ProductDetailListItem";


@inject("ProductStore", "UserStore", "OrderStore", "AuthStore")
@observer
export default class ProductList extends Component {

    state = {
        text: '',
        active: false
    }

    componentDidMount(): void {
        this.props.ProductStore.getProducts();

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
        return (
            <View style={{marginBottom: 200}}>
                {this.props.ProductStore.loading && <Text style={styles.loading}>...yükleniyor...</Text>}
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
                <View refreshControl={
                    <RefreshControl
                        refreshing={this.props.ProductStore.refreshing}
                        onRefresh={this.onRefresh}
                    />
                }>
                    <StoreNavbar title={'Ürünlerim'}/>
                    <FlatList
                        columnWrapperStyle={{alignItems: 'flex-start'}}
                        horizontal={false}
                        numColumns={3}
                        refreshing={this.props.ProductStore.refreshing}
                        onRefresh={this.onRefresh}
                        ListFooterComponent={this.renderFooter}
                        renderItem={({item}) => <StoreProductListItem item={item} maxWidth={Dimensions.get('window').width / 3}/>}
                        keyExtractor={item => '' + item.id}
                        data={this.props.ProductStore.products}
                        onEndReached={this._getMoreProducts}
                        onEndReachedThreshold={.3}
                        onMomentumScrollBegin={() => {
                            this.duringMomentum = false
                        }}
                    />
                </View>
                {this.props.AuthStore.user.role_id === ROLE_STORE &&
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{backgroundColor: '#5067FF'}}
                    position="bottomRight"
                    onPress={this.redirectToAddNewProductPage}>
                    <Icon name="plus"/>
                </Fab>
                }
            </View>
        );
    }

    _getMoreProducts = async () => {
        if (!this.duringMomentum) {
            console.log('çalıştı', this.props.ProductStore.selectedCategoryId, this.props.ProductStore.currentPage)
            if (this.props.ProductStore.selectedCategoryId) {
                await this.props.ProductStore.getStoreProductsByCategoryId(this.props.CategoryStore.selectedCategoryId, this.props.ProductStore.currentPage + 1);
            } else {
                if (this.props.ProductStore.selectedCategoryId !== undefined) {
                    await this.props.ProductStore.getProducts(this.props.ProductStore.currentPage + 1, this.state.text);
                }
            }
            this.duringMomentum = true;
        }
    }
}