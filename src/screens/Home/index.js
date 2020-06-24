import React, {Component} from 'react';
import {Keyboard, StyleSheet, Text, FlatList, ScrollView, View, Dimensions, Image} from 'react-native';
import {inject, observer} from "mobx-react";
import ProductDetailListItem from "../Products/ProductDetailListItem";
import {Header, Item, Button, Input, Icon} from 'native-base';
import {RefreshControl} from 'react-native';
import CategoriesLabels from "../../components/CategoriesLabels";
import ChildProductItem from "../Products/ChildProductItem";

@inject("ProductStore","BasketStore")
@observer
export default class Home extends Component {

    state = {
        text: '',
        maxWidth : 0
    }

    constructor(props) {
        super(props);
        this.textRef = React.createRef();
    }

    componentDidMount(): void {
        this.props.ProductStore.getProducts();
        this.setState({maxWidth : Dimensions.get('window').width / 3})
        //this.props.UserStore.getUserFromSession();
    }

    onRefresh = async () => {
        // await this.props.ProductStore.setCurrentCategoryValue(0);
        // await this.props.ProductStore.setCategories([...this.props.ProductStore.categories]);
        await this.props.ProductStore.getProducts(1);
    };

    renderFooter = () => {
        return (
            <View style={{marginBottom: 200}}>
                {this.props.ProductStore.loading && <Text style={styles.loading}>...yükleniyor...</Text>}
            </View>
        )
    };

    _clearInputText = async () => {
        this.setState({text: ''});
        await this.props.ProductStore.getProducts(1)
    }

    _onChangeText = (text) => {
        this.setState({text}, async function () {
            // await this.props.ProductStore.setCurrentCategoryValue(0)
            // const newCats = this.props.CategoryStore.categories;
            // await this.props.CategoryStore.setCategories(newCats.slice(0, newCats.length))
            await this.props.ProductStore.getProducts(1, this.state.text);
        })
    }

    _onRefreshControl = () => {
        return (
            <RefreshControl
                refreshing={this.props.ProductStore.refreshing}
                onRefresh={this.onRefresh}
            />
        );
    }

    render() {
        return (
            <View style={styles.container} refreshControl={this._onRefreshControl}>
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
                </Header>{this.state.text === '' &&
            <CategoriesLabels/>}
                <FlatList
                    columnWrapperStyle={{alignItems: 'flex-start'}}
                    horizontal={false}
                    numColumns={3}
                    refreshing={this.props.ProductStore.refreshing}
                    onRefresh={this.onRefresh}
                    ListFooterComponent={this.renderFooter}
                    renderItem={({item}) => <ChildProductItem item={item} maxWidth={this.state.maxWidth} BasketStore={this.props.BasketStore}/>}
                    keyExtractor={item => item.id+''}
                    data={this.props.ProductStore.products}
                    onEndReached={this._getMoreProducts}
                    onEndReachedThreshold={15}
                    onMomentumScrollBegin={this._onMomentumScrollBegin}
                />
            </View>
        );
    }

    _onMomentumScrollBegin = () => {
        this.duringMomentum = false;
    }

    _getMoreProducts = async () => {
        if (!this.duringMomentum) {
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

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    loading: {
        textAlign: 'center'
    }
})
