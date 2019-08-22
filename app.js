const express = require('express'),
      app = express(),
      routes = require('./routes/index')

const exphbs = require('express-handlebars'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      fileupload = require('express-fileupload'),
      expressSession = require('express-session'),
      MongoStore = require('connect-mongo'),
      flash = require('express-flash')

app.engine('.hbs', exphbs({ 
    extname: '.hbs', 
    defaultLayout: 'main' 
}));
app.set('view engine', '.hbs');
      
const mongoStore = MongoStore(expressSession);

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost:27017/revolution');

app.use(expressSession({
    secret: 'securite',
    name: 'biscuit',
    saveUninitialized: true,
    resave: false,
    store: new mongoStore(
        { mongooseConnection: mongoose.connection }
    )
}));

app.use('*', (req, res, next) => {
    res.locals.user = req.session.userId;
    next()
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());
app.use(flash());
app.use(routes);

app.use(express.static('public'));

// ########################
//         Run App
// ########################

module.exports = app.listen(3001, () => {
    console.log('Le serveur tourne sur le port 3001');
});