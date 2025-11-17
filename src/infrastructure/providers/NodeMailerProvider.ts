import nodemailer, { Transporter } from 'nodemailer';
import { IMailProvider, IMessage } from '@/application/providers/IMailProvider';

export class NodemailerMailProvider implements IMailProvider {
    
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
    }

    async sendMail(message: IMessage): Promise<void> {
    
        await this.transporter.sendMail({
            to: Array.isArray(message.to) ? message.to.join(', ') :  message.to,
            from: process.env.MAIL_USER,
            subject: message.subject,
            html: message.body,
        });

    }

}