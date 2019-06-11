const Users = require('../../models/User'),
      Articles = require('../../models/Articles')

module.exports = async (req, res) => {
    let group = req.flash('data')[0]

    if (!req.session.lastVisit) {
        const usr = await Users.findById(req.session.userId)

        if (usr.lastVisit) {
            req.session.lastVisit = usr.lastVisit
        } else {
            req.session.lastVisit = 0
        }
        Users.findByIdAndUpdate(req.session.userId, { lastVisit: Date.now() }, (err, mem) => {
            if (err) {
                console.log(err);
            }
        })
    } else {
        Users.findByIdAndUpdate(req.session.userId, { lastVisit: Date.now() }, (err, mem) => {
            if (err) {
                console.log(err);
            }
        })
    }

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
            if (group === 'admin') {
                const admin = true
                res.render('frontendView/articles', { usr, admin, article })
            } else if (group === 'member') {
                const member = true
                res.render('frontendView/articles', { usr, member, article })
            } else {
                console.log(group);
                res.render('frontendView/articles', { article });
            }
        })
    })
}
