import {Toast} from "native-base";
import {ERROR_MESSAGE, SUCCESS_MESSAGE} from "../constants";

export function showAlertDialog(apiResponseMessage) {
    if (apiResponseMessage instanceof String) {
        alert(apiResponseMessage)
    } else {
        let message = '';
        var index = 0;
        for (var k in apiResponseMessage) {
            message += apiResponseMessage[k] + (index !== 0 && index !== apiResponseMessage.length ? " ----- " : '');
            index++;
        }
        alert(message)
    }
}

export function convertToFormData(object) {
    var formData = new FormData();
    for (var k in object) {
        var convertedObj = object[k] === null ? "" : object[k];
        convertedObj = (convertedObj === "true" || convertedObj === true) ? 1 : convertedObj
        convertedObj = (convertedObj === "false" || convertedObj === false) ? 0 : convertedObj
        formData.append(k, convertedObj)
    }
    return formData;
}

export function showSuccessToastMessage(message = SUCCESS_MESSAGE, duration = 600, buttonText = 'Tamam') {
    Toast.show({
        text: message,
        buttonText: buttonText,
        duration: duration,
        type: "success"
    });
}

export function showDangerToastMessage(message = ERROR_MESSAGE, duration = 1400, buttonText = 'Tamam') {
    Toast.show({
        text: message,
        buttonText: buttonText,
        duration: duration,
        type: "danger"
    });
}

export function showValidationToastMessage(validationError, duration = 1400, buttonText = 'Tamam') {
    let responseMessage = "";
    Object.keys(validationError).forEach(function (k) {
        responseMessage += (validationError[k]);
    });
    Toast.show({
        text: responseMessage,
        buttonText: buttonText,
        duration: duration,
        type: "danger"
    });
}

export function showErrorApiResponseToastMessage(apiResponse, duration = 1400, buttonText = 'Tamam') {
    let responseMessage = "";
    if (apiResponse.hasOwnProperty('validation_errors')) {
        const validationError = apiResponse.validation_errors;
        Object.keys(validationError).forEach(function (k) {
            responseMessage += (validationError[k]);
        });
    } else {
        responseMessage = apiResponse.message;
    }
    Toast.show({
        text: responseMessage,
        buttonText: buttonText,
        duration: duration,
        type: "danger"
    });
}
