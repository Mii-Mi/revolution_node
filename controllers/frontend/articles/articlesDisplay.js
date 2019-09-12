const Users = require('../../../models/User'),
      Articles = require('../../../models/Articles')

module.exports = async (req, res) => {

    let title = 'Fil d\'actualités - '

    await Articles.find({}, null, { sort: { tStamp: -1 } }, async (err, article) => {

        if(err){
            console.log(err);
            return res.redirect('/articles/display')
        }
        for (i = 0; i < article.length; i++) {

            let artBody = {_id: article[i]._id, title: article[i].title, content: article[i].content, author: article[i].author, authorId: article[i].authorId, formatDate: article[i].formatDate}


            if (article[i] && article[i].tStamp >= req.session.lastVisit) {
                if (req.session['read' + article[i]._id] && req.session['read' + article[i]._id] >= article[i].tStamp) {

                    artBody = {
                        ...artBody,
                        read: true
                    }
                }else{

                    artBody = {
                        ...artBody,
                        read: false
                    }
                }
            } else {
                artBody = {
                    ...artBody,
                    read: true
                }
            }
            await Users.findById(artBody.authorId, (error, usr) =>{

                if (error){
                    console.log(error);
                    return res.redirect('/articles/display')
                }
                
                if (artBody.authorId === req.session.userId){
                    article[i] = {
                        ...artBody,
                        read: artBody.read,
                        isOwner: true
                    }
                }else{
                    switch (usr.userGroup) {
                        case 0:
                            article[i] ={
                                ...artBody,
                                read: artBody.read,
                                adminArt: true
                            }
                            break;
                        case 1:
                            article[i] ={
                                ...artBody,
                                read: artBody.read,
                                memberArt: true
                            }
                            break;
                        case 2:
                            article[i] ={
                                ...artBody,
                                read: artBody.read,
                                modoArt: true
                            }
                            break;
                        case 3:
                            article[i] ={
                                ...artBody,
                                read: artBody.read,
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
