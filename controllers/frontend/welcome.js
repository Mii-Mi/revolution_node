module.exports = (req, res) => {

    if (req.flash('data')[0] == 'admin'){
        const admin = true
        res.render('index', { admin });
    } else if (req.flash('data')[0] == 'member'){
        const member = true
        res.render('index', { member });
    }else{
        res.render('index');
    }
}