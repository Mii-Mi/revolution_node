const express = require('express'),
      router = express.Router()

// ########################
//       Middlewares    
// ########################

    // Users
const auth = require('../middlewares/auth'),
    adminAuth = require('../middlewares/adminAuth'),
    testUserGroup = require('../middlewares/testUserGroup')

router.use('*', testUserGroup)

    // Posts
const validForm = require('../middlewares/validForm')

// ########################
//       Controllers    
// ########################

    // Map
const welcome = require('../controllers/frontend/welcome'),
      mediaOwnerMap = require('../controllers/frontend/mediaOwnerMap'),
      galleryDisplay = require('../controllers/frontend/galleryDisplay'),
      articlesDisplay = require('../controllers/frontend/articlesDisplay'),
      userProfile = require('../controllers/frontend/userProfile'),

    // Users
      userCreate = require('../controllers/frontend/userCreate'),
      userLogin = require('../controllers/frontend/userLogin'),
      userLogout = require('../controllers/frontend/userLogout'),
      userProfileEdit = require('../controllers/frontend/userProfileEdit'),
      userProfileUpdate = require('../controllers/frontend/userProfileUpdate')

    // Medias
      mediaAddForm = require('../controllers/backend/medias/mediaAddForm'),
      mediaCreate = require('../controllers/backend/medias/mediaCreate'),
      mediaEdit = require('../controllers/backend/medias/mediaEdit'),

    // Articles
      articlesAdd = require('../controllers/frontend/articleAdd'),
      articleCreate = require('../controllers/frontend/articleCreate'),
      articleSingle = require('../controllers/frontend/articleSingle'),
      articleEdit = require('../controllers/frontend/articleEdit'),
      articleUpdate = require('../controllers/frontend/articleUpdate'),
      articleDelete = require('../controllers/frontend/articleDelete'),

    // Comments
      commentAdd = require('../controllers/frontend/commentAdd'),
      commentEdit = require('../controllers/frontend/commentEdit'),
      commentUpdate = require('../controllers/frontend/commentUpdate'),
      commentDelete = require('../controllers/frontend/commentDelete'),

        // Admin Backend
    // Medias
      mediaUpdate = require('../controllers/backend/medias/mediaUpdate'),
      mediaDelete = require('../controllers/backend/medias/mediaDelete'),
    // Members
      adminAdd = require('../controllers/backend/users/adminAdd'),
      adminDelete = require('../controllers/backend/users/adminDelete'),
      memberDisplayList = require('../controllers/backend/users/memberDisplayList'),
      memberBan = require('../controllers/backend/users/memberBan'),
      memberUnban = require('../controllers/backend/users/memberUnban')

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
router.get('/members/displayList', adminAuth, memberDisplayList)

    // Users
// Frontend
router.post('/users/add', userCreate)
router.post('/users/login', userLogin)
router.get('/users/logout', auth, userLogout)
router.get('/users/profile/edit/:userId', auth, userProfileEdit)
router.post('/users/profile/update/:profileId', auth, userProfileUpdate)
// Backend
router.get('/admins/add/:userId', adminAuth, adminAdd)
router.get('/admins/delete/:userId', adminAuth, adminDelete)
router.get('/members/ban/:userId', adminAuth, memberBan)
router.get('/members/unban/:userId', adminAuth, memberUnban)

    // Medias
// Backend
router.get('/medias/add', adminAuth, mediaAddForm)
router.post('/medias/create', adminAuth, validForm, mediaCreate)
router.get('/medias/edit/:id', adminAuth, mediaEdit)
router.post('/medias/update', adminAuth, validForm, mediaUpdate)
router.get('/medias/delete/:id', adminAuth, mediaDelete)

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

module.exports = router;