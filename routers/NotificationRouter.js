const route = require('express').Router();
const admin = require('firebase-admin');
const serviceAccount = require('../api_key_firebase.json');
const FCM = require('fcm-node');

const fcm = new FCM(serviceAccount);

route.post("/", (req, res, next) => {
    const message = {
        to: "eC-Uw_nHTC6lodG-ZoWZt3:APA91bGsr9ransoPNTA6sPCLRjjIwijsENNdlylr0RqlttoZjoZ2r2AxKMMXJ7j1CGPhEt5QxVxmAei9Fs7BdK0Yamg1UbjhSbQ2xYBjPRPdPo8ux-xvC-XhB0QZlmL2nMxjwkvg7bKy",
        notification: {
            title: 'Title of your push notification', 
            body: 'Body of your push notification' 
        },
        data: {  //you can send only notification or only data(or include both)
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    }
    fcm.send(message, function(err, response) {
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
});

module.exports = route