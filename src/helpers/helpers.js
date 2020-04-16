export function showAlertDialog(apiResponseMessage) {
    if (apiResponseMessage instanceof String) {
        alert(apiResponseMessage)
    } else {
        let message = '';
        var index = 0;
        for (var k in apiResponseMessage) {
            message += apiResponseMessage[k] + (index !== 0 && index !== apiResponseMessage.length ? " ----- " : '') ;
            index++;
        }
        alert(message)
    }
}