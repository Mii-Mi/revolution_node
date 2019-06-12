const mongoose = require('mongoose')

const MpRespSchema = new mongoose.Schema({

    content: {
        type: String,
        required: [true, 'Le champ "contenu" est requis.']
    },
    senderName: String,
    senderId: String,
    mpId: String,
    formatDate: {
        type: String,
    },
    tStamp: Number
})

const MpResp = mongoose.model('MpResp', MpRespSchema);

module.exports = MpResp;