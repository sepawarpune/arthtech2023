var express = require('express');
var path = require('path');
var engines = require('consolidate');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var app = express();
var router = express.Router();

app.set('port', (process.env.PORT || 5000))

app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.use('/img',express.static(path.resolve(__dirname,'img')));
app.use('/js',express.static(path.resolve(__dirname,'js')));
app.use('/css',express.static(path.resolve(__dirname,'css')));

app.use('/',router);

app.get('/index', function (request, response) {
    response.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/about.html', function (request, response) {
    response.sendFile(path.join(__dirname + '/about.html'));
})

app.get('/services.html', function (request, response) {
    response.sendFile(path.join(__dirname + '/services.html'));
})

app.get('/academic.html', function (request, response) {
    response.sendFile(path.join(__dirname + '/academic.html'));
})

app.get('/portfolio.html', function (request, response) {
    response.sendFile(path.join(__dirname + '/portfolio.html'));
})

app.get('/contact.html', function (request, response) {
    response.sendFile(path.join(__dirname + '/contact.html'));
})

app.get('/*', function(request, response) {
    response.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
})

app.use(bodyParser.urlencoded({extended: true}));

app.post('/send-email', function (request, response) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'contactarthtech@gmail.com',
            pass: 'C0nt@ct@rtht3ch'
        }
    }), formBody = request.body;

    //console.log(formBody.name);
    const mailOptions = {

        from: formBody.email, // sender address
        to: 'arthtechautomation@gmail.com', // list of receivers
        subject: 'Enquiry from '+ formBody.name, // Subject line
        //html: '<p>Testing email</p> ',// plain text body
        text: ' Message From : ' + formBody.name +'\n Email id : ' + formBody.email +'\n Phone No : ' + formBody.phone + '\n Says : '+ formBody.message
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
            console.log(err)
        else
            console.log(info);
    });
    response.sendFile(path.join(__dirname + '/contact.html'));
});