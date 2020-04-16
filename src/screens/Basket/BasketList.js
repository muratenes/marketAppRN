import React, {Component} from 'react';
import {FlatList, RefreshControl, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, CardItem, Container, Input, Item, Left, Right, Text, Thumbnail, View, Content, Accordion, Form, Label, Button, H1, H4} from 'native-base';
import {inject, observer} from "mobx-react";
import Navbar from "../../components/Navbar";
import {ScrollView} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import {API_BASE} from "../../constants";
import NavigationService from "../../NavigationService";
import BasketStore from "../../store/BasketStore";
import styles from "./styles";
import BasketListItem from "./BasketListItem";
import EmptyBasket from "./EmptyBasket";

@inject("BasketStore", "OrderStore")
@observer
export default class BasketList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accordionFlex: 1,
            accordionFlexDefaultValue: 1,
            orderNote: '',
            loading: false,
        }
    }

    componentDidMount(): void {
        this.props.BasketStore.getBasket();
    }


    showOrHideAccordion = () => {
        let accordionFlex = 1;
        accordionFlex = this.state.accordionFlex === accordionFlex ? 12 : 1
        this.setState({
            accordionFlex: accordionFlex
        })
    }

    completeOrder = async () => {
        if (this.props.BasketStore.hasBasketItemQtyChange) {
            await this.props.BasketStore.updateBasketByBasketItems()
        }
        try {
            this.setState({loading: true})
            const {data} = await axios.post(`${API_BASE}/orders/create`, {orderNote: this.state.orderNote})
            if (!data.status) {
                this.setState({loading: false,orderNote:''})
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
                                    <View style={{flex: 4}}><Text>Toplam Tutar : </Text></View>
                                    <View style={{flex: 2}}><Text style={{fontWeight: 'bold'}}>{BasketStore.basket.total_price} ₺</Text></View>
                                    <View style={{flex: 4}}>
                                        {this.props.BasketStore.hasBasketItemQtyChange &&
                                        <Button success small disabled={this.props.BasketStore.loading} onPress={() => this.props.BasketStore.updateBasketByBasketItems()}><Text> Güncelle </Text></Button>}
                                    </View>
                                    <View style={{flex: 2, alignItems: 'flex-end', paddingVertical: 4}}><Icon name={this.state.accordionFlex != 4 ? 'arrow-down' : 'arrow-up'} size={15}></Icon></View>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex: this.state.accordionFlex === this.state.accordionFlexDefaultValue ? 0 : 9}}>
                                {this.state.accordionFlex !== this.state.accordionFlexDefaultValue &&
                                <View style={{flex: 1, flexDirection: 'column', height: 100}}>
                                    <View style={{flex: 1}}>
                                        <Input value={this.state.orderNote} placeholder={'Sipariş notunuzu yazabilirsiniz'} onChangeText={(orderNote) => this.setState({orderNote})}/>
                                    </View>
                                    <View style={{flex: 1}}>
                                        {!this.props.BasketStore.loading &&
                                         <Button success onPress={() => this.completeOrder()} disabled={!!this.state.loading}><Text> Siparişi Tamamla </Text></Button>
                                        }
                                    </View>
                                </View>
                                }
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 9}}>
                        <ScrollView refreshControl={
                            <RefreshControl
                                refreshing={this.props.BasketStore.refreshing}
                                onRefresh={this.props.BasketStore.getBasket}
                            />
                        }>
                            <FlatList data={BasketStore.basketItems}
                                      keyExtractor={item => item.id}
                                      renderItem={({item, index}) => <BasketListItem item={item} index={index}/>}
                            />
                        </ScrollView>
                    </View>
                </View>}
                {BasketStore.basketItems.length === 0 &&
                <EmptyBasket/>
                }
            </Container>
        );
    }

}
