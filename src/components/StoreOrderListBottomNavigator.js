import React, {Component} from 'react';
import Icon from "react-native-vector-icons/FontAwesome";
import {Badge, Text, View} from "native-base";
import {inject, observer} from "mobx-react";

@inject('OrderStore')
@observer
export default class StoreOrderListBottomNavigator extends Component {
    render() {
        return (
            <View style={{flexDirection: 'row'}}>
                <Icon name={'shopping-bag'} style={{color: this.props.tintColor}} size={22}/>
                {this.props.OrderStore.pendingOrderCount !== 0 && <Badge style={{scaleX: 0.6, scaleY: 0.6, paddingBottom: 4}} danger><Text>{this.props.OrderStore.pendingOrderCount}</Text></Badge>}
            </View>
        );
    }
}
