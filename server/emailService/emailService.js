const fs = require('fs');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
require('dotenv').config();

class EmailService {
    static emailTypes = {
        Welcome: {
            subject: 'Thank you for creating an account!',
            fileName: 'welcomeMail'
        },

    }

    /**
     * @param {Object} userData 
     */
    static SendWelcomeEmail(userData) {
        this.SendEmail(userData, this.emailTypes.Welcome);
    }

    /**
     * @param {Object} userData 
     * @param {emailType} emailType 
     */
    static SendEmail(userData, emailType) {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.Gmail_Mail,
                pass: process.env.Gmail_App_Key
            }
        });

        const welcomeTemplatePath = `${process.cwd()}\\server\\emailService\\emailTemplates\\${emailType.fileName}.hbs`;
        const welcomeTemplate = fs.readFileSync(welcomeTemplatePath, 'utf8');

        // Compile the html text
        const compiledWelcomeTemplate = handlebars.compile(welcomeTemplate);

        const compilerData = {
            username: userData?.user || userData?.email.split('@').shift() || '',
            activateLink: `http://127.0.0.1:3000/account/verification?token=${userData.verificationToken}&activate=true`,
            deactivateLink: `http://127.0.0.1:3000/account/verification?token=${userData.verificationToken}&activate=false`
        };

        // Replace all templated parameters
        const parsedWelcomeTemplate = compiledWelcomeTemplate(compilerData);

        const mailOptions = {
            from: process.env.Gmail_Mail,
            to: userData?.email || 'valentinbanica8@gmail.com',
            subject: emailType.subject,
            html: parsedWelcomeTemplate
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err)
                console.log(err);
            else
                console.log(`Email sent: ${JSON.stringify(info)}`);
        });
    }
}

// ?TEST
// EmailService.SendWelcomeEmail({
//     username: 'Mister guy',
//     activateLink: 'https://google.com'
// });

module.exports = {
    EmailService
};  