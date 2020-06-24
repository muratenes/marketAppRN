import React, {Component} from "react";
import {Container, Header, Content, Accordion, Text, View, Button, Input} from "native-base";
import {FlatList, RefreshControl, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';

import Navbar from "../../components/Navbar";
import {inject, observer} from "mobx-react";
import AuthLoading from "../AuthLoading";
import Icon from "react-native-vector-icons/FontAwesome";
import EmptyOrder from "./EmptyOrder";
import OrderStore from "../../store/OrderStore";
import {styles} from "../Store/Order/style";

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
                    <Navbar title={'Siparişlerim'}/>
                    {OrderStore.orders.length > 0 && <Container>
                        <Content padder>
                            <Accordion
                                refreshing={OrderStore.refreshing}
                                onRefresh={this.onRefresh}
                                dataArray={OrderStore.orders}
                                iconStyle={{color: "green"}}
                                expandedIconStyle={{color: "red"}}
                                renderHeader={this._renderHeader}
                                renderContent={this._renderContent}
                                key={item => item.id}
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
                <Container>
                    <Navbar title={'Siparişlerim'}/>
                    <AuthLoading/>
                </Container>
            );
        }

    }

    _renderContent(item) {
        const basketItemRender = item.basket.items.map(basketItemRender => (
            <View style={styles.tableItemContainer}>
                <View style={[styles.tableContentItem, styles.flex5]}><Text>{basketItemRender.product.title}</Text></View>
                <View style={[styles.tableContentItem, styles.flex3]}><Text>{basketItemRender.qty}</Text></View>
                <View style={[styles.tableContentItem, styles.flex3]}><Text>{basketItemRender.total_price} ₺</Text></View>
            </View>

        ));
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={styles.tableHeaderContainer}>
                    <View style={[styles.tableContentItem, styles.flex5]}><Text style={styles.tableHeaderItemText}>Ürün</Text></View>
                    <View style={[styles.tableContentItem, styles.flex3]}><Text style={styles.tableHeaderItemText}>Adet</Text></View>
                    <View style={[styles.tableContentItem, styles.flex3]}><Text style={styles.tableHeaderItemText}>Toplam</Text></View>
                </View>
                {basketItemRender}
            </View>
        );
    }

    _renderHeader(item, expanded) {
        const itemColors = OrderStore.statusList.find(elem => elem.name === item.status);
        return (
            <View style={{
                flexDirection: "row",
                padding: 14,
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#f6f6f6"
            }}>
                <Text style={{fontWeight: "600"}}>
                    {" "}{<Text>{item.created_at.substring(0, 10)} | {item.total_price} ₺
                    | {item.status_text}</Text>}
                </Text>
                {expanded
                    ? <Icon style={{fontSize: 18}} name="angle-up"/>
                    : <Icon style={{fontSize: 18}} name="angle-down"/>}
            </View>
        );
    }
}
