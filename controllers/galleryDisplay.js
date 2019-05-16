const Medias = require('../models/Medias')

module.exports = async (req, res) => {
    // console.log(req.flash('data')[0]);
    
    const media = await Medias.find({})

    if (req.flash('data')[0] === 'admin'){
        const admin = true
        console.log(admin);
        res.render('frontendView/gallery', { admin, media });
    } else if (req.flash('data')[0] === 'member'){
        const member = true
        console.log(member);
        res.render('frontendView/gallery', { media, member });
    }else{
        res.render('frontendView/gallery', { media });
    }
}