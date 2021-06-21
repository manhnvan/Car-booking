const serviceAccount = require('../api_key_firebase.json');
const FCM = require('fcm-node');

const fcm = new FCM(serviceAccount);

module.exports.sendNotification = (req, res, next) => {
    const {token, title, body, data} = res.locals;
    const message = {
        to: token,
        notification: {
            title: title, 
            body: body
        },
        data: data
    }
    fcm.send(message, function(err, response) {
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
}