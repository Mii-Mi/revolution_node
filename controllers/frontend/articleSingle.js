const Articles = require('../../models/Articles'),
      Comments = require('../../models/Comments'),
      Users = require('../../models/User')

module.exports = async (req, res) => {
    
    Articles.findById(req.params.articleId, async (error, article) => {
        if(error){
            console.log(error);
        }

        req.session[`read` + req.params.articleId] = Date.now()

        let userIsAdmin = false,
            userIsBanned = false,
            userIsModo = false,
            userIsMember = false,
            isOwner = false

        Users.findById(article.authorId, async (error, usr) => {
            // console.log(req.flash('data')[0]);
            if (error) {
                console.log(error);

            }

            if (usr) {
                if (usr.userGroup === 0) {
                    userIsAdmin = true
                } else if (usr.userGroup === 1) {
                    userIsMember = true
                } else if (usr.userGroup === 2) {
                    userIsModo = true
                } else if (usr.userGroup === 3) {
                    userIsBanned = true
                }
            } else {
                userIsBanned = true
            }

            if (article.authorId === req.session.userId){
                isOwner = true;
            }
            
            await Comments.find({articleId: article._id}, async (error, comment) => {
                
                for( i = 0; i < comment.length; i++){

                    const comBody = {createDate: comment[i].createDate, _id: comment[i]._id, content: comment[i].content, author: comment[i].author, authorId: comment[i].authorId, articleId: comment[i].articleId, formatDate: comment[i].formatDate}

                    if (comment[i].authorId === req.session.userId){

                        comment[i] = {
                            ...comBody,
                            isCommentOwner: true
                        }
                    }else{
                        await Users.findById(comment[i].authorId, (error, comSender) => {
                            
                            if(error){
                                console.log(error);
                            }

                            switch (comSender.userGroup) {
                                case 0:
                                    comment[i] = {
                                        ...comBody,
                                        adminComment: true
                                    }
                                    break;
                                case 1:
                                    comment[i] = {
                                        ...comBody,
                                        memberComment: true
                                    }
                                    break;
                                case 2:
                                    comment[i] = {
                                        ...comBody,
                                        modoComment: true
                                    }
                                    break;
                                case 3:
                                    comment[i] = {
                                        ...comBody,
                                        bannedComment: true
                                    }
                                    break;
                            
                                default:
                                    comment[i] = {
                                        ...comBody,
                                        bannedComment: true
                                    }
                                    break;
                            }
                        })
                    }
                }
                res.render('frontendView/articleSingle', { isOwner, userIsAdmin, userIsModo, userIsMember, userIsBanned, article, comment })
            })
        })
    });
}