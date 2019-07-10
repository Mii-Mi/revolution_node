const Mp = require('../../../models/Mp'),
      Users = require('../../../models/User')

module.exports = async (req, res) => {

    let title = 'Boîte de messagerie privée - '
    await Mp.find({ $or: [{ 'authorId': req.params.userId }, { 'destId': req.params.userId }] }, null, { sort: { tStamp: -1 } }, (error, mp) => {

        for (i = 0; i < mp.length; i++) {

            if (mp[i].tStamp >= req.session.lastVisit) {
                if (req.session['read' + mp[i]._id] && req.session['read' + mp[i]._id] >= mp[i].tStamp) {

                    mp[i] = {
                        _id: mp[i]._id,
                        title: mp[i].title,
                        content: mp[i].content,
                        author: mp[i].author,
                        authorId: mp[i].authorId,
                        dest: mp[i].dest,
                        destId: mp[i].destId,
                        formatDate: mp[i].formatDate,
                        read: true
                    }
                }
            } else {
                mp[i] = {
                    _id: mp[i]._id,
                    title: mp[i].title,
                    content: mp[i].content,
                    author: mp[i].author,
                    authorId: mp[i].authorId,
                    dest: mp[i].dest,
                    destId: mp[i].destId,
                    formatDate: mp[i].formatDate,
                    read: true
                }
            }
        }
        res.render('frontendView/private/listDisplay', { mp, title })
    })
}