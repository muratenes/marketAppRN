import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({

    // PRODUCT DETAIL
    productImageContainer: {
        flex: 5,
        height: 200,
        borderWidth: 2,
        borderColor: '#ddd',
        alignContent: 'center', justifyContent: 'center', alignItems: 'center'
    }, productImage: {
        flex: 1
    }, statusCheckBoxContainer: {
        paddingVertical: 10, paddingRight: 10, flex: 10, flexDirection: 'row'
    }, uploadIcon: {
        fontSize: 40, justifyContent: 'center', alignContent: 'center', marginBottom: 60,
    }, productImageLoadingImage: {
        borderColor: 'red', marginBottom: 90,
    }
});