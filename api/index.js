import express from 'express';
import bodyParser from 'body-parser';

import indexRouter from './routes/index.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json())

app.use('/', indexRouter);

app.listen(PORT, () => console.log('server listening to http://localhost:' + PORT))