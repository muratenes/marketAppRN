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
    }, tableHeaderNoteItemText: {
        fontWeight: 'bold', color: '#FFA000'
    }
    , tableItemContainer: {
        flex: 10, flexDirection: 'row', paddingVertical: 5,
        borderColor: '#e7e6e6', borderBottomWidth: 2, paddingHorizontal: 10
    }, tableContentItem: {
        textAlign: 'center', paddingVertical: 4
    }, tableFooterContainer: {
        flex: 10, flexDirection: 'row', paddingVertical: 5,
        paddingHorizontal: 10, justifyContent: 'flex-end'
    },
    flex3: {flex : 3},
    flex5: {flex : 4},
    flex4: {flex : 5},
    tableFooterApproveButton: {
        textAlign: 'center', justifyContent: 'center', flex: 1, marginRight: 3
    }, tableFooterCompleteButton: {
        textAlign: 'center', justifyContent: 'center', flex: 1
    }, tableItemAddressText: {
        fontSize: 12, color: '#424141', textAlign: 'left'
    }, tableItemNoteText: {
        fontSize: 16, color: '#FFA000', textAlign: 'left'
    }, tableAddressContentItem: {
        flex: 7, textAlign: 'left', paddingVertical: 4
    }
})
