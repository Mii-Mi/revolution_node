const User = require('../../../models/User'),
      Articles = require('../../../models/Articles');

module.exports = (req, res) => {
    let title = 'Modifier article - '
    User.findById(req.session.userId, async (error, usr) => {

        const article = await Articles.findById(req.params.articleId);
        res.render('frontendView/articles/edit', { article, title })
    })
}