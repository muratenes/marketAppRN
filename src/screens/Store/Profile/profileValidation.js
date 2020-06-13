import * as Yup from "yup";

const profileValidation = Yup.object().shape({
    username: Yup
        .string()
        .min(3, "kullanıcı adı en az 3 karakter olmalı")
        .max(50)
        .required("Kullanıcı adı gereklidir"),
    password: Yup
        .string(),
    c_password: Yup
        .string()
        .oneOf([Yup.ref('password')], 'Parolalar birbiri ile eşleşmiyor')
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
        .min(10, "en az 10 karakter olmalı")
        .max(255)
        .required("Adres bilgisi gereklidir")
});

module.exports = profileValidation;
