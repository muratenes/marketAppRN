import React, {Component} from 'react';
import Navbar from '../../components/Navbar';
import {View, Text} from 'react-native';
import {Button, Container, Content, Input, Item, Picker, Spinner,Label} from 'native-base';
import {inject, observer} from "mobx-react";
import {Formik} from "formik";
import profileValidation from "../Profile/profileValidation";
import axios from "axios";
import {ScrollView} from 'react-native';

import {API_BASE} from "../../constants";
import AuthStore from "../../store/AuthStore";
import AuthLoading from "../AuthLoading";
import {showAlertDialog, showDangerToastMessage, showErrorApiResponseToastMessage, showSuccessToastMessage} from "../../helpers/helpers";

@inject('UserStore')
@observer
export default class Profile extends Component {

    _handleSubmit = async (getData, bag) => {
        try {
            var formData = new FormData();
            for (var k in getData) {
                formData.append(k, getData[k])
            }
            const {data} = await axios.post(`${API_BASE}/saveUserDetail`, formData);
            if (!data.status) {
                showErrorApiResponseToastMessage(data)
                return false;
            }
            showSuccessToastMessage(data.message)
        } catch (e) {
            showDangerToastMessage(e)
        }
    };

    componentDidMount(): void {
        this.props.UserStore.getUserDetail()
    }

    render() {
        const {UserStore} = this.props;
        if (UserStore.user !== null) {
            const user = UserStore.user;
            return (
                <ScrollView>
                    <Navbar title={'Profil'}/>
                    <Formik
                        initialValues={{
                            username: user.username,
                            password: '',
                            c_password: '',
                            name: user.name,
                            phone: user.phone,
                            address: user.address,
                        }}
                        onSubmit={this._handleSubmit}
                        validator={() => ({})}
                    >
                        {({
                              values,
                              handleChange,
                              handleSubmit,
                              errors,
                              touched,
                              setFieldTouched,
                              isValid,
                              isSubmitting
                          }) => (
                            <Content style={{padding: 10}}>
                                <Item error={errors.username && touched.username} stackedLabel>
                                    <Label>Kullanıcı Adı</Label>
                                    <Input
                                        returnKeyType={'next'}
                                        editable={false}
                                        onSubmitEditing={() => this.passwordRef._root.focus()}
                                        onChangeText={handleChange('username')}
                                        value={values.username}
                                        onBlur={() => setFieldTouched('username')}
                                        autoCorrect={false}
                                        autoCapitalize={'none'}
                                    />

                                    {(errors.username && touched.username) &&
                                    <Text style={{color: 'red'}}>{errors.username}</Text>}
                                </Item>

                                <Item error={errors.password && touched.password} stackedLabel>
                                    <Label>Parola</Label>
                                    <Input
                                        ref={ref => this.passwordRef = ref}
                                        returnKeyType={'next'}
                                        onSubmitEditing={() => this.c_password._root.focus()}
                                        onChangeText={handleChange('password')}
                                        value={values.password}
                                        onBlur={() => setFieldTouched('password')}
                                        autoCapitalize={'none'}
                                        secureTextEntry={true}
                                    />

                                    {(errors.password && touched.password) &&
                                    <Text style={{color: 'red'}}>{errors.password}</Text>}
                                </Item>

                                <Item error={errors.c_password && touched.c_password} stackedLabel>
                                    <Label>Parola Tekrar</Label>
                                    <Input
                                        ref={ref => this.c_password = ref}
                                        returnKeyType={'go'}
                                        onChangeText={handleChange('c_password')}
                                        value={values.c_password}
                                        onBlur={() => setFieldTouched('c_password')}
                                        autoCapitalize={'none'}
                                        secureTextEntry={true}
                                    />

                                    {(errors.c_password && touched.c_password) &&
                                    <Text style={{color: 'red'}}>{errors.c_password}</Text>}
                                </Item>
                                <Item error={errors.name && touched.name} stackedLabel>
                                    <Label>Ad Soyad</Label>
                                    <Input
                                        returnKeyType={'next'}
                                        onChangeText={handleChange('name')}
                                        value={values.name}
                                        onBlur={() => setFieldTouched('name')}
                                        autoCorrect={false}
                                        autoCapitalize={'none'}
                                    />

                                    {(errors.name && touched.name) &&
                                    <Text style={{color: 'red'}}>{errors.name}</Text>}
                                </Item>
                                <Item error={errors.phone && touched.phone} stackedLabel>
                                    <Label>Telefon</Label>
                                    <Input
                                        returnKeyType={'next'}
                                        onChangeText={handleChange('phone')}
                                        value={values.phone}
                                        onBlur={() => setFieldTouched('phone')}
                                        autoCorrect={false}
                                        keyboardType="numeric"
                                        autoCapitalize={'none'}
                                    />

                                    {(errors.phone && touched.phone) &&
                                    <Text style={{color: 'red'}}>{errors.phone}</Text>}
                                </Item>
                                <Item error={errors.address && touched.address} stackedLabel>
                                    <Label>Adres</Label>
                                    <Input
                                        returnKeyType={'next'}
                                        onChangeText={handleChange('address')}
                                        value={values.address}
                                        multiline={true}
                                        numberOfLines={5}
                                        onBlur={() => setFieldTouched('address')}
                                        autoCorrect={false}
                                    />

                                    {(errors.address && touched.address) &&
                                    <Text style={{color: 'red'}}>{errors.address}</Text>}
                                </Item>
                                <Button
                                    block
                                    //disabled={!isValid || isSubmitting}
                                    onPress={handleSubmit}
                                    style={{marginTop: 10}}>

                                    {isSubmitting && <Spinner size={'small'} color={'white'}/>}
                                    <Text style={{color:'white'}}>Güncelle</Text>
                                </Button>
                            </Content>
                        )}
                    </Formik>
                </ScrollView>
            );
        } else {
            return (
                <AuthLoading/>
            );
        }

    }
}

