const Mp = require('../../models/Mp'),
      User = require('../../models/User'),
      dateFormat = require('dateformat')


module.exports = (req, res) => {
    let date = Date.now()

    User.findById(req.session.userId, (error, user) => {
        // console.log(req.flash('data')[0]);
        if (error) {
            console.log(error);
        }

        Mp.create(
            {
                ...req.body,
                author: user.userName,
                authorId: user._id,
                destId: req.params.destId,
                dest: req.params.dest,
                formatDate: (dateFormat(date, "dd mm yyyy à HH:MM:ss")),
                tStamp: Date.now()
            },
            (error, mp) => {
                if (error) {
                    console.log(error);
                    req.flash('error', 'Erreur lors de la création de la conversation');
                } else {
                    req.flash('success', 'Conversation créée avec succes !');
                }
                res.redirect(`/mp/single/${mp._id}`)
            })

    })
}