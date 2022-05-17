import gmailTransport from './gmail.js';
import { Edge } from 'edge.js';
import path, { join } from 'path';

const edge = new Edge({ cache: false });
const templatesPath = join(path.resolve(), 'src/mail/templates');
edge.mount(templatesPath);

const sendMail = ({ to, subject, html }) => {
  const options = {
    to,
    subject,
    html,
    from: 'giuna@redberry.ge',
  };

  return gmailTransport.sendMail(options);
};

export const sendConfirmAccountMail = async ({ to, hash }) => {
  const baseURL = process.env.APP_URL;
  const html = edge.renderSync('confirm-account', {
    link: baseURL + '/confirm-account?hash=' + hash,
  });
  return sendMail({ to, subject: 'Confirm Account', html });
};

export const sendPasswordRecoveryLink = async ({ to, backlink, hash }) => {
  const html = edge.renderSync('password-recovery', {
    link: backlink + '?hash=' + hash,
  });

  return sendMail({ to, subject: 'Password Recovery', html });
};
