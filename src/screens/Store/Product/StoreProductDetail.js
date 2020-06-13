import React, {Component} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {
    Content,
    Item,
    Label,
    Input,
    Card,
    Picker,
    Button,
    Spinner,
    CheckBox,
    Body,
    Thumbnail,
    Text,
    Toast
} from 'native-base';
import {Formik} from "formik";
import axios from "axios";
import {API_BASE, ROLE_STORE} from "../../../constants";
import {
    convertToFormData,
    showAlertDialog,
    showSuccessToastMessage,
    showDangerToastMessage, showValidationToastMessage, showErrorApiResponseToastMessage
} from "../../../helpers/helpers";
import {inject} from "mobx-react";
import ImagePicker from "react-native-image-picker";
import {styles} from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";
import NavigationService from "../../../NavigationService";

const options = {
    title: 'Fotoğraf Seç',
    takePhotoButtonTitle: 'Fotoğraf Çek',
    chooseFromLibraryButtonTitle: 'Galeriden Seç',
    cancelButtonTitle: 'İptal',
    mediaType: 'photo',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
    allowsEditing: true
};

@inject('ProductStore', 'AuthStore')
export default class StoreProductDetail extends Component {
    state = {
        avatarSource: null,
        item: null,
        loading: false
    }
    static navigationOptions = ({navigation}) => {
        const item = navigation.getParam('item');
        let title = item.title !== "" ? item.title : 'Ürün Ekle'
        return {
            title: `${title}`
        }
    };

    componentDidMount(): void {
        const item = this.props.navigation.getParam('item');
        this.setState({
            item: item
        });
    }


    componentDidUpdate(): void {
        const item = this.props.navigation.getParam('item');
        console.log(item)
        console.log(item.id, this.state.item.id)
        if (this.state.item) {
            if (this.state.item.id !== item.id) {
                this.setState({item});
            }
        } else {
            this.setState({item});
        }
    }

    _handleSubmit = async (getData, bag) => {
        const {goBack} = this.props.navigation;
        try {
            const requestData = convertToFormData(getData);
            const productId = this.props.navigation.getParam('item').id;
            const {data} = await axios.post(`${API_BASE}/store/updateStoreProduct/${productId}`, requestData);
            if (data.status) {
                this.props.ProductStore.products = data.data.products;
                if (this.state.item.id === 0)
                    NavigationService.navigate('StoreProductDetail', {item: data.data.product})
                else
                    goBack();
            } else {
                showErrorApiResponseToastMessage(data)
            }
        } catch (e) {
            alert(e)
        }
    };

    _onSelectPicture = () => {
        if (this.props.AuthStore.user.role_id !== ROLE_STORE) {
            Toast.show({
                text: "Yetkiniz yok",
                buttonText: "Tamam",
                buttonTextStyle: {color: "#008000"},
                buttonStyle: {backgroundColor: "#5cb85c"}
            })
        } else {
            ImagePicker.showImagePicker(options, (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    this.uploadPhoto(response);
                }
            });
        }

    };

    uploadPhoto = async response => {
        this.setState({loading: true});
        const formData = new FormData();
        formData.append('fileData', {
            uri: response.uri,
            type: response.type,
            name: response.fileName
        });

        const config = {headers: {'Accept': 'application/json', 'Content-type': 'multipart/form-data'}};
        const {data} = await axios.post(`${API_BASE}/store/uploadProductImage/${this.state.item.id}`, formData, config);
        this.setState({loading: false});
        if (data.status) {
            this.setState({
                avatarSource: null,
                item: data.data.product
            });
            await this.props.ProductStore.getStoreProducts()
            showSuccessToastMessage('Fotoğraf yüklendi');
        } else {
            showDangerToastMessage(data.message)
        }
    };


    render() {
        const item = this.state.item;
        return (
            <Content>
                {this.state.item &&
                <Card style={{alignContent: 'center'}}>
                    {item.id !== 0 &&
                    <View style={{flex: 12, flexDirection: 'row'}}>
                        <TouchableOpacity style={styles.productImageContainer} onPress={this._onSelectPicture}>
                            {this.state.item.image !== "" && !this.state.loading &&
                            <Thumbnail source={{uri: this.state.item.image_url}} style={styles.productImage}/>}
                            {this.state.item.image === "" && !this.state.loading &&
                            <Icon name={'upload'} style={styles.uploadIcon}/>}
                            {this.state.loading && <Image source={require('../../../assets/img/mini_loading.gif')}
                                                          style={styles.productImageLoadingImage}/>}
                        </TouchableOpacity>
                        <View style={{flex: 6}}>
                            <Button onPress={this._onSelectPicture}>
                                <Text>Yükle</Text>
                            </Button>
                        </View>
                    </View>}

                </Card>}
                {this.state.item &&
                <Formik
                    initialValues={{
                        title: this.state.item.title,
                        price: '' + this.state.item.price,
                        discount_price: '' + this.state.item.discount_price === null ? '' : this.state.item.discount_price,
                        active: this.state.item.active === 1
                    }}
                    onSubmit={this._handleSubmit}
                    enableReinitialize={true}
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
                                {this.props.AuthStore.user.role_id === ROLE_STORE &&
                                <Button
                                    block
                                    success
                                    disabled={!isValid || isSubmitting}
                                    onPress={handleSubmit}
                                    style={{marginTop: 10}}>

                                    {isSubmitting && <Spinner size={'small'} color={'white'}/>}
                                    <Text style={{color: 'white'}}>Kaydet</Text>
                                </Button>
                                }
                            </Content>
                        </Card>
                    )}
                </Formik>}
            </Content>
        );
    }
}
