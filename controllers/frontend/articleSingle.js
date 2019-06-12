const Articles = require('../../models/Articles'),
      Comments = require('../../models/Comments')

module.exports = async (req, res) => {
    
    let isOwner = false

    Articles.findById(req.params.articleId, async (error, article) => {
        if(error){
            console.log(error);
        }

        req.session[`read` + req.params.articleId] = Date.now()

        
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
                        formatDate: comment[i].formatDate,
                        isCommentOwner: true
                    }
                }
            }
            
            res.render('frontendView/articleSingle', { isOwner, article, comment })

        })
    });
}