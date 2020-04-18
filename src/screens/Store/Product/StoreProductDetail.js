import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Content, Form, Item, Label, Input, Card, Picker, Button, Spinner, CheckBox, Body, Image, Thumbnail} from 'native-base';
import {Formik} from "formik";
import axios from "axios";
import {API_BASE} from "../../../constants";
import {convertToFormData, showAlertDialog} from "../../../helpers/helpers";
import {inject} from "mobx-react";
import NavigationService from "../../../NavigationService";

@inject('ProductStore')
export default class StoreProductDetail extends Component {
    static navigationOptions = ({navigation}) => {
        const item = navigation.getParam('item');
        return {
            title: `${item.title}`
        }
    };
    _handleSubmit = async (getData, bag) => {
        const {goBack} = this.props.navigation;
        try {
            const requestData = convertToFormData(getData);
            const productId = this.props.navigation.getParam('item').id;
            const {data} = await axios.post(`${API_BASE}/store/updateStoreProduct/${productId}`, requestData);
            if (data.status) {
                this.props.ProductStore.products = data.data;
                goBack();
            } else {
                alert(data.message)
            }


        } catch (e) {
            alert(data.message)
        }
    };


    render() {
        const item = this.props.navigation.getParam('item');
        return (
            <Content>
                <Card style={{alignContent: 'center'}}>
                    <View style={{flex: 10}}>
                        <View style={{flex: 5}}>
                            <Thumbnail source={{uri: item.image}} style={{width: 200, height: 200}}/>
                        </View>
                        <View style={{flex: 5}}></View>
                    </View>

                </Card>
                <Formik
                    initialValues={{
                        title: item.title,
                        price: '' + item.price,
                        discount_price: '' + item.discount_price === null ? '' : item.discount_price,
                        active: item.active == 1
                    }}
                    onSubmit={this._handleSubmit}
                >
                    {({
                          values,
                          handleChange,
                          handleSubmit,
                          errors,
                          touched,
                          setFieldTouched,
                          isValid,
                          isSubmitting,
                          setFieldValue
                      }) => (
                        <Card>
                            <Content style={{padding: 10}}>
                                <Item error={errors.title && touched.title} fixedLabel>
                                    <Label>Ürün Adı</Label>
                                    <Input
                                        returnKeyType={'next'}
                                        onSubmitEditing={() => this.price._root.focus()}
                                        onChangeText={handleChange('title')}
                                        value={values.title}
                                        onBlur={() => setFieldTouched('title')}
                                        autoCorrect={false}
                                    />

                                    {(errors.title && touched.title) &&
                                    <Text style={{color: 'red'}}>{errors.title}</Text>}
                                </Item>
                                <Item error={errors.price && touched.price} fixedLabel>
                                    <Label>Ürün Fiyatı</Label>
                                    <Input
                                        ref={ref => this.price = ref}
                                        onSubmitEditing={() => this.discount_price._root.focus()}
                                        returnKeyType={'next'}
                                        onChangeText={handleChange('price')}
                                        value={values.price}
                                        onBlur={() => setFieldTouched('price')}
                                        keyboardType={'numeric'}
                                    />

                                    {(errors.price && touched.price) &&
                                    <Text style={{color: 'red'}}>{errors.price}</Text>}
                                </Item>
                                <Item error={errors.discount_price && touched.discount_price} fixedLabel>
                                    <Label>İndirimli Fiyat</Label>
                                    <Input
                                        ref={ref => this.discount_price = ref}
                                        onSubmitEditing={() => this.status._root.focus()}
                                        returnKeyType={'next'}
                                        onChangeText={handleChange('discount_price')}
                                        value={values.discount_price}
                                        onBlur={() => setFieldTouched('discount_price')}
                                        keyboardType={'numeric'}
                                    />

                                    {(errors.name && touched.name) &&
                                    <Text style={{color: 'red'}}>{errors.name}</Text>}
                                </Item>
                                <Item error={errors.active && touched.active} fixedLabel>
                                    <View style={styles.statusCheckBoxContainer}>
                                        <View style={{flex: 3}}>
                                            <Label>Durum</Label>
                                        </View>
                                        <View style={{flex: 7}}>
                                            <CheckBox
                                                checked={values.active}
                                                onPress={() => setFieldValue('active', !values.active)}
                                            />
                                        </View>
                                    </View>
                                </Item>
                                <Button
                                    block
                                    success
                                    disabled={!isValid || isSubmitting}
                                    onPress={handleSubmit}
                                    style={{marginTop: 10}}>

                                    {isSubmitting && <Spinner size={'small'} color={'white'}/>}
                                    <Text style={{color: 'white'}}>Kaydet</Text>
                                </Button>
                            </Content>
                        </Card>
                    )}
                </Formik>
            </Content>
        );
    }
}

const styles = StyleSheet.create({
    statusCheckBoxContainer: {
        paddingVertical: 10, paddingRight: 10, flex: 10, flexDirection: 'row'
    }, checkbox: {}
});