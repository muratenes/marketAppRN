import React from 'react';
import {Left, Right, Card, CardItem, Thumbnail, Text, Button, Body, View} from 'native-base';
import {StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BasketStore from "../../store/BasketStore";
import NavigationService from "../../NavigationService";
import {max} from "react-native-reanimated";

addToBasket = (item) => {
    BasketStore.addToBasket(item.id, 1)
    NavigationService.navigate('BasketList');
}

const ProductDetailListItem = ({item, maxWidth}) => (
    <TouchableOpacity onPress={() => this.addToBasket(item)} style={[styles.container, {maxWidth}]}>
        <Card>
            <View style={styles.viewContainer}>
                <View style={styles.imageViewContainer}>
                    <Image source={{uri: item.image_url}} style={styles.image}/>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.weightText}>{item.gram}</Text>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                        <Text style={item.discount_price ? styles.priceTextWhenDiscount : styles.priceText}>{item.price} ₺</Text>
                        {item.discount_price && <Text style={styles.discountPriceText}>{item.discount_price} ₺</Text>}
                    </View>
                </View>
            </View>
        </Card>
    </TouchableOpacity>
);
const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        margin: 3, borderRadius: 3
    }, viewContainer: {
        flex: 10, height: 160
    }, imageViewContainer: {
        flex: 4
    }, image: {
        width: '100%', height: '100%', resizeMode: 'contain', position: 'absolute'
    }, textContainer: {
        flex: 2, paddingVertical: 3, paddingHorizontal: 7
    }, title: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#5e5e5e'
    }, weightText: {
        fontSize: 8, color: '#9c9b9b'
    }, priceText: {
        fontSize: 14.5, fontWeight: '600', color: '#757575'
    }, priceTextWhenDiscount: {
        fontSize: 14.5, fontWeight: '600', color: '#d32f2f', textDecorationLine: 'line-through', marginRight: 2
    }, discountPriceText: {
        fontSize: 14.5, fontWeight: '600', color: '#43A047'
    }
});
export default ProductDetailListItem;

