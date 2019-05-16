module.exports = (req, res) => {

    if (req.flash('data')[0] == 'admin'){
        const admin = 'admin'
        res.render('index', { admin });
    } else if (req.flash('data')[0] == 'member'){
        const member = 'member'
        return res.render('index', { member });
    }else{
        return res.render('index');
    }
}