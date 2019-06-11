const mongoose = require('mongoose'),
      bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Le champ "nom" est requis.'],
        unique: true
    },
    mail: {
        type: String,
        required: [true, 'Le champ "Email" est requis.'],
        unique: true
    },
    pass: {
        type: String,
        required: [true, 'Le champ "Mot de passe" est requis.']
    },
    userGroup : {
        type: Number
    },
    lastVisit: Number
})

UserSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.pass, 10, (error, encrypted) => {
        user.pass = encrypted;
        next()
    })
})

const User = mongoose.model('User', UserSchema);

module.exports = User;