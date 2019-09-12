const express = require('express'),
      swaggerUi = require('swagger-ui-express'),
      swaggerDocument = require('../assets/swagger.json'),
      router = express.Router()

      // ########################
      //       Middlewares    
      // ########################

    // Doc
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

    // Users
const auth = require('../middlewares/auth'),
      authModo =require('../middlewares/authModo'),
      adminAuth = require('../middlewares/adminAuth'),
      testUserGroup = require('../middlewares/testUserGroup')

router.use('*', testUserGroup)

    // Posts
const validForm = require('../middlewares/validForm')

    // Mp
const newMpTest = require('../middlewares/newMpTest')

router.use('*', newMpTest)

// ########################
//       Controllers    
// ########################

    // Map
const welcome = require('../controllers/frontend/welcome'),
      mediaOwnerMap = require('../controllers/frontend/medias/mediaOwnerMap'),
      galleryDisplay = require('../controllers/frontend/medias/galleryDisplay'),
      articlesDisplay = require('../controllers/frontend/articles/articlesDisplay'),
      userProfile = require('../controllers/frontend/users/userProfile'),

    // Users
      userCreate = require('../controllers/frontend/users/userCreate'),
      userLogin = require('../controllers/frontend/users/userLogin'),
      userLogout = require('../controllers/frontend/users/userLogout'),
      userProfileEdit = require('../controllers/frontend/users/userProfileEdit'),
      userProfileUpdate = require('../controllers/frontend/users/userProfileUpdate'),
      userForgotPwdform = require('../controllers/frontend/users/forgotPwdForm'),
      userForgotPwdMailer = require('../controllers/frontend/users/forgotPwdMailer'),
      userPwdEdit = require('../controllers/frontend/users/userPwdEdit'),
      userPwdupdate = require('../controllers/frontend/users/userPwdUpdate'),

    // Articles
      articlesAdd = require('../controllers/frontend/articles/articleAdd'),
      articleCreate = require('../controllers/frontend/articles/articleCreate'),
      articleSingle = require('../controllers/frontend/articles/articleSingle'),
      articleEdit = require('../controllers/frontend/articles/articleEdit'),
      articleUpdate = require('../controllers/frontend/articles/articleUpdate'),
      articleDelete = require('../controllers/frontend/articles/articleDelete'),

    // Comments
      commentAdd = require('../controllers/frontend/comments/commentAdd'),
      commentEdit = require('../controllers/frontend/comments/commentEdit'),
      commentUpdate = require('../controllers/frontend/comments/commentUpdate'),
      commentDelete = require('../controllers/frontend/comments/commentDelete'),

    // Mp
      mpAdd = require('../controllers/frontend/mp/mpAdd'),
      mpCreate = require('../controllers/frontend/mp/mpCreate'),
      mpListDisplay = require('../controllers/frontend/mp/mpListDisplay'),
      mpSingleDisplay = require('../controllers/frontend/mp/mpSingleDisplay'),
      mpEdit = require('../controllers/frontend/mp/mpEdit'),
      mpUpdate = require('../controllers/frontend/mp/mpUpdate'),
      mpDelete = require('../controllers/frontend/mp/mpDelete'),
      mpRespCreate = require('../controllers/frontend/mp/mpRespCreate'),
      mpRespEdit = require('../controllers/frontend/mp/mpRespEdit'),
      mpRespUpdate = require('../controllers/frontend/mp/mpRespUpdate'),
      mpRespDelete = require('../controllers/frontend/mp/mpRespDelete'),

    // Admin Backend
        // Map
      adminWelcome = require('../controllers/backend/adminWelcome'),
        // Medias
      mediaAddForm = require('../controllers/backend/medias/mediaAddForm'),
      mediaCreate = require('../controllers/backend/medias/mediaCreate'),
      mediaEdit = require('../controllers/backend/medias/mediaEdit'),
      mediaUpdate = require('../controllers/backend/medias/mediaUpdate'),
      mediaDelete = require('../controllers/backend/medias/mediaDelete'),
      mediaList = require('../controllers/backend/medias/list'),
      mediaActive = require('../controllers/backend/medias/active'),
      mediaUnactive = require('../controllers/backend/medias/unactive'),
        // Members
      adminAdd = require('../controllers/backend/users/adminAdd'),
      adminDelete = require('../controllers/backend/users/adminDelete'),
      memberDisplayList = require('../controllers/backend/users/memberDisplayList'),
      memberBanlist = require('../controllers/backend/users/memberBanlist'),
      memberBanForm = require('../controllers/backend/users/memberBanForm'),
      memberBan = require('../controllers/backend/users/memberBan'),
      memberUnban = require('../controllers/backend/users/memberUnban'),
      modoAdd = require('../controllers/backend/users/modoAdd'),
        // Editos
      editoList = require('../controllers/backend/editos/displayList'),
      editoAdd = require('../controllers/backend/editos/add'),
      editoCreate = require('../controllers/backend/editos/create'),
      editoEdit = require('../controllers/backend/editos/edit'),
      editoUpdate = require('../controllers/backend/editos/update'),
      editoDelete = require('../controllers/backend/editos/delete'),
      editoActive = require('../controllers/backend/editos/active'),
      editoUnactive = require('../controllers/backend/editos/unactive'),
        // Notes
      noteAdd = require('../controllers/backend/notes/add'),
      noteCreate = require('../controllers/backend/notes/create'),
      noteEdit = require('../controllers/backend/notes/edit'),
      noteUpdate = require('../controllers/backend/notes/update'),
      noteDelete = require('../controllers/backend/notes/delete')

