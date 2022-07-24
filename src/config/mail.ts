import nodemailer from 'nodemailer';

import HandlebardMailTemplate from './templates/mailTemplate';

interface IMailContact {
  name: string;
  email: string;
}

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

interface ISendEmail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class EtherealMail {
  static async sendMail({ to, from, subject, templateData }: ISendEmail) {
    const account = await nodemailer.createTestAccount();

    const mailTemplate = new HandlebardMailTemplate();

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
      from: {
        name: from?.name || 'Drica vendas',
        address: from?.email || `andreynaVendas@apidricavendas.com`,
      },
      to: {
        name: to?.name || 'Anônimo',
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });

    console.log('Id message', message.messageId);
    console.log('Id url mail', nodemailer.getTestMessageUrl(message));
  }
}
