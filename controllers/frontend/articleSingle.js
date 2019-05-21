const Articles = require('../../models/Articles'),
      Comments = require('../../models/Comments')

module.exports = async (req, res) => {
    
    const article = await Articles.findById(req.params.articleId);
    let isOwner = false

    const comment = await Comments.find({articleId: article._id})

    if (article.authorId === req.session.userId){
        isOwner = true;
    }
    console.log(isOwner);

    if (req.flash('data')[0] == 'admin') {
        const admin = true
        res.render('frontendView/articleSingle', { admin, isOwner, article, comment });
    } else if (req.flash('data')[0] == 'member') {
        const member = true
        res.render('frontendView/articleSingle', { member, isOwner, article, comment });
    } else {
        res.render('frontendView/articleSingle', { article, comment });
    }
}