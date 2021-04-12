const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Register = require('./Schema/Registration.js');

const PORT = 5000;
const SECRET_KEY = "lhdqwehgdieh";

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

//DB CONFIG
const DB_PASSWORD = '4CNRxML7aUYyZnSv';
const DB_NAME = 'auth';

mongoose.connect(`mongodb+srv://weCode:${DB_PASSWORD}@authentication.dt243.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

////////////////////////////

app.get('/api', verifyToken, (req, res) => {
    console.log('====================================');
    console.log(req);
    console.log('====================================');
    jwt.verify(req.token, SECRET_KEY, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        }
        else {
            res.json(authData)
        }
    })
})

//Registrazione alla servizio
app.post('/api/register', (req, res) => {

    let data = {
        db: "weCode",
        ip: "wecode.best",
        db_username: "weCode",
        db_password: "weCode2020",
        bd_port: "3306"
    }

    Register.create(data, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
})

//Acesso alla servizzio
app.post('/api/login', (req, res) => {
    let user = {
        name: "aaa",
        pass: "aaa"
    }

    console.log('====================================');
    console.log(req.params);
    console.log('====================================');

    jwt.sign({ user }, SECRET_KEY, (err, token) => {
        res.json({
            token
        })
    });
})

//User Registrazzione
app.post('/api/:id/register', (req, res) => {
    res.json(req.params)
})

//User Acesso
app.post('/api/:id/login', (req, res) => {

})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    console.log('====================================');
    console.log(req);
    console.log('====================================');

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        req.token = token;
        next();
    }
    else {
        res.sendStatus(401);
    }
}

app.listen(PORT, () => console.log("server listen to http://localhost:" + PORT))