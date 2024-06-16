import * as fs from 'fs';
import * as barcode from 'jsbarcode';
import { createCanvas } from 'canvas';
import { MailService } from './mailer';
import { Injectable } from '@nestjs/common';

// require('dotenv').config();

// const generateBarcode = async (payload, emailUser, doctorName, userName) => {
//   // generate canvas for barcode
//   const canvas = createCanvas(400, 200);
//   const ctx = canvas.getContext('2d');

//   // Generate barcode
//   barcode(canvas, payload, {
//     format: 'CODE128',
//     displayValue: false,
//   });

//   // Convert canvas to PNG buffer
//   const buffer = canvas.toBuffer('image/png');
//   const filename = '../public/barcodes' + `${payload}.png`;
//   // Save buffer to a PNG file
//   fs.writeFile(filename, buffer, (err) => {
//     if (err) {
//       console.error('Error writing the file:', err);
//       return;
//     }
//     console.log('Barcode image saved successfully as barcode-image.png');
//   });

//   // sending barcode and dependancies information via email
//   const mailing = new sendEmail(payload);
//   await mailing.booking(filename, payload, emailUser, doctorName, userName);

//   return filename;
// };

// module.exports = { generateBarcode };
@Injectable()
export class GenerateService {
  constructor(private readonly mailService: MailService) {}
  async Barcode(
    payload: string,
    emailUser: string,
    doctorName: string,
    userName: string,
  ) {
    // generate canvas for barcode
    const canvas = createCanvas(400, 200);
    const ctx = canvas.getContext('2d');

    // Generate barcode
    barcode(canvas, payload, {
      format: 'CODE128',
      displayValue: false,
    });

    // Convert canvas to PNG buffer
    const buffer = canvas.toBuffer('image/png');
    const filename = 'src/public/barcodes/' + `${payload}.png`;
    // Save buffer to a PNG file
    fs.writeFile(filename, buffer, (err) => {
      if (err) {
        console.error('Error writing the file:', err);
        return;
      }
      console.log('Barcode image saved successfully as barcode-image.png');
    });

    await this.mailService.bookingMail(
      filename,
      payload,
      emailUser,
      doctorName,
      userName,
    );

    // sending barcode and dependancies information via email

    return filename;
  }
}
