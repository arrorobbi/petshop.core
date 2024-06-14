// require('dotenv').config();
// const nodemailer = require('nodemailer');
// const fs = require('fs');
// const BookingService = require('../services/booking.service');

// // const bookingTemplate = fs.readFileSync("mailer/booking.html");
// // config nodemailer
// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.NODEMAILER_EMAIL,
//     pass: process.env.NODEMAILER_PASS,
//     // user: NODEMAILER_EMAIL,
//     // pass: "qiyr qwkv biwn sgzf",
//   },
// });

// export class sendEmail {
//   constructor(payload) {
//     payload = payload;
//   }
//   // booking mailer
//   booking = async (payload, bookingId, userEmail, doctorName, userName) => {
//     try {
//       // get detail  booking
//       const dataBooking = await BookingService.getOne(bookingId);

//       const info = await transporter.sendMail({
//         from: 'vickyrobbi@gmail.com', // sender address
//         to: userEmail, // list of receivers
//         subject: 'Your Booking ID', // Subject line
//         html:
//           `<p><strong>Hello ${userName}</strong> <br>Here your Booking ID on
//           ${dataBooking.dataValues.date
//             .toLocaleDateString('en-US', {
//               weekday: 'short',
//               year: 'numeric',
//               month: 'short',
//               day: '2-digit',
//             })
//             .replace(',', '')} and queue ${
//             dataBooking.dataValues.queueNumber
//           } with doctor ${doctorName} :  <br></p>` +
//           bookingId +
//           '<p>Barcode is generated in attachment and show the barcode to staff on site',
//         attachments: [
//           {
//             filename: `${bookingId}.png`,
//             path: payload, // Path to the file you want to attach
//           },
//         ],
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   // verify mailer
//   // verify = async (payload) =>{
//   //     let accountName = user.firstName
//   //     let linkVerify = "http://128.199.246.107:3005/api/v1.0/verify/"+user.id
//   //     const info = await transporter.sendMail({
//   //         from: "ardecandra@gmail.com", // sender address
//   //         to: user.email, // list of receivers
//   //         subject: "Verify Your Account", // Subject line
//   //         html: "<p><strong>Hello "+accountName+"</strong> <br>You registered an account on Binar Platinum, before being able to use your account you need to verify that this is your email address by clicking here: <br></p><a href="+linkVerify+">Click Here to Confirm Your Account</a><p>Kind Regards</p>"
//   //       });
//   // }
// }
