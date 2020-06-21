import {StyleSheet} from "react-native";

export const styles_detail = StyleSheet.create({
    container: {
        flex: 0.5,
        margin: 3, borderRadius: 3
    }, viewContainer: {
        flex: 10, height: 220
    }, imageViewContainer: {
        flex: 4
    }, image: {
        width: '100%', height: '100%', resizeMode: 'contain', position: 'absolute'
    }, textContainer: {
        flex: 2, paddingVertical: 3, paddingHorizontal: 7
    }, title: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#5e5e5e'
    }, weightText: {
        fontSize: 8, color: '#9c9b9b'
    }, priceText: {
        fontSize: 13.5, fontWeight: '600', color: '#757575'
    }, priceTextWhenDiscount: {
        fontSize: 14, fontWeight: '600', color: '#d32f2f', textDecorationLine: 'line-through', marginRight: 2
    }, discountPriceText: {
        fontSize: 14, fontWeight: '600', color: '#43A047'
    }
});