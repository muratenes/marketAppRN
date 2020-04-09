import React, {Component} from 'react';
import {StyleSheet, Text, FlatList, View, TouchableOpacity, Image} from 'react-native';
import LogoutButton from "../../components/LogoutButton";
import MovieListItem from "./MovieListItem";
import {Container, Content, CardItem, Card, Thumbnail, Icon, Left, Right,Button,Grid,Col} from 'native-base';
import {inject, observer} from "mobx-react";
import ProductDetailListItem from "../Products/ProductDetailListItem";

@inject("ProductStore")
@observer
export default class Home extends Component {
    static navigationOptions = {
        headerRight: () => <LogoutButton/>,
    }

    componentDidMount(): void {
        this.props.ProductStore.getProducts();
    }

    renderContactsItem = ({item, index}) => {
        return (
            <TouchableOpacity>
                <Card>
                    <CardItem>
                        <Thumbnail source={{uri: item.image}}/>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text note>{item.desc}</Text>
                    </CardItem>

                    <CardItem cardBody>
                        <Image style={{resizeMode: 'cover'}} source={{uri: item.image}}/>
                    </CardItem>

                    <CardItem>
                        <Left>
                            <Text style={styles.priceText}> Adet Fiyatı : {item.price} ₺</Text>
                        </Left>
                        <Right>
                            <Icon name={'ios-basket'} style={{color: 'black'}} size={190}/>
                        </Right>

                    </CardItem>
                </Card>
            </TouchableOpacity>
        )
    };

    render() {
        const {ProductStore} = this.props;
        return (
            <Container>
                <Content>
                    <View>
                        <FlatList data={ProductStore.products}
                                  keyExtractor={item => item.id}
                                  renderItem={this.renderContactsItem}
                        />
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold'
    }, priceText: {
        fontWeight: 'bold'
    }
});