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

    // Users
const auth = require('./middlewares/auth'),
      adminAuth = require('./middlewares/adminAuth'),
      testUserGroup = require('./middlewares/testUserGroup')

app.use(testUserGroup)

    // Posts
const validForm = require('./middlewares/validForm')

// ########################
//       Controllers    
// ########################

    // Map
const welcome = require('./controllers/frontend/welcome'),
      mediaOwnerMap = require('./controllers/frontend/mediaOwnerMap'),
      galleryDisplay = require('./controllers/frontend/galleryDisplay'),
      articlesDisplay =require('./controllers/frontend/articlesDisplay'),

    // Users
      userCreate = require('./controllers/frontend/userCreate'),
      userLogin = require('./controllers/frontend/userLogin'),
      userLogout = require('./controllers/frontend/userLogout'),

    // Medias
      mediaAddForm = require('./controllers/backend/medias/mediaAddForm'),
      mediaCreate = require('./controllers/backend/medias/mediaCreate'),
      mediaEdit = require('./controllers/backend/medias/mediaEdit'),
      mediaUpdate =  require('./controllers/backend/medias/mediaUpdate'),
      mediaDelete = require('./controllers/backend/medias/mediaDelete')

// ########################
//         Routes       
// ########################

    // Map
app.get ('/', welcome)
app.get ('/mediaOwnerMap', mediaOwnerMap)
app.get('/galleryDisplay', galleryDisplay)
app.get('/articles/display', articlesDisplay)

    // Users
app.post ('/users/add', userCreate)
app.post('/users/login', userLogin )
app.get('/users/logout',auth, userLogout)

    // Medias
app.get ('/medias/add', adminAuth, mediaAddForm)
app.post('/medias/create', adminAuth, validForm, mediaCreate)
app.get('/medias/edit/:id', adminAuth, mediaEdit)
app.post('/medias/update', adminAuth, validForm, mediaUpdate)
app.get('/medias/delete/:id', adminAuth, mediaDelete)

// ########################
//         Run App
// ########################

app.listen(3001, () => {
    console.log('Le serveur tourne sur le port 3001');
});