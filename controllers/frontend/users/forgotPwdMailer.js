const nodemailer = require('nodemailer'),
      config = require('../../../config'),
      Users = require('../../../models/User') 

module.exports = (req, res) => {

    Users.findOne({mail: req.body.mail}, (err, usr) => {
        if (err || !usr){
            req.flash('error', 'Erreur : Aucun utilisateur n\'a été trouvé pour cette adresse mail')
            res.redirect('/password/lost/form')
        }else{
            
            async function myCustomMethod(ctx){
                let cmd = await ctx.sendCommand(
                    'AUTH PLAIN ' +
                        Buffer.from(
                            '\u0000' + ctx.auth.credentials.user + '\u0000' + ctx.auth.credentials.pass,
                            'utf-8'
                        ).toString('base64')
                );
            
                if(cmd.status < 200 || cmd.status >=300){
                    throw new Error('Failed to authenticate user: ' + cmd.text);
                }
            }
            let transporter = nodemailer.createTransport({
                host: "resistance.cf",
                port: 25,
                secure: false, // true for 465, false for other ports
                auth: {
                    type: 'custom',
                    method: 'MY-CUSTOM-METHOD',
                    user: config.usr1,
                    pass: config.pass1
                },
                customAuth: {
                    'MY-CUSTOM-METHOD': myCustomMethod
                }
            });
            const lnk = `${usr._id}/${usr.lastVisit}`;

            let mailOptions = {
                from: '"miimi" <miimi@resistance.cf>', // sender address
                to: usr.mail, // list of receivers
                subject: "Mot de passe oublié", // Subject line
                text: `Bonjour ${usr.userName} !\n
                Pour réinitialiser votre mot de passe, veuillez cliquer le lien suivant, ou le copier dans la barre d'url de votre navigateur.\n
                       resistance.cf/users/password/edit/${lnk}`, // plain text body
                html: `<h1>Bonjour ${usr.userName} !</h1>
                <p>Pour réinitialiser votre mot de passe, veuillez cliquer le lien suivant, ou le copier dans la barre d\'url de votre navigateur.</p>\
                       <a href="https://resistance.cf/users/password/edit/${lnk}">resistance.cf/users/password/edit/${lnk}</a>`// html body
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.redirect('/')
                } else {
                    console.log('message sent: ' + info.response);
                    res.redirect('/')
                }
            })
        }
    })












    
}