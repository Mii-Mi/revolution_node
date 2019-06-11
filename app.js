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

app.use('*', testUserGroup)

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
      userProfile = require('./controllers/frontend/userProfile'),

    // Users
      userCreate = require('./controllers/frontend/userCreate'),
      userLogin = require('./controllers/frontend/userLogin'),
      userLogout = require('./controllers/frontend/userLogout'),
      userProfileEdit = require('./controllers/frontend/userProfileEdit'),
      userProfileUpdate = require('./controllers/frontend/userProfileUpdate')
      
    // Medias
      mediaAddForm = require('./controllers/backend/medias/mediaAddForm'),
      mediaCreate = require('./controllers/backend/medias/mediaCreate'),
      mediaEdit = require('./controllers/backend/medias/mediaEdit'),
      
    // Articles
      articlesAdd = require('./controllers/frontend/articleAdd'),
      articleCreate = require('./controllers/frontend/articleCreate'),
      articleSingle = require('./controllers/frontend/articleSingle'),
      articleEdit = require('./controllers/frontend/articleEdit'),
      articleUpdate = require('./controllers/frontend/articleUpdate'),
      articleDelete = require('./controllers/frontend/articleDelete'),
      
    // Comments
      commentAdd = require('./controllers/frontend/commentAdd'),
      commentEdit = require('./controllers/frontend/commentEdit'),
      commentUpdate = require('./controllers/frontend/commentUpdate'),
      commentDelete = require('./controllers/frontend/commentDelete'),
       
    // Admin Backend
        // Medias
      mediaUpdate =  require('./controllers/backend/medias/mediaUpdate'),
      mediaDelete = require('./controllers/backend/medias/mediaDelete'),
        // Members
      adminAdd = require('./controllers/backend/users/adminAdd'),
      adminDelete = require('./controllers/backend/users/adminDelete'),
      memberDisplayList = require('./controllers/backend/users/memberDisplayList'),
      memberBan = require('./controllers/backend/users/memberBan'),
      memberUnban = require('./controllers/backend/users/memberUnban')

// ########################
//         Routes       
// ########################

    // Map
// Frontend
app.get ('/', welcome)
app.get ('/mediaOwnerMap', mediaOwnerMap)
app.get('/galleryDisplay', galleryDisplay)
app.get('/articles/display', articlesDisplay)
app.get('/userProfile/:userId', userProfile)
// Backend
app.get('/members/displayList', adminAuth, memberDisplayList)

    // Users
// Frontend
app.post ('/users/add', userCreate)
app.post('/users/login', userLogin )
app.get('/users/logout',auth, userLogout)
app.get('/users/profile/edit/:userId', auth, userProfileEdit)
app.post('/users/profile/update/:profileId', auth, userProfileUpdate)
// Backend
app.get('/admins/add/:userId', adminAuth, adminAdd)
app.get('/admins/delete/:userId', adminAuth, adminDelete)
app.get('/members/ban/:userId', adminAuth, memberBan)
app.get('/members/unban/:userId', adminAuth, memberUnban)

    // Medias
// Backend
app.get ('/medias/add', adminAuth, mediaAddForm)
app.post('/medias/create', adminAuth, validForm, mediaCreate)
app.get('/medias/edit/:id', adminAuth, mediaEdit)
app.post('/medias/update', adminAuth, validForm, mediaUpdate)
app.get('/medias/delete/:id', adminAuth, mediaDelete)

    // Articles
// Frontend
app.get('/articles/add', auth, articlesAdd)
app.post('/articles/create', auth, articleCreate)
app.get('/article/:articleId', articleSingle)
app.get('/article/edit/:articleId', auth, articleEdit)
app.post('/article/update/:articleId', auth, articleUpdate)
app.get('/article/delete/:articleId', auth, articleDelete)

    // Comments
// Frontend
app.post('/comments/add/:articleId', auth, commentAdd)
app.get('/comment/edit/:commentId', auth, commentEdit)
app.post('/comment/update/:commentId', auth, commentUpdate)
app.get('/comment/delete/:commentId/:articleId', auth, commentDelete)


// ########################
//         Run App
// ########################

app.listen(3001, () => {
    console.log('Le serveur tourne sur le port 3001');
});