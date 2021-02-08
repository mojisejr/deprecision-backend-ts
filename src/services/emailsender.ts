import { injectable } from "inversify";
import { IEmailSender } from "./../core/interfaces/base.emailsender";
import nodemailer, { TransportOptions } from "nodemailer";
import { resolve } from "path";
//SMTP mailsender

interface Options extends TransportOptions {
  host: string;
  port: string | number;
  auth: {
    user: string;
    pass: string;
  };
  rejectUnauthorized: boolean;
}

@injectable()
export class EmailSender implements IEmailSender {
  async sendEmail(options: any) {
    return;
  }
}
// dev-email-sender class
// export class EmailSender implements IEmailSender {
//   async sendEmail(options: any) {
//     const transporter = nodemailer.createTransport({
//       host: process.env.SYSTEM_EMAIL_HOST,
//       port: process.env.SYSTEM_EMAIL_PORT,
//       auth: {
//         //must use process.env
//         user: process.env.SYSTEM_EMAIL_USERNAME,
//         pass: process.env.SYSTEM_EMAIL_PASSWORD,
//         //ใช้gmailไม่ปลอดภัย
//       },
//       rejectUnauthorized: false,
//     } as Options);

//     const mailOptions = {
//       from: "Deprecision.Co <nonthasak.l@gmail.com>",
//       to: options.email,
//       subject: options.subject,
//       text: options.message,
//       // html:
//     };

//     await transporter.sendMail(mailOptions);
//   }
// }
