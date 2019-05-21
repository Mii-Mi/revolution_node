const User = require('../../models/User'),
      Articles = require('../../models/Articles');

module.exports = (req, res) => {
    User.findById(req.session.userId, async (error, user) => {

        const article = await Articles.findById(req.params.articleId);
        res.render('frontendView/articles/edit', { article, user })
    })
}