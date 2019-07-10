const Users = require('../../../models/User')

module.exports = (req, res) => {
    let title = 'Rédiger un message privé - '
    Users.findById(req.params.destId, (error, dest) => {

        res.render('frontendView/private/add', { dest, title })
    })
}