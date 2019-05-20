const Users = require('../../models/User'),
      Articles = require('../../models/Articles')

module.exports = (req, res) => {
    let group = req.flash('data')[0],
        isOwner = false

    Users.find( async (error, user) => {
        // console.log(req.flash('data')[0]);
        if (error) {
            console.log(error);
        }

        if (req.session.userId === req.params.userId) {
            isOwner = true
        }

        const article = await Articles.find({})
        console.log(article);

        if (group === 'admin') {
            const admin = true
            res.render('frontendView/articles', { user, isOwner, admin, article })
        } else if (group === 'member') {
            const member = true
            res.render('frontendView/articles', { user, isOwner, member, article })
        } else {
            console.log(group);
            res.render('index');
        }
    })
}
