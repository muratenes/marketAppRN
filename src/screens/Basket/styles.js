import {StyleSheet} from "react-native";
export default styles = StyleSheet.create({
    basketDetailContainer: {
        flex: 10, flexDirection: 'column', paddingVertical: 10, paddingHorizontal: 10, borderColor: '#dedede', borderWidth: 2, marginHorizontal: 5, marginVertical: 4
    },
    totalPrice: {
        fontWeight: 'bold'
    },
    itemStyle: {
        padding: 3
    }, iconContainer: {
        flex: 3, paddingVertical: 5, textAlign: 'center', alignItems: 'center', alignContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }, priceText: {
        fontWeight: 'bold',
    },
    itemDetailContainer: {
        flexDirection: 'row',
        flex: 3,
        height: '100%'
    }, itemQtyContainer: {
        flex: 5,
        flexDirection: 'column',
    }, input: {
        fontSize: 20,
        textAlign: 'center'
    }, noItemONBasketText: {
        fontSize: 20,
        color: '#5a5a5a'
    }, productsText: {
        fontSize: 20,
        color: '#a19b9b'
    }
});