const moment = require('moment')
const { Result } = require('../db')
const lotteryService = require('../services/lottery.service');
const resultService = require('../services/result.service');

async function getResultOld(req, res) {
  const date = req.params.date;

  const result = await Result.findOne({
    where: {
      createdAt: date,
    },
  });

  if (!result) {
    return res.status(404).json({
      message: `Not found data for ${date}`
    });
  }

  res.json(result);
};

async function getResult(req, res) {
  const dateStr = req.query.date || moment().format('YYYY-MM-DD');

  const result = await resultService.getResultByDate(dateStr);

  res.render("pages/home.html", { result, arr: [1, 2, 3] });
};


async function batchImportResults(req, res) {
  const fromDateStr = req.query.fromDate || moment().subtract(365, 'days').format('YYYY-MM-DD');
  const toDateStr = req.query.toDate || moment().format('YYYY-MM-DD');

  const reports = await lotteryService.batchImport(fromDateStr, toDateStr)

  return res.json({
    reports,
  });
};

async function getTest(req, res) {
  const fromDateStr = req.query.fromDate || moment().subtract(365, 'days').format('YYYY-MM-DD');
  const toDateStr = req.query.toDate || moment().format('YYYY-MM-DD');

  const results = await resultService.getResultsFromDateToDate(fromDateStr, toDateStr);

  // { '80': { totalCount: 10, dates: {"2024-10-05": 2, "2024-10-06": 8} } }
  const obj = {};

  for (let result of results) {
    const dt = {
      db: result.db,
      g1: result.g1,
      g2_1: result.g2_1,
      g2_2: result.g2_1,
      g3_1: result.g3_1,
      g3_2: result.g3_2,
      g3_3: result.g3_3,
      g3_4: result.g3_4,
      g3_5: result.g3_5,
      g3_6: result.g3_6,

      g4_1: result.g4_1,
      g4_2: result.g4_2,
      g4_3: result.g4_3,
      g4_4: result.g4_4,

      g5_1: result.g5_1,
      g5_2: result.g5_2,
      g5_3: result.g5_3,
      g5_4: result.g5_4,
      g5_5: result.g5_5,
      g5_6: result.g5_6,

      g6_1: result.g6_1,
      g6_2: result.g6_2,
      g6_3: result.g6_4,

      g7_1: result.g7_1,
      g7_2: result.g7_2,
      g7_3: result.g7_3,
      g7_4: result.g7_4,

      // ...
    };

    const keys = Object.keys(dt);

    for (let key of keys) {
      const value = dt[key];

      if (!value || value === '') {
        continue;
      }

      const tail = value.slice(-2); // fix chỗ này

      const item = obj[tail];

      if (item) {
        const dates = item.dates;

        if (dates[result.createdAt]) {
          dates[result.createdAt] = dates[result.createdAt] + 1;
        } else {
          dates[result.createdAt] = 1
        }

        obj[tail] = {
          totalCount: item.totalCount + 1,
          dates,
        }
      } else {
        obj[tail] = {
          totalCount: 1,
          dates: { [result.createdAt]: 1 }
        };
      }
    }
  }

  return res.json(obj)
};

async function getResults(req, res) {
  const fromDateStr = req.query.fromDate || moment().subtract(365, 'days').format('YYYY-MM-DD');
  const toDateStr = req.query.toDate || moment().format('YYYY-MM-DD');


  const results = await resultService.getResultsFromDateToDate(fromDateStr, toDateStr);

  return res.json({
    fromDate: fromDateStr,
    toDate: toDateStr,
    results,
  });
};

async function getResultByDate(req, res) {
  const dateStr = req.params.date;

  const result = await resultService.getResultByDate(dateStr);

  if (!result) {
    return res.status(404).json({
      message: `Result for ${dateStr} not found`
    });
  }

  return res.json({
    date: dateStr,
    result,
  });
};

module.exports = {
  getResultOld,
  getResult,
  getResults,
  getResultByDate,
  batchImportResults,
  getTest,
};
