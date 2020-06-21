import {Card, CardItem, Input, Item, Left, Right, Text, Thumbnail, View,Button} from "native-base";
import styles from "./styles";
import {TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import BasketStore from "../../store/BasketStore";
import React from "react";

const BasketListItem = ({item, index}) => {
    return (
        <View style={styles.itemStyle}>
            <Card>
                <CardItem style={{flex: 1}}>
                    <View style={{flex: 3}}>
                        <Thumbnail source={{uri: item.product.image_url}}/>
                    </View>
                    <View style={{flexDirection:'row',flex:4}}>
                        <Text style={styles.title}>{item.product.title}</Text>
                    </View>
                    <View style={styles.itemBoxContainer}>
                        <View style={styles.iconContainer}>
                            <Button bordered success small onPress={() => BasketStore.decrementProductItem(item.product.id)}>
                                <Text><Icon name={'minus'} danger size={14}/></Text>
                            </Button>
                        </View>
                        <View style={styles.inputContainer}>
                                <Text style={styles.input}>{BasketStore.basketItems[index].qty}</Text>
                        </View>
                        <View style={styles.iconContainer}>
                            <Button bordered success small onPress={() => BasketStore.addToBasket(item.product.id, 1)}>
                                <Text><Icon name={'plus'} danger size={14}/></Text>
                            </Button>
                        </View>
                    </View>

                </CardItem>

                <CardItem>
                    <Left>
                        <Text style={item.product.discount_price ? styles.priceTextWhenDiscount : styles.priceText}>{item.product.price} ₺</Text>
                        {item.product.discount_price && <Text style={styles.discountPriceText}>{item.product.discount_price} ₺</Text>}
                    </Left>
                    <Right>
                        <TouchableOpacity onPress={() => BasketStore.removeItemFromBasket(item.product.id)}>
                            <Icon name={'trash'} danger size={23}/>
                        </TouchableOpacity>
                    </Right>

                </CardItem>
            </Card>
        </View>
    )
};


onChangeInputText = (item, index, value) => {
    BasketStore.basketItems = BasketStore.basketItems.map((itemData: any) => {
        let qty = parseInt(itemData.id === item.id ? value : itemData.qty);
        qty = !isNaN(qty) ? qty : '';
        return {"id": itemData.id,"product_id":itemData.product.id, "qty": qty, 'price': itemData.price, 'total_price': itemData.total_price, "product": itemData.product};
    });
    BasketStore.hasBasketItemQtyChange = true;
}
export default BasketListItem;