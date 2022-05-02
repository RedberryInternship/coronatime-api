import cron from 'node-cron';
import { synchronizeCountries } from '../cron-jobs/index.js';

const registerCronJobs = () => {
  cron.schedule('* * * * *', synchronizeCountries);
};

export default registerCronJobs;
