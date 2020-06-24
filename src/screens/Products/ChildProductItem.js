import {Image, Text, TouchableOpacity, View} from "react-native";
import {styles_detail} from "./styles_detail";
import {Card} from "native-base";
import React from "react";
import NavigationService from "../../NavigationService";
import {observer} from "mobx-react";

@observer
export default class ChildProductItem extends React.Component {
    render() {
        const { item ,maxWidth} = this.props
        return (
            <TouchableOpacity onPress={() => this._addToBasket(item)} style={[styles_detail.container, {maxWidth}]}>
                <Card>
                    <View style={styles_detail.viewContainer}>
                        <View style={styles_detail.imageViewContainer}>
                            <Image source={{uri: item.image_url}} style={styles_detail.image}/>
                        </View>
                        <View style={styles_detail.textContainer}>
                            <Text style={styles_detail.title}>{item.title}</Text>
                            <View style={styles_detail.price_container}>
                                <Text style={item.discount_price ? styles_detail.priceTextWhenDiscount : styles_detail.priceText}>{item.price} ₺</Text>
                                {item.discount_price && <Text style={styles_detail.discountPriceText}>{item.discount_price} ₺</Text>}
                            </View>
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>
        )
    }

    _addToBasket = (item) => {
        this.props.BasketStore.addToBasket(item.id, 1)
        NavigationService.navigate('BasketList');
    }
}
