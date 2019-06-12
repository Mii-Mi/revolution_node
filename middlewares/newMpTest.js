const User = require('../models/User'),
      Mp = require('../models/Mp')

module.exports = async(req, res, next) => {
    if (!req.session.lastVisit) {
        const usr = await User.findById(req.session.userId)

        if (usr && usr.lastVisit) {
            req.session.lastVisit = usr.lastVisit
        } else {
            req.session.lastVisit = 0
        }
        User.findByIdAndUpdate(req.session.userId, { lastVisit: Date.now() }, (err, mem) => {
            if (err) {
                console.log(err);
            }
        })
    } else {
        User.findByIdAndUpdate(req.session.userId, { lastVisit: Date.now() }, (err, mem) => {
            if (err) {
                console.log(err);
            }
        })
    }

    await Mp.find({ $or: [{ 'authorId': req.session.userId }, { 'destId': req.session.userId }] }, (error, mp) => {

        for (i = 0; i < mp.length; i++) {

            if (mp[i].tStamp >= req.session.lastVisit) {
                if (req.session['read' + mp[i]._id] && req.session['read' + mp[i]._id] >= mp[i].tStamp) {
                    res.locals.newMp = false
                }else{
                    res.locals.newMp = true
                }
            } else {
                res.locals.newMp = false
            }
        }
    })
    next()
}