const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
        required: [true, 'Le champ "contenu" est requis.']
    },
    author: String,
    authorId: String,
    formatDate: String,
})

const Notes = mongoose.model('Notes', NoteSchema);

module.exports = Notes;