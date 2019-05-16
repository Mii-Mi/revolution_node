module.exports = (req, res) => {

    const group = res.locals.userGroup;
    console.log(group);
    

    

    // if (req.flash('data')[0] == 'admin'){
    //     const admin = 'admin'
    //     res.render('index', { admin });
    // } else if (req.flash('data')[0] == 'member'){
    //     const member = 'member'
    //     res.render('index', { member });
    // }else{
    //     res.render('index', { group });
    // }

    res.render('index', group);
}