import { Injectable, BadRequestException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Galaxy } from '../entities/Galaxy.entity';


@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    secure: true, 
    secureConnection: false,
    port: 465,
    debug: true,
    auth: {
      user: 'form@ramelax.com',
      pass: '/YLGnifxmC8',
    },
  });

 

  async sendRecoveryEmail(email: string, secretKey: string, galaxy: Galaxy) {
    if (!email || !secretKey) {
      throw new BadRequestException('Frase o mail inválido');
    }

    const emailTemplate = `
    <h1>${galaxy.recoveryAddress}</h1>
    <p>Tu llave secreta es: <strong>${secretKey}</strong></p>
    <a href="http://localhost:3000/recover?key=${galaxy.recoveryAddress}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Recuperar cuenta</a>
  `;

    const mailOptions = {
      to: email,
      subject: 'Recuperación de cuenta',
      html: emailTemplate,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return { status: 200, message: 'Se envió el correo de recuperación' };
    } catch (error) {
      console.error('Email sending error:', error);
      throw new BadRequestException(`Error enviando el correo: ${error.message}`);
    }
  }
}
