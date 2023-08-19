const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const api = require('./routes/api');
const Pusher = require('pusher');

const pusher = new Pusher({ appId: '<INSERT_APP_ID>', key: '<INSERT_APP_KEY>', secret: '<INSERT_APP_SECRET>', cluster: '<INSERT_APP_CLUSTER>', encrypted: true, });
const channel = 'tasks';

const app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', api);
//?replicaSet=rs
mongoose.connect('mongodb://localhost:27017/local',{
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', () => {
    app.listen(9000, () => {
        console.log('Node server running on port 9000');
    });

    /**For DB */
    // const changeStreamBD = db.watch();
    // changeStreamBD.on('changeDB', (changeDB) => { 
    //     console.log(changeDB);
    // });

    /** For Collection */
    // const taskCollection = db.collection('tasks');
    // const changeStream = taskCollection.watch();
    // changeStream.on('change', (change) => { 
    //     console.log(change);
    // });
});