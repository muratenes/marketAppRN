const fcm = require('fcm-notification');
const FCM = new fcm('./pushnot-6c76f-firebase-adminsdk-jrmqd-1ae2510729.json');
const token = 'token here';

const message = {
    data: {    //This is only optional, you can send any data
        score: '850',
        time: '2:45'
    },
    notification:{
        title : 'Title of notification',
        body : 'Body of notification'
    },
    token : token
};

FCM.send(message, function(err, response) {
    if(err){
        console.log('error found', err);
    }else {
        console.log('response here', response);
    }
})