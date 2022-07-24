import nodemailer from 'nodemailer';

interface ISendEmail {
  to: string;
  body: string;
}

export default class EtherealMail {
  static async sendMail({ to, body }: ISendEmail) {
    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    const message = await transporter.sendMail({
      from: `andreynaVendas@apidricavendas.com`,
      to,
      subject: 'Recuperação de Senha',
      text: body,
    });

    console.log('Id message', message.messageId);
    console.log('Id url mail', nodemailer.getTestMessageUrl(message));
  }
}
