import React, {Component} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, CardItem, Container, Input, Item, Left, Right, Text, Thumbnail, View, Content, Accordion, Form, Label, Button, H1, H4} from 'native-base';
import {inject, observer} from "mobx-react";
import Navbar from "../../components/Navbar";
import {ScrollView} from 'react-native';

import BasketListItem from "./BasketListItem";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import {API_BASE} from "../../constants";
import {runInAction} from "mobx";
import NavigationService from "../../NavigationService";

@inject("BasketStore", "OrderStore")
@observer
export default class BasketList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            basketItems: [],
            accordionFlex: 1,
            accordionFlexDefaultValue: 1,
            orderNote: '',
            loading: false
        }
    }

    componentDidMount(): void {
        this.props.BasketStore.getBasket();
    }

    showOrHideAccordion = () => {
        let accordionFlex = 1;
        if (this.state.accordionFlex === accordionFlex) {
            accordionFlex = 12;
        } else {
            accordionFlex = 1
        }
        this.setState({
            accordionFlex: accordionFlex
        })

    }

    completeOrder = async () => {
        try {
            this.setState({loading: true})
            const {data} = await axios.post(`${API_BASE}/orders/create`, {orderNote: this.state.orderNote})
            if (!data.status) {
                this.setState({loading: false})
                alert(data.message)
            } else {
                this.props.BasketStore.basket = data.data.basket
                this.props.BasketStore.basketItems = data.data.basket.items
                this.props.OrderStore.getOrders();
                alert('sipariş başarılı şekilde alındı')
                this.setState({loading: false})
                NavigationService.navigate('OrderList')
            }
        } catch (e) {
            this.setState({loading: false})
            alert(e.message)
        }
    }

    render() {
        const {BasketStore} = this.props;
        return (
            <Container>
                <Navbar title={'Sepetim'}/>
                {BasketStore.basketItems.length > 0 && BasketStore.basket &&
                <View style={{flex: 10, flexDirection: 'column'}}>
                    <View style={{flex: this.state.accordionFlex}}>
                        <View style={styles.basketDetailContainer}>
                            <View style={{flex: this.state.accordionFlex === this.state.accordionFlexDefaultValue ? 9 : 2}}>
                                <TouchableOpacity style={{flex: 10, flexDirection: 'row'}} onPress={() => this.showOrHideAccordion()}>
                                    <View style={{flex: 5}}><Text>Toplam Tutar : </Text></View>
                                    <View style={{flex: 5}}><Text style={{fontWeight: 'bold'}}>{BasketStore.basket.total_price} ₺</Text></View>
                                    <View style={{flex: 5, alignItems: 'flex-end', paddingVertical: 4}}><Icon name={this.state.accordionFlex != 4 ? 'arrow-down' : 'arrow-up'} size={15}></Icon></View>
                                </TouchableOpacity>

                            </View>
                            <View style={{flex: this.state.accordionFlex === this.state.accordionFlexDefaultValue ? 0 : 9}}>
                                {this.state.accordionFlex !== this.state.accordionFlexDefaultValue &&
                                <View style={{flex: 1, flexDirection: 'column', height: 100}}>
                                    <View style={{flex: 1}}>
                                        <Input value={this.state.orderNote} placeholder={'Sipariş notunuzu yazabilirsiniz'} onChangeText={(orderNote) => this.setState({orderNote})}/>
                                    </View>
                                    <View style={{flex: 1}}>
                                        <Button success onPress={() => this.completeOrder()} disabled={!!this.state.loading}><Text> Siparişi Tamamla </Text></Button>
                                    </View>
                                </View>
                                }

                            </View>

                        </View>
                    </View>
                    <View style={{flex: 9}}>
                        <ScrollView>
                            <FlatList data={BasketStore.basketItems}
                                      keyExtractor={item => item.id}
                                      renderItem={({item}) => (
                                          this.basketListItem(item)
                                      )}/>
                        </ScrollView>
                    </View>
                </View>}
                {BasketStore.basketItems.length === 0 &&
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={styles.noItemONBasketText}><Icon size={80} name={'shopping-cart'}/></Text>
                    <Text style={styles.noItemONBasketText}>Sepetinizde Ürün Bulunamadı</Text>
                    <Text style={styles.productsText} onPress={() => NavigationService.navigate('Home')}> Ürünleri Göster</Text>
                </View>
                }
            </Container>
        );
    }

    incrementBasketItemQty = (item) => {
        this.props.BasketStore.addToBasket(item.product.id, 1)
    }
    decrementBasketItemQty = (item) => {
        this.props.BasketStore.decrementProductItem(item.product.id)
    }
    removeItemFromBasket = (item) => {
        this.props.BasketStore.removeItemFromBasket(item.product.id)
    }

    basketListItem = (item) => {
        return (
            <View style={styles.itemStyle}>
                <Card>
                    <CardItem style={{flex: 1}}>
                        <View style={{flex: 3}}>
                            <Thumbnail source={{uri: item.product.image}}/>
                        </View>
                        <View style={{flex: 8}}>
                            <Text style={styles.title}>{item.product.title}</Text>
                        </View>
                        <View style={{flex: 10, flexDirection: 'row'}}>
                            <View style={styles.iconContainer}>
                                <TouchableOpacity onPress={() => this.decrementBasketItemQty(item)}>
                                    <Icon name={'minus'} danger size={30}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex: 3}}>
                                <Item>
                                    <Input placeholder={'adet'} style={styles.input} keyboardType={'numeric'} maxLength={30} value={item.qty + ""}

                                    />
                                </Item>
                            </View>
                            <View style={styles.iconContainer}>
                                <TouchableOpacity onPress={() => this.incrementBasketItemQty(item)}>
                                    <Icon name={'plus'} danger size={30}/>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </CardItem>

                    <CardItem>
                        <Left>
                            <Text>{item.total_price} ₺ </Text>
                        </Left>
                        <Right>
                            <TouchableOpacity onPress={() => this.removeItemFromBasket(item)}>
                                <Icon name={'trash'} danger size={30}/>
                            </TouchableOpacity>
                        </Right>

                    </CardItem>
                </Card>
            </View>
        )
    }
    ;

}

const styles = StyleSheet.create({
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