import React from 'react';
import {Left, Right, Card, CardItem, Thumbnail, Text, Button, Body, View} from 'native-base';
import {StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';
import NavigationService from "../../../NavigationService";
import {styles_detail}  from './styles_detail';


const ProductDetailListItem = ({item, maxWidth}) => (
    <TouchableOpacity onPress={() => NavigationService.navigate('StoreProductDetail', {item})} style={[styles_detail.container, {maxWidth}]}>
        <Card>
            <View style={styles_detail.viewContainer}>
                <View style={styles_detail.imageViewContainer}>
                    <Image source={{uri: item.image_url}} style={styles_detail.image}/>
                </View>
                <View style={styles_detail.textContainer}>
                    <Text style={styles_detail.title}>{item.title}</Text>
                    <Text style={styles_detail.weightText}>{item.gram}</Text>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                        <Text style={item.discount_price ? styles_detail.priceTextWhenDiscount : styles_detail.priceText}>{item.price} ₺</Text>
                        {item.discount_price && <Text style={styles_detail.discountPriceText}>{item.discount_price} ₺</Text>}
                    </View>
                </View>
            </View>
        </Card>
    </TouchableOpacity>
);

export default ProductDetailListItem;

