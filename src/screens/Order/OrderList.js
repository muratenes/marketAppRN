import React, {Component} from "react";
import {Container, Header, Content, Accordion, Text, View, Button, Input} from "native-base";
import {FlatList, RefreshControl, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';

import Navbar from "../../components/Navbar";
import {inject, observer} from "mobx-react";
import AuthLoading from "../AuthLoading";
import Icon from "react-native-vector-icons/FontAwesome";
import EmptyOrder from "./EmptyOrder";


@inject("OrderStore")
@observer
export default class OrderList extends Component {

    componentDidMount(): void {
        this.props.OrderStore.getOrders()
    }

    onRefresh = () => {
        this.setState({
            page: 1,
            refreshing: true
        }, () => {
            this.props.OrderStore.getOrders();
        });
    };
    render() {
        const {OrderStore} = this.props;
        if (OrderStore.loading === false) {
            return (
                <Container>
                    <Navbar title={'Sepetim'}/>
                    {OrderStore.orders.length > 0  && <Container>
                        <Content padder>
                            <Accordion
                                refreshing={OrderStore.refreshing}
                                onRefresh={this.onRefresh}
                                dataArray={OrderStore.orders}
                                iconStyle={{color: "green"}}
                                expandedIconStyle={{color: "red"}}
                                renderHeader={this._renderHeader}
                                renderContent={this._renderContent}
                                keyExtractor={item => '' + item.id}
                                key={item => '' + item.id}
                            />
                        </Content>
                    </Container>}
                    {OrderStore.orders.length === 0 &&
                    <EmptyOrder/>
                    }
                </Container>
            );
        } else {
            return (
                <AuthLoading/>
            );
        }

    }

    _renderContent(item) {
        const basketItemRender = item.basket.items.map(basketItemRender => (
            <View style={styles.basketItem}>
                <Text style={styles.basketItemText}>Ürün : {basketItemRender.product.title}</Text>
                <Text style={styles.basketItemText}>Adet :{basketItemRender.qty}</Text>
                <Text style={styles.basketItemText}>Toplam :{basketItemRender.total_price} ₺</Text>
            </View>

        ));
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                {basketItemRender}
            </View>
        );
    }

    _renderHeader(item, expanded) {
        return (
            <View style={{
                flexDirection: "row",
                padding: 14,
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#f6f4f4"
            }}>
                <Text style={{fontWeight: "600"}}>
                    {" "}{<Text>{item.created_at.substring(0, 10)} | {item.total_price} ₺ | {item.status_text}</Text>}
                </Text>
                {expanded
                    ? <Icon style={{fontSize: 18}} name="angle-up"/>
                    : <Icon style={{fontSize: 18}} name="angle-down"/>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    basketItem: {
        flex: 1, flexDirection: 'row', padding: 4
    }, basketItemText: {
        paddingVertical: 4, fontSize: 16, marginRight: 10
    }
})