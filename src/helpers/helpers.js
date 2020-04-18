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
        convertedObj = convertedObj === "true" ? true : convertedObj
        convertedObj = convertedObj === "false" ? false : convertedObj
        formData.append(k, convertedObj)
    }
    return formData;
}