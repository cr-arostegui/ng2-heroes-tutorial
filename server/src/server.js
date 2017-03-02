const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('./config/db');

const heroeRoute = require('./models/heroe/heroe.route.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.SERVER_PORT || 3002;

const router = express.Router();

router.use((req, res, next) => {
  console.log('Server listen: Something is listened');
  next();
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/', router);
app.use('/heroe', heroeRoute);

mongoose.Promise = global.Promise;
mongoose.connect(db.url);
app.listen(PORT);

console.log(`connected at server - port ${PORT}`);