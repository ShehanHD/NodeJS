var nodemailer = require('nodemailer');
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = 5000;

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hi.vcloudsystems@gmail.com',
        pass: 'vC10ud@2020'
    }
});

app.post('/api/send', (req, res) => {
    var mailOptions = {
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text,
        html: req.body.html
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.status(404);
            res.json(error);
        } else {
            res.status(200);
            res.json(info);
        }
    });
})

app.listen(PORT, () => console.log("server listen to http://localhost:" + PORT))