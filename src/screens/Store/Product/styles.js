import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({

    // PRODUCT DETAIL
    productImageContainer: {
        flex: 6, flexDirection: 'row', height: 200, justifyContent: 'center', borderColor: '#dedede', borderWidth: 2, alignItems: 'center'
    }, productImage: {
        flex: 6, height: '100%', resizeMode: 'contain'
    }, uploadIcon: {
        flex: 6, fontSize: 50, textAlign: 'center'
    }, productImageLoadingImage: {
        borderColor: 'red', marginBottom: 0, flex: 1
    }, statusCheckBoxContainer: {
        paddingVertical: 10, paddingRight: 10, flex: 10, flexDirection: 'row'
    }
});