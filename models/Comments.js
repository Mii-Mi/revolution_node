const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Le champ "contenu" est requis.']
    },
    author: String,
    authorId: String,
    articleId: String,
    createDate: {
        type: Date,
        default: new Date()
    }
})

const Comments = mongoose.model('Comments', CommentsSchema);

module.exports = Comments;