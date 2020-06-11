import {Card, CardItem, Input, Item, Left, Right, Text, Thumbnail, View} from "native-base";
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
                    <View style={{flex: 8}}>
                        <Text style={styles.title}>{item.product.title}</Text>
                    </View>
                    <View style={{flex: 10, flexDirection: 'row'}}>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={() => BasketStore.decrementProductItem(item.product.id)}>
                                <Icon name={'minus'} danger size={30}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 3}}>
                            <Item>
                                <Input placeholder={'adet'} style={styles.input} keyboardType={'numeric'} maxLength={30}
                                       value={BasketStore.basketItems[index].qty + ""}
                                       onChangeText={(value) => this.onChangeInputText(item, index, value)}

                                />
                            </Item>
                        </View>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={() => BasketStore.addToBasket(item.product.id, 1)}>
                                <Icon name={'plus'} danger size={30}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                </CardItem>

                <CardItem>
                    <Left>
                        <Text>{item.total_price} ₺ </Text>
                    </Left>
                    <Right>
                        <TouchableOpacity onPress={() => BasketStore.removeItemFromBasket(item.product.id)}>
                            <Icon name={'trash'} danger size={30}/>
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
        return {"id": itemData.id, "qty": qty, 'price': itemData.price, 'total_price': itemData.total_price, "product": itemData.product};
    });
    BasketStore.hasBasketItemQtyChange = true;
}
export default BasketListItem;