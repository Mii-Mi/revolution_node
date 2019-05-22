const Articles = require('../../models/Articles'),
      Comments = require('../../models/Comments')

module.exports = async (req, res) => {
    
    let isOwner = false,
        group = req.flash('data')[0],
        isCommentOwner = false

    Articles.findById(req.params.articleId, async (error, article) => {
        if(error){
            console.log(error);
        }
        
        if (article.authorId === req.session.userId){
            isOwner = true;
        }
        
        await Comments.find({articleId: article._id}, (error, comment) => {
            
            for( i = 0; i < comment.length; i++){
                if (comment[i].authorId === req.session.userId){

                    comment[i] = {
                        createDate: comment[i].createDate,
                        _id: comment[i]._id,
                        content: comment[i].content,
                        author: comment[i].author,
                        authorId: comment[i].authorId,
                        articleId: comment[i].articleId,
                        isCommentOwner: true
                    }
                }
            }
            
            if (group === 'admin') {
                const admin = true
                return res.render('frontendView/articleSingle', { admin, isOwner, article, comment });
                
            } else if (group === 'member') {
                const member = true
                return res.render('frontendView/articleSingle', { member, isOwner, article, comment });
                
            } else {
                return res.render('frontendView/articleSingle', { article, comment });
            }

        })
    });
}