const Notes = require('../../../models/Notes')

module.exports = (req, res) => {
    Notes.findByIdAndUpdate(req.params.noteId, 
        {...req.body},
        (err, note) => {
            if (err) {
                console.log(err);
                req.flash('error', 'La modifiacation a échoué, veuillez réessayer')
                res.redirect(`/notes/edit/${req.params.noteId}`)
            }else{
                req.flash('success', 'Modification réussie !')
                res.redirect('/admin/welcome')
            }

        }) 
}