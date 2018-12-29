const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser =require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const PORT = (process.env.PORT ||4200);
const cors = require('cors');
const config = require('./config/config');
var indexRouter = require('./routes/index');
var flash=require('connect-flash');
app.use(cors());
mongoose.connect(config.db).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database' +err)
    });
mongoose.Promise = global.Promise
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)
app.use(cookieParser());
app.use(bodyParser.json())
app.use(
    session({
        secret:'this is the default passphrase',
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        resave: true,
        saveUninitialized: true,
        cookie: {maxAge: 12*60*60*1000}
    })
)
app.use(flash());

// ===== Passport ====

app.use('/', indexRouter);
app.listen(PORT, function(){
    console.log('Server is running on Port: ',PORT);
});