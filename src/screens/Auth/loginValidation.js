import * as Yup from "yup";

const validations = Yup.object().shape({
    username: Yup
        .string()
        .min(3)
        .required("kullanıcı adı gereklidir"),
    password: Yup
        .string()
        .required("parola gereklidir"),
});

module.exports = validations;
