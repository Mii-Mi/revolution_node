const Mp = require('../../models/Mp');

module.exports = (req, res) => {

    Mp.findById(req.params.mpId, (error, mp) => {

        if (req.flash('data')[0] === 'admin') {
            const admin = true
            res.render('frontendView/private/edit', { mp, admin })
        } else if (req.flash('data')[0] === 'member') {
            const member = true
            res.render('frontendView/private/edit', { mp, member })
        } else {
            res.render('frontendView/private/edit', { mp })
        }
    })
}