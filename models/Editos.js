const mongoose = require('mongoose');

const EditoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Le champ "titre" est requis.']
    },
    content: {
        type: String,
        required: [true, 'Le champ "contenu" est requis.']
    },
    author: String,
    authorId: String,
    formatDate: String,
    active: {
        type: Boolean,
        default: false
    }
})

const Editos = mongoose.model('Editos', EditoSchema);

module.exports = Editos;