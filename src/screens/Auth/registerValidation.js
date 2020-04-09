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
    ref_user: Yup
        .number()
        .required(),
    phone: Yup
        .number()
        .required("telefon gereklidir"),
    address: Yup
        .string()
        .min(10,"en az 10 karakter olmalı")
        .max(255)
        .required("Adres bilgisi gereklidir")
});

module.exports = validations;
