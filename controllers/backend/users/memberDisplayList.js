const Users = require('../../../models/User')

module.exports = (req, res) => {
    
    const group = req.flash('data')[0]

    Users.find({userGroup: 0}, (error, admins) => {
        
        if (error){
            console.log(error);
        }

        Users.find({ userGroup: 1 }, (error, members) => {

            if (error) {
                console.log(error);
            }

            Users.find({ userGroup: 3 }, (error, banned) => {

                if (error) {
                        console.log(error);
                    }

                    if (group === 'admin') {
                        const admin = true
                        res.render('backendView/members/display_list', { admin, admins, members, banned })
                    } else {
                        req.flash('error', 'Vous devez être administrateur pour voir cette page !')
                    }

            })
        })
    })
}