const moment = require("moment");
const { Result } = require("../db");
const { Op } = require("sequelize");

async function getResultByDate(dateStr) {
  const result = await Result.findOne({
    where: {
      createdAt: dateStr,
    },
  });

  return result;
}

async function getResultsFromDateToDate(fromDateStr, toDateStr) {
  const results = await Result.findAll({
    where: {
      [Op.and]: [
        {
          createdAt: {
            [Op.gte]: fromDateStr,
          },
        },
        {
          createdAt: {
            [Op.lte]: toDateStr,
          },
        }
      ]

    },
  });

  return results;
}

module.exports = {
  getResultByDate,
  getResultsFromDateToDate,
};
