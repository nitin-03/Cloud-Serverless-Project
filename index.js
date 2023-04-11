var AWS = require('aws-sdk');
var ses = new AWS.SES();
 
var RECEIVER = 'nitinreddy29402@gmail.com';
var SENDER = 'chaitanyakrish123456@gmail.com';

var response = {
 "isBase64Encoded": false,
 "headers": { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
 "statusCode": 200,
 "body": "{\"result\": \"Success.\"}"
 };

exports.handler = function (event, context) {
    console.log('Received event:', event);
    sendEmail(event, function (err, data) {
        context.done(err, null);
    });
};
 
function sendEmail (event, done) {
    var params = {
        Destination: {
            ToAddresses: [
                RECEIVER
            ]
        },
        Message: {
            Body: {
                Text: {
                    Data: 'Name: ' + event.name + '\nPhone: ' + event.phone + '\nEmail: ' + event.email + '\ndesc: ' + event.desc ,
                    Charset: 'UTF-8'
                }
            },
            Subject: {
                Data: 'Website Contact Form: ' + event.name,
                Charset: 'UTF-8'
            }
        },
        Source: SENDER
    };
    ses.sendEmail(params, done);
}
