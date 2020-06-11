import React, {Component} from 'react';
import {Keyboard, StyleSheet, Text, FlatList, ScrollView, View, Dimensions} from 'react-native';
import {inject, observer} from "mobx-react";
import ProductDetailListItem from "../Products/ProductDetailListItem";
import Navbar from "../../components/Navbar";
import {Header, Item, Button, Input, Icon} from 'native-base';
import {RefreshControl} from 'react-native';
import UserStore from "../../store/UserStore";
import CategoriesLabels from "../../components/CategoriesLabels";
// import Icon from "react-native-vector-icons/FontAwesome";

@inject("ProductStore", "UserStore","CategoryStore")
@observer
export default class Home extends Component {

    state = {
        text: '',
        all_products: []
    }

    constructor(props) {
        super(props);
        this.textRef = React.createRef();
    }

    async componentDidMount(): void {
        await this.props.ProductStore.getProducts();
        this.setState({all_products: this.props.ProductStore.products})
        //this.props.UserStore.getUserFromSession();
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

    _clearInputText = () => {
        this.setState({text: ''});
        this.props.ProductStore.products = this.state.all_products;
    }

    _onChangeText = (text) => {
        this.setState({text})
        const newData = this.state.all_products.filter(item => {
            const listItem = `${item.title.toLowerCase()}`;

            return listItem.indexOf(text.toLowerCase()) > -1;
        });
        this.props.ProductStore.products = newData;
    }

    render() {
        return (
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={this.props.ProductStore.refreshing}
                    onRefresh={this.onRefresh}
                />
            }>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="search" size={23}/>
                        <Input
                            ref={this.textRef}
                            placeholder="kola,süt,ekmek vb." onChangeText={text => this._onChangeText(text)} value={this.state.text}/>
                        {this.state.text.length > 0 && <Icon name="close" size={30} onPress={this._clearInputText}/>}
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
                <CategoriesLabels/>
                <FlatList
                    columnWrapperStyle={{alignItems: 'flex-start'}}
                    horizontal={false}
                    numColumns={2}
                    ListFooterComponent={this.renderFooter}
                    renderItem={({item}) => <ProductDetailListItem item={item} maxWidth={Dimensions.get('window').width / 3}/>}
                    keyExtractor={item => '' + item.id}
                    data={this.props.ProductStore.products}
                />
            </ScrollView>
        );
    }
}
