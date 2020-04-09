import React from 'react';
import {Left, Right, Card, CardItem, Thumbnail, Image, Text} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';



const ProductDetailListItem = ({item, index}) => (
    <TouchableOpacity>
        <Card>
            <CardItem>
                <Thumbnail source={{uri: item.image}}/>
                <Text style={styles.title}>{item.title}</Text>
                <Text note>{item.desc}</Text>
            </CardItem>

            <CardItem>
                <Left>
                    <Text style={styles.priceText}> Adet Fiyatı : {item.price} ₺</Text>
                </Left>
                <Right>
                    <Icon name={'shopping-basket'} style={{color: 'black'}} size={30}/>
                </Right>

            </CardItem>
        </Card>
    </TouchableOpacity>
);
const styles = StyleSheet.create({
    title: {
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold'
    }, priceText: {
        fontWeight: 'bold'
    }
});
export default ProductDetailListItem;

