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

        
        const article = await Articles.find({}).sort({ _id: -1 })

        if (group === 'admin') {
            const admin = true
            
            res.render('frontendView/articles', { user, admin, article })
        } else if (group === 'member') {
            const member = true
            res.render('frontendView/articles', { user, member, article })
        } else {
            console.log(group);
            res.render('frontendView/articles', { article });
        }
    })
}
