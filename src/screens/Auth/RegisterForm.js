import React, {Component} from 'react';

import {Button, Content, Input, Item, Spinner, Text, Textarea,Picker} from "native-base";

import {Formik} from "formik";

//import api from '../../api/api';
import validations from './registerValidation';
import {inject, observer} from "mobx-react";
import axios from 'axios';
import {API_BASE} from "../../constants";
import AuthStore from "../../store/AuthStore";


@inject('AuthStore', 'CompanyStore')
@observer
export default class RegisterForm extends Component {

    _handleSubmit = async (getData, bag) => {
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
            AuthStore.saveToken(data.data.token)
        } catch (e) {
            alert(e)
        }
    };

    componentDidMount(): void {
        this.props.CompanyStore.getCompanies()
    }


    render() {
        const {CompanyStore} = this.props;
        return (
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    c_password: '',
                    name: '',
                    ref_user: '',
                    phone: '',
                    address: '',
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
                      setFieldValue
                  }) => (
                    <Content style={{padding: 10}}>
                        <Item error={errors.username && touched.username}>
                            <Input
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
                                returnKeyType={'go'}
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
                                returnKeyType={'next'}
                                onChangeText={handleChange('phone')}
                                value={values.phone}
                                placeholder='Telefon'
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
                        <Item error={errors.ref_user && touched.ref_user}>
                            <Picker
                                returnKeyType={'go'}
                                style={{height: 50, width: 150}}
                                selectedValue={values.ref_user}
                                onValueChange={(itemValue, itemIndex) => {
                                    setFieldValue('ref_user', itemValue)
                                    this.setState({ref_user: itemValue})
                                }}
                                onBlur={() => setFieldTouched('ref_user')}
                            >
                                <Picker.Item label="--Sütçü Seçiniz--" value=""/>
                                {
                                    CompanyStore.companies.map((v) => {
                                        return <Picker.Item label={v.name} value={v.id}/>
                                    })
                                }
                            </Picker>

                            {(errors.ref_user && touched.ref_user) &&
                            <Text style={{color: 'red'}}>{errors.ref_user}</Text>}
                        </Item>

                        <Button
                            block
                            disabled={!isValid || isSubmitting}
                            onPress={handleSubmit}
                            style={{marginTop: 10}}>

                            {isSubmitting && <Spinner size={'small'} color={'white'}/>}
                            <Text>Kayıt Ol</Text>
                        </Button>
                    </Content>
                )}
            </Formik>
        );
    }
}