const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const ProfileSchema = new mongoose.Schema({
    mood: {
        type: String,
        default: 'Pas d\'humeur exprimée pour l\'instant !'
    },
    location: {
        type: String,
        default: 'Pas de lieu renseigné pour l\'instant !'
    },
    age: {
        type: Number,
    },
    fbLink: {
        type: String,
        default: ''
    },
    twLink: {
        type: String,
        default: ''
    },
    userId: {
        type: String,
    },
    avatar: String,
    createDate: {
        type: Date,
        default: new Date()
    }
})

const Profiles = mongoose.model('Profiles', ProfileSchema);

module.exports = Profiles;