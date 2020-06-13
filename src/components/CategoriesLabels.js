import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions, FlatList, TouchableOpacity} from 'react-native';
import {Badge} from 'native-base';
import {inject, observer} from "mobx-react";

@inject("ProductStore")
@observer
export default class CategoriesLabels extends Component {
    componentDidMount(): void {
        this.props.ProductStore.getCategoriesByStore();
    }
    render() {
        return (
            <View style={styles.badgeContainer}>
                {this.props.ProductStore.categories &&
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
                        data={this.props.ProductStore.categories}
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
                await this.props.ProductStore.setCategories([...this.props.ProductStore.categories]);
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