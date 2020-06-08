import * as Yup from "yup";

const validations = Yup.object().shape({
    username: Yup
        .string()
        .min(3,"kullanıcı adı en az 3 karakter olmalı")
        .max(50)
        .required("Kullanıcı adı gereklidir"),
    password: Yup
        .string()
        .required("parola belirlemelisiniz"),
    c_password: Yup
        .string()
        .oneOf([Yup.ref('password')], 'Parolalar birbiri ile eşleşmiyor')
        .required("parola tekrar gereklidir")
    , name: Yup
        .string()
        .required("tam ad soyad giriniz"),
    phone: Yup
        .number()
        .required("telefon gereklidir"),
    address: Yup
        .string()
        .min(5,"en az 5 karakter olmalı")
        .max(255)
        .required("Adres bilgisi gereklidir"),
    store_code : Yup
        .string()
        .min(6,'mağaza kodu 6 karakter olmalıdır')
        .max(6,'mağaza kodu 6 karakter olmalıdır')
        .required('mağaza kodu gereklidir')
});

module.exports = validations;