// ########################
//         Routes       
// ########################

// Map
    // Frontend
router.get('/', welcome)
router.get('/mediaOwnerMap', mediaOwnerMap)
router.get('/galleryDisplay', galleryDisplay)
router.get('/articles/display', articlesDisplay)
router.get('/userProfile/:userId', userProfile)
    // Backend
router.get('/members/displayList', authModo, memberDisplayList)
router.get('/members/banlist', authModo, memberBanlist)
router.get('/admin/welcome', authModo, adminWelcome)

// Users
    // Frontend
router.post('/users/add', userCreate)
router.post('/users/login', userLogin)
router.get('/users/logout', auth, userLogout)
router.get('/users/profile/edit/:userId', auth, userProfileEdit)
router.post('/users/profile/update/:profileId', auth, userProfileUpdate)
router.get('/password/lost/form', userForgotPwdform)
router.post('/password/lost', userForgotPwdMailer)
router.get('/users/password/edit/:usrId/:usrTstamp', userPwdEdit)
router.post('/users/password/update/:usrId', userPwdupdate)
    // Backend
router.get('/admins/add/:userId', adminAuth, adminAdd)
router.get('/admins/delete/:userId', adminAuth, adminDelete)
router.get('/members/banForm/:userId', authModo, memberBanForm)
router.post('/members/ban/:userId', authModo, memberBan)
router.get('/members/unban/:userId', authModo, memberUnban)
router.get('/modos/add/:userId', adminAuth, modoAdd)

// Medias
    // Backend
router.get('/medias/add', adminAuth, mediaAddForm)
router.post('/medias/create', adminAuth, validForm, mediaCreate)
router.get('/medias/edit/:id', adminAuth, mediaEdit)
router.post('/medias/update', adminAuth, validForm, mediaUpdate)
router.get('/medias/delete/:id', adminAuth, mediaDelete)
router.get('/medias/list', adminAuth, mediaList)
router.get('/medias/active/:mediaId', adminAuth, mediaActive)
router.get('/medias/unactive/:mediaId', adminAuth, mediaUnactive)

// Articles
    // Frontend
router.get('/articles/add', auth, articlesAdd)
router.post('/articles/create', auth, articleCreate)
router.get('/article/:articleId', articleSingle)
router.get('/article/edit/:articleId', auth, articleEdit)
router.post('/article/update/:articleId', auth, articleUpdate)
router.get('/article/delete/:articleId', auth, articleDelete)

// Comments
    // Frontend
router.post('/comments/add/:articleId', auth, commentAdd)
router.get('/comment/edit/:commentId', auth, commentEdit)
router.post('/comment/update/:commentId', auth, commentUpdate)
router.get('/comment/delete/:commentId/:articleId', auth, commentDelete)

// Mp
    // Frontend
router.route('/mp/add/:destId/:dest')
    .get(auth, mpAdd)
    .post(auth, mpCreate)

router.get('/mp/list/:userId', auth, mpListDisplay)
router.get('/mp/single/:mpId', auth, mpSingleDisplay)
router.route('/mp/:mpId')
    .get(auth, mpEdit)
    .post(auth, mpUpdate)

router.get('/mp/delete/:mpId', auth, mpDelete)
router.post('/mp/response/create/:mpId', auth, mpRespCreate)
router.get('/mp/response/edit/:mpRespId', auth, mpRespEdit)
router.post('/mp/response/update/:mpRespId', auth, mpRespUpdate)
router.get('/mp/response/delete/:mpRespId/:mpId', auth, mpRespDelete)

// Edito
    // Backend
router.get('/editos/add', adminAuth, editoAdd)
router.post('/editos/create', adminAuth, editoCreate)
router.get('/editos/list', adminAuth, editoList)
router.get('/editos/edit/:editoId', adminAuth, editoEdit)
router.post('/editos/update/:editoId', adminAuth, editoUpdate)
router.get('/editos/delete/:editoId', adminAuth, editoDelete)
router.get('/editos/active/:editoId', adminAuth, editoActive)
router.get('/editos/unactive/:editoId', adminAuth, editoUnactive)

// Notes
    // Backend
router.get('/notes/add', authModo, noteAdd)
router.post('/notes/create', authModo, noteCreate)
router.get('/notes/edit/:noteId', authModo, noteEdit)
router.post('/notes/update/:noteId', authModo, noteUpdate)
router.get('/notes/delete/:noteId', authModo, noteDelete)

module.exports = router;