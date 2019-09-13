const express = require('express'),
      app = express(),
      routes = require('./routes/index'),
      helmet = require('helmet')

const exphbs = require('express-handlebars'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      fileupload = require('express-fileupload'),
      expressSession = require('express-session'),
      MongoStore = require('connect-mongo'),
      cookieParser = require('cookie-parser'),
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

app.use(helmet())
app.use(cookieParser())

app.use(expressSession({
    secret: 'securite',
    name: 'biscuit',
    saveUninitialized: true,
    resave: false,
    // cookie: { secure: true },
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

// Page Error 404
app.use((req, res) => {
    res.render('404')
  })

// ########################
//         Run App
// ########################

module.exports = app.listen(3001, () => {
    console.log('Le serveur tourne sur le port 3001');
});