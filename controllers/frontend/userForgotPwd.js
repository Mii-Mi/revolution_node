const nodemailer = require('nodemailer'),
      config = require('../../config')

module.exports = (req, res) => {

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
    let mailOptions = {
        from: '"miimi" <miimi@resistance.cf>', // sender address
        to: "peigne.cecile@free.fr", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>" // html body
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