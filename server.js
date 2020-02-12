var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var flash = require('connect-flash');
var _ = require('underscore');
var moment = require('moment');
var db = require('./config/database');


var app = express();

// map global promisies / get reed of worning
mongoose.Promise = global.Promise;
// connection to mongoose
mongoose.connect(db.mongoURI, {
  useNewUrlParser: true
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

require('./config/passport');
require('./secret/secret');

app.use(express.static('public'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(cookieParser());


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(validator());

app.use(session({
    secret: 'bongomindaniel12323#523',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.locals._ = _;
app.locals.moment = moment;


require('./routes/user')(app, passport);
require('./routes/company')(app)
require('./routes/review')(app)
require('./routes/message')(app)



var PORT = process.env.PORT || 5000 ;

app.listen(PORT,(req,res) => {
   console.info(` server is running on PORT ${PORT}.....  `);
});

