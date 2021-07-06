const route = require('express').Router();
// const serviceAccount = require('../api_key_firebase.json');
// const FCM = require('fcm-node');

// let fcm_customer = new FCM(serviceAccount);

route.post("/", (req, res, next) => {
    // const message = {
    //     to: req.body.token,
    //     notification: {
    //         title: 'Title of your push notification', 
    //         body: 'Body of your push notification' 
    //     },
    //     data: {  //you can send only notification or only data(or include both)
    //         my_key: 'my value',
    //         my_another_key: 'my another value'
    //     }
    // }
    // fcm_customer.send(message, function(err, response) {
    //     if (err) {
    //         console.log("Something has gone wrong!");
    //     } else {
    //         console.log("Successfully sent with response: ", response);
    //     }
    // });
    // res.status(200).json({success: true});
    res.status(200).json({msg: 'uncomment this route for testing'})
});


module.exports = route