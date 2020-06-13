import {inject, observer} from "mobx-react";
import React, {Component} from "react";
import {Accordion, Container, Content, Text, View, Button} from "native-base";
import AuthLoading from "../../AuthLoading";
import Icon from "react-native-vector-icons/FontAwesome";
import {styles} from "./style";
import OrderStore from "../../../store/OrderStore";
import StoreNavbar from "../../../components/StoreNavbar";
import StoreEmptyOrder from "./StoreEmptyOrder";
import {TouchableOpacity} from "react-native";
import NavigationService from "../../../NavigationService";

@inject("OrderStore")
@observer
export default class StoreOrderList extends Component {

    componentDidMount(): void {
        this.props.OrderStore.getStoreOrders()
    }

    onRefresh = () => {
        this.setState({
            page: 1,
            refreshing: true
        }, () => {
            this.props.OrderStore.getStoreOrders();
        });
    };

    render() {
        const {OrderStore} = this.props;
        if (OrderStore.loading === false) {
            return (
                <Container>
                    <StoreNavbar title={'Siparişlerim'}/>
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
                    <StoreEmptyOrder/>
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
        const basketItemRender = item.basket.items.map(basketItem => (
            <View style={styles.tableItemContainer}>
                <View style={styles.tableContentItem}><TouchableOpacity onPress={() => NavigationService.navigate('StoreProductDetail', {item: basketItem.product})}><Text>{basketItem.product.title}</Text></TouchableOpacity></View>
                <View style={styles.tableContentItem}><Text>{basketItem.qty}</Text></View>
                <View style={styles.tableContentItem}><Text>{basketItem.total_price} ₺</Text></View>
            </View>

        ));
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                {item.note !== null && <View style={styles.tableHeaderContainer}>
                    <View style={styles.tableHeaderItem}><Text style={styles.tableHeaderNoteItemText}>Not</Text></View>
                    <View style={styles.tableAddressContentItem}><Text style={styles.tableItemNoteText}>{item.note}</Text></View>
                </View>}
                <View style={styles.tableHeaderContainer}>
                    <View style={styles.tableHeaderItem}><Text style={styles.tableHeaderItemText}>Adres</Text></View>
                    <View style={styles.tableAddressContentItem}><Text style={styles.tableItemAddressText}>{item.user.address}</Text></View>
                </View>
                <View style={styles.tableHeaderContainer}>
                    <View style={styles.tableHeaderItem}><Text style={styles.tableHeaderItemText}>Ürün</Text></View>
                    <View style={styles.tableHeaderItem}><Text style={styles.tableHeaderItemText}>Adet</Text></View>
                    <View style={styles.tableHeaderItem}><Text style={styles.tableHeaderItemText}>Toplam</Text></View>
                </View>
                {basketItemRender}
                <View style={styles.tableFooterContainer}>
                    <Button small info style={styles.tableFooterApproveButton} disabled={item.status === OrderStore.STATUS_ONAYLANDI || item.status === OrderStore.STATUS_TAMAMLANDI}>
                        <Text onPress={() => OrderStore.updateOrderStatus(item.id, OrderStore.STATUS_ONAYLANDI)}>Onayla</Text>
                    </Button>
                    <Button small success style={styles.tableFooterCompleteButton} disabled={item.status === OrderStore.STATUS_TAMAMLANDI}
                            onPress={() => OrderStore.updateOrderStatus(item.id, OrderStore.STATUS_TAMAMLANDI)}>
                        <Text>Tamamla </Text>
                    </Button>
                </View>
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
                backgroundColor: itemColors['backColor']
            }}>
                <Text style={{fontWeight: "600"}}>
                    {<Text style={{color: itemColors['color']}}>{item.created_at.substring(5, 16)} | {item.total_price} ₺ | {item.status_text}</Text>}
                </Text>
                {expanded ? <Icon style={{fontSize: 18}} name="angle-up"/> : <Icon style={{fontSize: 18}} name="angle-down"/>}
            </View>
        );
    }
}

