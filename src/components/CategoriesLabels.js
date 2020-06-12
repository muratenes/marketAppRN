import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions, FlatList, TouchableOpacity} from 'react-native';
import {Badge} from 'native-base';
import {inject} from "mobx-react";
import ProductDetailListItem from "../screens/Products/ProductDetailListItem";

@inject("CategoryStore", "ProductStore")
export default class CategoriesLabels extends Component {

    constructor() {
        super();
        this.state = {categories: []}
    }

    async componentDidMount(): void {
        await this.props.CategoryStore.getCategoriesByStore();
        this.setState({categories: this.props.CategoryStore.categories})
    }
    render() {
        return (
            <View style={styles.badgeContainer}>
                {this.state.categories &&
                <ScrollView horizontal={true}
                            decelerationRate={0}
                            snapToAlignment={"center"}
                            showsHorizontalScrollIndicator={false}
                >
                    <FlatList
                        horizontal={false}
                        numColumns={30}
                        renderItem={({item}) => this._renderItem(item)}
                        keyExtractor={item => '' + item.id}
                        data={this.state.categories}
                    />
                </ScrollView>}
            </View>
        );
    }

    _renderItem = (item) => {
        return (
            <TouchableOpacity onPress={async () => {
                if (this.props.ProductStore.selectedCategoryId === item.id) {
                    await this.props.ProductStore.setCurrentCategoryValue(0)
                    await this.props.ProductStore.getProducts(1)
                }else{
                    await this.props.ProductStore.getStoreProductsByCategoryId(item.id,1);
                }
                await this.setState({categories: [...this.props.CategoryStore.categories]})
            }}>
                <Badge style={this.props.ProductStore.selectedCategoryId === item.id ?  styles.selectedBadge : styles.badge}>
                    <Text style={styles.badgeText}>{item.title+"|"+item.id}</Text>
                </Badge>
            </TouchableOpacity>);
    }
}

const styles = StyleSheet.create({
    badgeContainer: {
        paddingHorizontal: 3, paddingVertical: 4, flexDirection: 'row',
    },
    badge: {
        backgroundColor: '#dedede',
    },selectedBadge : {
        backgroundColor: "rgba(13,121,24,0.58)"
    }, badgeText: {
        fontSize: 15, paddingVertical: 4, paddingHorizontal: 5
    },

});