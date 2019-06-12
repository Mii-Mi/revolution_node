const mongoose = require('mongoose')

const ConversationSchema = new mongoose.Schema({
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
    dest: String,
    destId: String,
    formatDate: String,
    tStamp: Number,
})

const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = Conversation;