module.exports = (req, res) => {


    const obj = require('../../public/js/result.json');
    
    if (req.flash('data')[0] === 'admin') {
        const admin = true
        console.log(admin);
        res.render('frontendView/articles', { obj, admin });
    } else if (req.flash('data')[0] === 'member') {
        const member = true
        console.log(member);
        res.render('frontendView/articles', { obj, member });
    } else {
        res.render('frontendView/articles', { obj });
    }
}
