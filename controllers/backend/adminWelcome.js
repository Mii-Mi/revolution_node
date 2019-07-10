const Notes = require('../../models/Notes')

module.exports = async (req, res) => {
    let title = 'Panneau d\'administration - '

    await Notes.find({}, null, {sort :{_id: -1}}, (err, note) => {

        for(i=0; i < note.length; i++){
            if(note[i].authorId === req.session.userId){
                note[i] = {
                _id: note[i]._id,
                title: note[i].title,
                content: note[i].content,
                author: note[i].author,
                authorId: note[i].authorId,
                formatDate: note[i].formatDate,
                isOwner: true
                }
            }
        }
        res.render('backendView/adminWelcome', {layout: 'admin', note})
    })
}