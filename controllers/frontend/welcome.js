const Editos = require('../../models/Editos')

module.exports = async (req, res) => {
    let title = 'Accueil - '
    await Editos.find({}, null, { sort: { _id: -1 } }, (err, edito) => {
        if (err){
            console.log(err);
        }
        
        res.render('index', {edito, title});
    })
}