const Notes = require('../../../models/Notes')

module.exports = (req, res) => {
    let title = 'Modifier une note interne - '

    Notes.findById(req.params.noteId, (err, note) => {

        res.render('backendView/notes/edit', { layout: 'admin', note, title })
    })
}