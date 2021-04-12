const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const morgan = require('morgan');
const connection = require('./connection');

const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    }
    next();
});

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// import routes
app.use('/api', routes)

//se non trova le i path che ce sopra enta nel questa funziona 404
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

//manda il messagggio di errore a Frontend 404 o 500 viene da altra parte
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    console.log(error.message);
    res.json({
        error: error.message
    })
})

app.listen(PORT, () => {
    console.log('Server listen to: http://localhost:' + PORT)
})