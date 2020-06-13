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

@inject("ProductStore", "UserStore", "CategoryStore")
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

    _onChangeText =(text) => {
        this.setState({text}, async function () {
            await this.props.ProductStore.setCurrentCategoryValue(0)
            const newCats = this.props.CategoryStore.categories;
            await this.props.CategoryStore.setCategories(newCats.slice(0,newCats.length))
            await this.props.ProductStore.getProducts(1, this.state.text);
        })
    }

    render() {
        return (
            <View refreshControl={
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
                    onEndReached={this._getMoreProducts}
                    onEndReachedThreshold={.001}
                    onMomentumScrollBegin={() => {
                        this.duringMomentum = false
                    }}
                />
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
                    await this.props.ProductStore.getProducts(this.props.ProductStore.currentPage + 1);
                }
            }
            this.duringMomentum = true;
        }
    }
}
