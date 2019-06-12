const Users = require('../../models/User'),
      Articles = require('../../models/Articles')

module.exports = async (req, res) => {

    Users.find( async (error, usr) => {
        // console.log(req.flash('data')[0]);
        if (error) {
            console.log(error);
        }

        await Articles.find({}, null, { sort: { tStamp: -1 } }, (err, article) => {

            if(err){
                console.log(err);
            }
            for (i = 0; i < article.length; i++) {
                

                if (article[i].tStamp >= req.session.lastVisit) {
                    if (req.session['read' + article[i]._id] && req.session['read' + article[i]._id] >= article[i].tStamp) {

                        article[i] = {
                            _id: article[i]._id,
                            title: article[i].title,
                            content: article[i].content,
                            author: article[i].author,
                            authorId: article[i].authorId,
                            createDate: article[i].createDate,
                            read: true
                        }
                    }
                } else {
                    article[i] = {
                        _id: article[i]._id,
                        title: article[i].title,
                        content: article[i].content,
                        author: article[i].author,
                        authorId: article[i].authorId,
                        createDate: article[i].createDate,
                        read: true
                    }
                }
            }
            res.render('frontendView/articles', { usr, article })
        })
    })
}
