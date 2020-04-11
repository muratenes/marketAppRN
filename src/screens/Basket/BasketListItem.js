// import React from 'react';
// import {Left, Right, Card, CardItem, Thumbnail, Text, Item, Input, Label, Button} from 'native-base';
// import {View} from 'react-native';
//
// import {StyleSheet, TouchableOpacity} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import {inject} from "mobx-react";
//
//
// @inject('BasketStore')
// export default class BasketListItem {
//
//     incrementBasketItemQty = (item) => {
//         this.props.BasketStore.addToBasket(item.product.id,1)
//     }
//     decrementBasketItemQty = (item) => {
//         this.props.BasketStore.decrementProductItem(item.product.id)
//     }
//
//     render (){
//         return ({item, index}) => (
//             <View style={styles.itemStyle}>
//                 <Card>
//                     <CardItem style={{flex: 1}}>
//                         <View style={{flex: 3}}>
//                             <Thumbnail source={{uri: item.product.image}}/>
//                         </View>
//                         <View style={{flex: 8}}>
//                             <Text style={styles.title}>{item.product.title}</Text>
//                         </View>
//                         <View style={{flex: 10, flexDirection: 'row', borderColor: 'red', borderWidth: 2}}>
//                             <View style={styles.iconContainer}>
//                                 <TouchableOpacity>
//                                     <Icon name={'minus'} danger size={30}/>
//                                 </TouchableOpacity>
//                             </View>
//                             <View style={{flex: 3}}>
//                                 <Item>
//                                     <Input placeholder={'adet'} style={styles.input} keyboardType={'numeric'} maxLength={30} value={item.qty + ""}
//
//                                     />
//                                 </Item>
//                             </View>
//                             <View style={styles.iconContainer}>
//                                 <TouchableOpacity onPress={() => this.incrementBasketItemQty(item)} >
//                                     <Icon name={'plus'} danger size={30}/>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//
//                     </CardItem>
//
//                     <CardItem>
//                         <Left>
//                             <Text>{item.total_price} ₺ </Text>
//                         </Left>
//                         <Right>
//                             <Icon name={'trash'} danger size={30}/>
//                         </Right>
//
//                     </CardItem>
//                 </Card>
//             </View>
//         );
//     }
// }
//
//
// const styles = StyleSheet.create({
//     itemStyle: {
//         padding: 3
//     }, iconContainer: {
//         flex: 3, paddingVertical: 5, textAlign: 'center', alignItems: 'center', alignContent: 'center'
//     },
//     title: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         textAlign: 'center'
//     }, priceText: {
//         fontWeight: 'bold',
//     },
//     itemDetailContainer: {
//         flexDirection: 'row',
//         flex: 3,
//         backgroundColor: 'black',
//         height: '100%'
//     }, itemQtyContainer: {
//         flex: 5,
//         flexDirection: 'column',
//         borderWidth: 2,
//         borderColor: 'red'
//     }, input: {
//         fontSize: 20,
//         textAlign: 'center'
//     }
// });
//
