const Articles = require('../../models/Articles')

module.exports = async (req, res) => {
    
    const article = await Articles.findById(req.params.articleId);
    let isOwner = false

    if (article.authorId == req.session.id){
        isOwner = true;
    }
    console.log(isOwner);
    

    if (req.flash('data')[0] == 'admin') {
        const admin = true
        res.render('frontendView/articleSingle', { admin, isOwner, article });
    } else if (req.flash('data')[0] == 'member') {
        const member = true
        res.render('frontendView/articleSingle', { member, isOwner, article });
    } else {
        res.render('frontendView/articleSingle', { article });
    }
}