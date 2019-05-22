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
            console.log(comment);
            
            if (comment.authorId === req.session.userId){
                isCommentOwner = true
            }


            if (group == 'admin') {
                const admin = true
                return res.render('frontendView/articleSingle', { admin, isOwner, isCommentOwner, article, comment });
                
            } else if (group == 'member') {
                const member = true
                return res.render('frontendView/articleSingle', { member, isOwner, isCommentOwner, article, comment });
                
            } else {
                return res.render('frontendView/articleSingle', { article, comment });
            }

        })
    });

    


    
    
    
}