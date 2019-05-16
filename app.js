const express = require('express'),
      app = express();

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

mongoose.connect('mongodb://localhost:27017/revolution', { useNewUrlParser: true });

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
    // console.log(res.locals.user);
    next()
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());
app.use(flash());

app.use(express.static('public'));

// ########################
//       Middlewares    
// ########################

const auth = require('./middlewares/auth'),
      testUserGroup = require('./middlewares/testUserGroup')

app.use('*', testUserGroup)

// ########################
//       Controllers    
// ########################

    // Map
const welcome = require('./controllers/welcome'),
      mediaOwnerMap = require('./controllers/mediaOwnerMap'),
      galleryDisplay = require('./controllers/galleryDisplay'),

    // Users
      userCreate = require('./controllers/userCreate'),
      userLogin = require('./controllers/userLogin'),
      userLogout = require('./controllers/userLogout'),

    // Medias
      mediaAddForm = require('./controllers/backend/medias/mediaAddForm'),
      mediaCreate = require('./controllers/backend/medias/mediaCreate')

// ########################
//         Routes       
// ########################

    // Map
app.get ('/', welcome)
app.get ('/mediaOwnerMap', mediaOwnerMap)
app.get('/galleryDisplay', galleryDisplay)

    // Users
app.post ('/users/add', userCreate)
app.post('/users/login', userLogin )
app.get('/users/logout',auth, userLogout)

    // Medias
app.get ('/medias/add', auth, mediaAddForm)
app.post('/medias/create', auth, mediaCreate)

// ########################
//         Run App
// ########################

app.listen(3001, () => {
    console.log('Le serveur tourne sur le port 3000');
});