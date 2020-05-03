import React, {Component} from 'react';
import {Keyboard, StyleSheet, Text, FlatList, ScrollView, View, Dimensions} from 'react-native';
import {inject, observer} from "mobx-react";
import ProductDetailListItem from "../Products/ProductDetailListItem";
import Navbar from "../../components/Navbar";
import {Header, Item, Button, Input, Icon} from 'native-base';
import {RefreshControl} from 'react-native';
import UserStore from "../../store/UserStore";
// import Icon from "react-native-vector-icons/FontAwesome";

@inject("ProductStore", "UserStore")
@observer
export default class Home extends Component {

    state = {
        text: '',
    }

    constructor(props) {
        super(props);
        this.textRef = React.createRef();
    }

    componentDidMount(): void {
        this.props.ProductStore.getProducts();
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
        Keyboard.dismiss
    }

    _onChangeText = (text) => {
        const newData = d
        this.setState({text});
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
                            placeholder="kola,süt,ekmek vb." onChangeText={text => this._onChangeText} value={this.state.text}/>
                        {this.state.text.length > 0 && <Icon name="close" size={30} onPress={(text) => this._clearInputText}/>}
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
                <FlatList
                    columnWrapperStyle={{alignItems: 'flex-start'}}
                    horizontal={false}
                    numColumns={3}
                    ListFooterComponent={this.renderFooter}
                    renderItem={({item}) => <ProductDetailListItem item={item} maxWidth={Dimensions.get('window').width / 3}/>}
                    keyExtractor={item => '' + item.id}
                    data={this.props.ProductStore.products}
                />
            </ScrollView>
        );
    }
}
