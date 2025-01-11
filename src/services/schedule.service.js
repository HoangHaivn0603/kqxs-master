const cron = require('node-cron');
const lotteryService = require('./lottery.service');

function start() {
  cron.schedule('* 0-30 18 * * *', async () => {
    const dateStr = moment().format('YYYY-MM-DD');

    console.log(`try to fetching lottery data for date ${dateStr} - start`);

    await lotteryService.importByDate(dateStr)

    console.log(`try to fetching lottery data for date ${dateStr} - done`);
  }, {
    timezone: "Asia/Ho_Chi_Minh"
  });
} 

module.exports = {
  start,
};
