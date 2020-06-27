import React, {Component} from 'react';

import {Button, Content, Input, Item, Spinner, Text, Textarea, Picker, Toast} from "native-base";

import {Formik} from "formik";

//import api from '../../api/api';
import validations from './registerValidation';
import {inject, observer} from "mobx-react";
import axios from 'axios';
import {API_BASE, ERROR_MESSAGE} from "../../constants";
import {showAlertDialog} from '../../helpers/helpers';


@inject('AuthStore', 'CompanyStore','UserStore')
@observer
export default class RegisterForm extends Component {

    constructor() {
        super();
        this.state = {
            validatedStoreCode: false
        }
    }

    _handleSubmit = async (getData, bag) => {
        // await AuthStore.removeToken()
        try {
            var formData = new FormData();
            for (var k in getData) {
                formData.append(k, getData[k])
            }
            const {data} = await axios.post(`${API_BASE}/register`, formData);
            bag.setSubmitting(false);
            if (!data.status) {
                return false;
            }
            await this.props.UserStore.addUserToSession(data.data.user);
            await this.props.AuthStore.saveToken(data.data.token);
        } catch (e) {
        }
    };

    checkCompanyCode = async value => {
        if (value.length === 6) {
            const {data} = await axios.post(`${API_BASE}/not-auth/checkStoreCode/${value}`);
            if (data.status) {
                this.setState({validatedStoreCode: true})
                alert(data.message)
            } else {
                Toast.show({
                    text: data.message,
                    buttonText: "Tamam",
                    buttonTextStyle: {color: "#008000"},
                    buttonStyle: {backgroundColor: "#5cb85c"},
                    duration: 1500
                })
            }
        }
    }

    render() {
        {
            return (
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                        c_password: '',
                        name: '',
                        phone: '',
                        address: '',
                        store_code: ''
                    }}
                    onSubmit={this._handleSubmit}
                    validationSchema={validations}
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
                          setFieldValue,
                          handleBlur
                      }) => (
                        <Content style={{padding: 10}}>
                            <Item error={errors.store_code && touched.store_code}>
                                <Input
                                    returnKeyType={'next'}
                                    ref={ref => this.code = ref}
                                    onSubmitEditing={() => this.username._root.focus()}
                                    onChangeText={value => {
                                        setFieldValue('store_code', value);
                                        this.checkCompanyCode(value); // calling custom onChangeText
                                    }}
                                    onBlur={() => setFieldTouched('store_code')}
                                    value={values.store_code}
                                    placeholder='Mağaza kodu'
                                    autoCapitalize='characters'
                                    maxLength={6}
                                />

                                {(errors.store_code && touched.store_code) &&
                                <Text style={{color: 'red'}}>{errors.store_code}</Text>}
                            </Item>
                            <Item error={errors.username && touched.username}>
                                <Input
                                    ref={ref => this.username = ref}
                                    returnKeyType={'next'}
                                    onSubmitEditing={() => this.passwordRef._root.focus()}
                                    onChangeText={handleChange('username')}
                                    value={values.username}
                                    placeholder='Kullanıcı Adı'
                                    onBlur={() => setFieldTouched('username')}
                                    autoCorrect={false}
                                    autoCapitalize={'none'}
                                />

                                {(errors.username && touched.username) &&
                                <Text style={{color: 'red'}}>{errors.username}</Text>}
                            </Item>

                            <Item error={errors.password && touched.password}>
                                <Input
                                    ref={ref => this.passwordRef = ref}
                                    returnKeyType={'next'}
                                    onSubmitEditing={() => this.c_password._root.focus()}
                                    onChangeText={handleChange('password')}
                                    value={values.password}
                                    placeholder='Parola'
                                    onBlur={() => setFieldTouched('password')}
                                    autoCapitalize={'none'}
                                    secureTextEntry={true}
                                />

                                {(errors.password && touched.password) &&
                                <Text style={{color: 'red'}}>{errors.password}</Text>}
                            </Item>

                            <Item error={errors.c_password && touched.c_password}>
                                <Input
                                    ref={ref => this.c_password = ref}
                                    onSubmitEditing={() => this.name._root.focus()}
                                    returnKeyType={'next'}
                                    onChangeText={handleChange('c_password')}
                                    value={values.c_password}
                                    placeholder='Parola tekrar'
                                    onBlur={() => setFieldTouched('c_password')}
                                    autoCapitalize={'none'}
                                    secureTextEntry={true}
                                />

                                {(errors.c_password && touched.c_password) &&
                                <Text style={{color: 'red'}}>{errors.c_password}</Text>}
                            </Item>
                            <Item error={errors.name && touched.name}>
                                <Input
                                    ref={ref => this.name = ref}
                                    onSubmitEditing={() => this.phone._root.focus()}
                                    returnKeyType={'next'}
                                    onChangeText={handleChange('name')}
                                    value={values.name}
                                    placeholder='Ad & Soyad'
                                    onBlur={() => setFieldTouched('name')}
                                    autoCorrect={false}
                                    autoCapitalize={'none'}
                                />

                                {(errors.name && touched.name) &&
                                <Text style={{color: 'red'}}>{errors.name}</Text>}
                            </Item>
                            <Item error={errors.phone && touched.phone}>
                                <Input
                                    ref={ref => this.phone = ref}
                                    onSubmitEditing={() => this.address._root.focus()}
                                    returnKeyType={'next'}
                                    onChangeText={handleChange('phone')}
                                    value={values.phone}
                                    placeholder='Telefon'
                                    maxLength={10}
                                    onBlur={() => setFieldTouched('phone')}
                                    autoCorrect={false}
                                    keyboardType="numeric"
                                    autoCapitalize={'none'}
                                />

                                {(errors.phone && touched.phone) &&
                                <Text style={{color: 'red'}}>{errors.phone}</Text>}
                            </Item>
                            <Item error={errors.address && touched.address}>
                                <Input
                                    ref={ref => this.address = ref}
                                    onSubmitEditing={() => this.ref_user._root.focus()}
                                    returnKeyType={'next'}
                                    onChangeText={handleChange('address')}
                                    value={values.address}
                                    multiline={true}
                                    numberOfLines={5}
                                    placeholder='Adres bilgisi'
                                    onBlur={() => setFieldTouched('address')}
                                    autoCorrect={false}
                                />

                                {(errors.address && touched.address) &&
                                <Text style={{color: 'red'}}>{errors.address}</Text>}
                            </Item>

                            <Button
                                block
                                disabled={!isValid || isSubmitting}
                                onPress={handleSubmit}
                                style={{marginTop: 10}}>

                                {isSubmitting && <Spinner size={'small'} color={'white'}/> && this.state.validatedStoreCode}
                                <Text>Kayıt Ol</Text>
                            </Button>
                        </Content>
                    )}
                </Formik>
            );
        }
    }
}
