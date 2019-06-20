const Notes = require('../../../models/Notes'),
      Users = require('../../../models/User'),
      dateFormat = require('dateformat')

module.exports = (req, res) => {
    let date = Date.now()

    Users.findById(req.session.userId, (error, user) => {
        // console.log(req.flash('data')[0]);
        if (error) {
            console.log(error);
        }

        Notes.create(
            {
                ...req.body,
                author: user.userName,
                authorId: user._id,
                formatDate: (dateFormat(date, "dd mm yyyy à HH:MM:ss")),
            },
            (error, note) => {
                if (error) {
                    console.log(error);
                    req.flash('error', 'Erreur lors de la création de la note');
                } else {
                    req.flash('success', 'Note créée avec succes !');
                }
                res.redirect('/admin/welcome')
            })

    })
}