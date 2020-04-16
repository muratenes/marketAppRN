import {Text, View} from "native-base";
import styles from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";
import NavigationService from "../../NavigationService";
import React from "react";

const EmptyBasket = () => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={styles.noItemONBasketText}><Icon size={80} name={'shopping-cart'}/></Text>
            <Text style={styles.noItemONBasketText}>Sepetinizde Ürün Bulunamadı</Text>
            <Text style={styles.productsText} onPress={() => NavigationService.navigate('Home')}> Ürünleri Göster</Text>
        </View>
    );
}

export default EmptyBasket;