const Notes = require('../../../models/Notes')

module.exports = (req, res) => {

    Notes.findById(req.params.noteId, (err, note) => {

        res.render('backendView/notes/edit', { layout: 'admin', note })
    })
}