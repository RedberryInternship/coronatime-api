import nodemailer from 'nodemailer';

const gmailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'giuna@redberry.ge',
    pass: 'rlyuglknkaejziyu',
  },
});

export default gmailTransport;
