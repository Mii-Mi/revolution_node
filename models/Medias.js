const mongoose = require('mongoose');

const MediasSchema = new mongoose.Schema({
    link: String,
    title: String,
    image: String,
    content: String,
    fbLink: String,
    twLink: String
})

const Medias = mongoose.model('Medias', MediasSchema);

module.exports = Medias;