import React, {Component} from 'react';
import StoreNavbar from "../../../components/StoreNavbar";
import {View, Text} from 'react-native';
import {Button, Container, Content, Input, Item, Picker, Spinner, Label, CheckBox} from 'native-base';
import {inject, observer} from "mobx-react";
import {Formik} from "formik";
import axios from "axios";
import {ScrollView,StyleSheet} from 'react-native';

import {API_BASE, ROLE_STORE_WORKER} from "../../../constants";
import AuthLoading from "../../AuthLoading";
import {showAlertDialog, showDangerToastMessage, showErrorApiResponseToastMessage, showSuccessToastMessage} from "../../../helpers/helpers";

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
            // showDangerToastMessage(e)
        }
    };

    async componentDidMount(): void {
        await this.props.UserStore.getUserDetail()
    }

    render() {
        const {UserStore} = this.props;
        if (UserStore.user !== null) {
            const user = UserStore.user;
            return (
                <ScrollView>
                    <StoreNavbar title={'Profil'}/>
                    <Formik
                        initialValues={{
                            username: user.username,
                            password: '',
                            password_confirmation: '',
                            name: user.name,
                            phone: user.phone,
                            address: user.address,
                            working_status: user.worker ? (user.worker.working_status === 1) : 0
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
                              isSubmitting,
                              setFieldValue
                          }) => (
                            <Content style={{padding: 10}}>
                                {user.role_id === ROLE_STORE_WORKER &&
                                <Item error={errors.working_status && touched.working_status} fixedLabel>
                                    <View style={styles.statusCheckBoxContainer}>
                                        <View style={{flex: 5}}>
                                            <Label>Sipariş Alabilir Mi ?</Label>
                                        </View>
                                        <View style={{flex: 7}}>
                                            <CheckBox
                                                checked={values.working_status}
                                                onPress={() => setFieldValue('working_status', !values.working_status)}
                                            />
                                        </View>
                                    </View>
                                </Item>}
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

                                <Item error={errors.password_confirmation && touched.password_confirmation} stackedLabel>
                                    <Label>Parola Tekrar</Label>
                                    <Input
                                        ref={ref => this.password_confirmation = ref}
                                        returnKeyType={'go'}
                                        onChangeText={handleChange('password_confirmation')}
                                        value={values.c_password}
                                        onBlur={() => setFieldTouched('password_confirmation')}
                                        autoCapitalize={'none'}
                                        secureTextEntry={true}
                                    />

                                    {(errors.password_confirmation && touched.password_confirmation) &&
                                    <Text style={{color: 'red'}}>{errors.password_confirmation}</Text>}
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
                                        maxLength={10}
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
                                    <Text style={{color: 'white'}}>Güncelle</Text>
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

const styles = StyleSheet.create({
    statusCheckBoxContainer: {
        paddingVertical: 10, paddingRight: 10, flex: 10, flexDirection: 'row'
    }
})

