import nodemailer from 'nodemailer';
import { MailService, SendMailData } from "../mailService";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "1bbb37fce1c148",
      pass: "a94af3d78a94f3"
    }
});

export class NodemailerMailService implements MailService{
    async sendMail({body, subject}: SendMailData){
        await transport.sendMail({
            from: 'Equipe FeedGet <oi@feedget.com>',
            to: 'Emanoel Augusto <emanoelaugusto7@gmail.com>',
            subject,
            html: body
        })
    }
}