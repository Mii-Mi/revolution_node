const Articles = require('../../models/Articles'),
      Users = require('../../models/User'),
      dateFormat = require('dateformat')

module.exports = (req, res) => {
    let date = Date.now()

    Users.findById(req.session.userId, (error, user) => {
        // console.log(req.flash('data')[0]);
        if (error) {
            console.log(error);
        }
        
        Articles.create(
            {
                ...req.body,
                author: user.userName,
                authorId: user._id,
                formatDate: (dateFormat(date, "dd mm yyyy à HH:MM:ss")),
                tStamp: Date.now()
            },
            (error, post) => {
                if (error) {
                    console.log(error);
                    req.flash('error', 'Erreur lors de la création de l\'article');
                } else {
                    req.flash('success', 'Article créé avec succes !');
                }
                res.redirect('/articles/display')
            })

    })
}