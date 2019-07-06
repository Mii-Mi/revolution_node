const Users = require('../../../models/User')

module.exports = (req, res) => {
    Users.findById(req.params.destId, (error, dest) => {

        res.render('frontendView/private/add', { dest })
    })
}