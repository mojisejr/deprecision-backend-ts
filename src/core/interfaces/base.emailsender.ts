export interface IEmailSender {
  sendEmail(mailoptions: any): void | Promise<void>;
}
