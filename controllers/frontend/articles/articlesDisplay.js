const Users = require('../../../models/User'),
      Articles = require('../../../models/Articles')

module.exports = async (req, res) => {

    let title = 'Fil d\'actualités - '

    await Articles.find({}, null, { sort: { tStamp: -1 } }, async (err, article) => {

        if(err){
            console.log(err);
        }
        for (i = 0; i < article.length; i++) {

            let artBody = {_id: article[i]._id, title: article[i].title, content: article[i].content, author: article[i].author, authorId: article[i].authorId, formatDate: article[i].formatDate}

            if (article[i].tStamp >= req.session.lastVisit) {
                if (req.session['read' + article[i]._id] && req.session['read' + article[i]._id] >= article[i].tStamp) {

                    article[i] = {
                        ...artBody,
                        read: true
                    }
                }
            } else {
                article[i] = {
                    ...artBody,
                    read: true
                }
            }
            await Users.findById(article[i].authorId, (error, usr) =>{

                if (article[i].authorId === req.session.userId){
                    article[i] = {
                        ...artBody,
                        read: article[i].read,
                        isOwner: true
                    }
                }else{
                    switch (usr.userGroup) {
                        case 0:
                            article[i] ={
                                ...artBody,
                                read: article[i].read,
                                adminArt: true
                            }
                            break;
                        case 1:
                            article[i] ={
                                ...artBody,
                                read: article[i].read,
                                memberArt: true
                            }
                            break;
                        case 2:
                            article[i] ={
                                ...artBody,
                                read: article[i].read,
                                modoArt: true
                            }
                            break;
                        case 3:
                            article[i] ={
                                ...artBody,
                                read: article[i].read,
                                bannedArt: true
                            }
                            break;
                    
                        default:
                            console.log('no userGroup');
                            break;
                    }
                }
                
            })
        }
        res.render('frontendView/articles/articles', { article, title })
    })
}
