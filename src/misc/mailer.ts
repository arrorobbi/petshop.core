const nodemailer = require('nodemailer');
import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { BookingService } from 'src/booking/booking.service';
import { BadRequestError } from 'src/errors';

@Injectable()
export class MailService {
  private transporter: any;
  constructor(private readonly bookingService: BookingService) {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS,
        // user: NODEMAILER_EMAIL,
        // pass: "qiyr qwkv biwn sgzf",
      },
    });
  }

  async bookingMail(
    payload: string,
    bookingId: string,
    userEmail: string,
    doctorName: string,
    userName: string,
  ) {
    try {
      const dataBooking = await this.bookingService.getById(bookingId); //checking booking data
      const info = await this.transporter.sendMail({
        from: 'vickyrobbi@gmail.com',
        to: userEmail,
        subject: 'Your Booking ID',
        html: `
          <p><strong>Hello ${userName}</strong> <br>Here is your Booking ID on
          ${dataBooking.date
            .toLocaleDateString('en-US', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: '2-digit',
            })
            .replace(
              ',',
              '',
            )} and queue ${dataBooking.queueNumber} with doctor ${doctorName} :  <br></p>
          ${bookingId}
          <p>Barcode is generated in attachment and show the barcode to staff on site</p>
        `,
        attachments: [
          {
            filename: `${bookingId}.png`,
            path: payload,
          },
        ],
      });
      return info;
    } catch (error) {
      throw new BadRequestError(error);
    }
  }
}
