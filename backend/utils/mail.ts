import nodemailer from "nodemailer"
import { Types } from 'mongoose'

export const registerMail = async (id: Types.ObjectId, email: string, username: string) => {

  let transporter = nodemailer.createTransport({
    host: "pop.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "pantela1995@gmail.com",
      pass: "pantelaVasiliy3410823"
    }
  })

  console.log('before send');
  try {
    await transporter.sendMail({
      from: '"Api server" <pantela1995@gmail.com>',
      to: "pantela1995@gmail.com",
      subject: "Hello!",
      text: "Mail from express",
      html: `<h1>Hello ${username}</h1>`
    })
  } catch (error) {
    console.log(error);
  }
  console.log('after send');
}