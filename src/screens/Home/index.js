import React, {Component} from 'react';
import {StyleSheet, Text, FlatList, ScrollView, View} from 'react-native';
import LogoutButton from "../../components/LogoutButton";
import {Container} from 'native-base';
import {inject, observer} from "mobx-react";
import ProductDetailListItem from "../Products/ProductDetailListItem";
import Navbar from "../../components/Navbar";
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

    renderHeader = () => {
        const {text} = this.state;
        return (
            <View>

            </View>
        )
    };


    render() {
        return (
            <FlatList
                ListFooterComponent={this.renderFooter}
                ListHeaderComponent={this.renderHeader()}
                renderItem={({item}) => <ProductDetailListItem item={item}/>}
                keyExtractor={item => item.id}
                data={this.props.ProductStore.products}

                // onEndReached={this.loadMore}
                // onEndReachedThreshold={0}
                // onMomentumScrollBegin={() => { this.duringMomentum = false }}

                refreshing={this.props.ProductStore.refreshing}
                onRefresh={this.onRefresh}
            />
        );
    }
}