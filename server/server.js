//Notes server 

const express       = require('express');
const bodyParser    = require('body-parser');

//create express app
const app           = express();

//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

//parse requests of content-type-application/json
app.use(bodyParser.json())

//configuring the database
const dbConfig      = require('./config/database.config.js');
const mongoose      = require('mongoose');

mongoose.Promise = global.Promise;

//connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err)
    process.exit();
});

//simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Notes aapplication!"})
})

require('./app/routes/note.routes.js')(app);

//listen for requests
const port = 8080;
app.listen(port, () => {
    console.log('We are live on ' + port);
});