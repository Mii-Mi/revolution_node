const mongoose = require('mongoose');

const ArticlesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Le champ "titre" est requis.']
    },
    content: {
        type: String,
        required: [true, 'Le champ "contenu" est requis.']
    },
    author: String
})

const Articles = mongoose.model('Articles', ArticlesSchema);

module.exports = Articles;