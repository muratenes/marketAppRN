import {Text, View} from "native-base";
import styles from "./../Basket/styles";
import Icon from "react-native-vector-icons/FontAwesome";
import NavigationService from "../../NavigationService";
import React from "react";

const EmptyOrder = () => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={styles.noItemONBasketText}><Icon size={80} name={'tag'}/></Text>
            <Text style={styles.noItemONBasketText}>Henüz Siparişin Yok</Text>
            <Text style={styles.productsText} onPress={() => NavigationService.navigate('Home')}> Ürünleri Göster</Text>
        </View>
    );
}

export default EmptyOrder;