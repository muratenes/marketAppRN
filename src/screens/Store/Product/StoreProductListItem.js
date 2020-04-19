import React from 'react';
import {Left, Right, Card, CardItem, Thumbnail, Image, Text} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';
import NavigationService from "../../../NavigationService";


const StoreProductListItem = ({item}) => (
    <TouchableOpacity style={styles.card} onPress={() => NavigationService.navigate('StoreProductDetail',{ item }) }>
        <Card>
            <CardItem>
                <Thumbnail source={{uri: item.image_url}}/>
                <Text style={styles.title}>{item.title}</Text>
            </CardItem>
            <CardItem>
                <Left>
                    <Text style={styles.priceText}> Fiyat : {item.price} ₺</Text>
                </Left>
            </CardItem>
        </Card>
    </TouchableOpacity>
);
const styles = StyleSheet.create({
    title: {
        padding: 6,
        fontSize: 14,
        fontWeight: 'bold'
    }, priceText: {
        fontWeight: 'bold'
    }, card: {
        flex: 0.5
    }
});
export default StoreProductListItem;

