import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import {Badge, Button} from 'native-base';
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
            <Button onPress={async () => {
                if (this.props.ProductStore.selectedCategoryId === item.id) {
                    // await this.props.ProductStore.setCurrentCategoryValue(0)
                    await this.props.ProductStore.getStoreProductsByCategoryId(0,1)
                } else {
                    await this.props.ProductStore.getStoreProductsByCategoryId(item.id, 1);
                }
                await this.props.ProductStore.setCategories([...this.props.ProductStore.categories]);
            }} small bordered success style={this.props.ProductStore.selectedCategoryId === item.id ? styles.selectedBadge : styles.badge}>
                    <Text style={styles.badgeText}>{item.title + "|" + item.id}</Text>
            </Button>);
    }
}

const styles = StyleSheet.create({
    badgeContainer: {
        paddingHorizontal: 3, paddingVertical: 4, flexDirection: 'row',
    },
    badge: {
        marginRight: 2
    }, selectedBadge: {
        backgroundColor: "#4CAF50",marginRight: 2
    }, badgeText: {
        fontSize: 12, paddingVertical: 3, paddingHorizontal: 2
    },

});
