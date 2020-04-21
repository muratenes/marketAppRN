import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    basketItem: {
        flex: 1, flexDirection: 'row', padding: 4
    }, basketItemText: {
        paddingVertical: 4, fontSize: 16, marginRight: 10
    }, tableHeaderContainer: {
        flex: 10, flexDirection: 'row', paddingVertical: 5,
        borderColor: '#e7e6e6', borderBottomWidth: 2, paddingHorizontal: 10
    }, tableHeaderItem: {
        flex: 3, textAlign: 'center', paddingVertical: 4
    }, tableHeaderItemText: {
        fontWeight: 'bold'
    }, tableItemContainer: {
        flex: 10, flexDirection: 'row', paddingVertical: 5,
        borderColor: '#e7e6e6', borderBottomWidth: 2, paddingHorizontal: 10
    }, tableContentItem: {
        flex: 3, textAlign: 'center', paddingVertical: 4
    }, tableFooterContainer: {
        flex: 10, flexDirection: 'row', paddingVertical: 5,
        paddingHorizontal: 10, justifyContent: 'flex-end'
    }, tableFooterApproveButton: {
        textAlign: 'center', justifyContent: 'center', flex: 1, marginRight: 3
    }, tableFooterCompleteButton: {
        textAlign: 'center', justifyContent: 'center', flex: 1
    }
})