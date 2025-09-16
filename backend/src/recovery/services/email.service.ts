import { Injectable, BadRequestException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class RecoveryService {
  private transporter = nodemailer.createTransport({
    host: 'smtp.example.com', 
    port: 587,
    secure: false,
    auth: {
      user: 'tu-correo@example.com',
      pass: 'tu-contraseña',
    },
  });

  async sendRecoveryEmail(email: string, secretKey: string) {
    if (!email || !secretKey) {
      throw new BadRequestException('Frase o mail inválido');
    }

    const mailOptions = {
      from: 'no-reply@example.com',
      to: email,
      subject: 'Recuperación de cuenta',
      text: `Tu llave secreta es: ${secretKey}`,
      html: `<p>Tu llave secreta es: <strong>${secretKey}</strong></p>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return { status: 200, message: 'Se envió el correo de recuperación' };
    } catch (error) {
      throw new BadRequestException('Error enviando el correo');
    }
  }
}
