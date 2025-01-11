const moment = require("moment");
const lotteryParser = require("./lottery-parser.service");
const { Result } = require("../db");

async function importByDate(dateStr) {
  const url = `https://www.kqxs.vn/?date=${dateStr}`;

  const html = await lotteryParser.getContent(url);

  const parsed = await lotteryParser.parseLottery(html);

  const createdAt = dateStr;

  const result = await Result.findOne({
    where: {
      createdAt: dateStr,
    },
  });

  const data = {
    db: parsed.db,
    g1: parsed.g1,
    g2_1: parsed.g2_1,
    g2_2: parsed.g2_2,
    g3_1: parsed.g3_1,
    g3_2: parsed.g3_2,
    g3_3: parsed.g3_3,
    g3_4: parsed.g3_4,
    g3_5: parsed.g3_5,
    g3_6: parsed.g3_6,

    g4_1: parsed.g4_1,
    g4_2: parsed.g4_2,
    g4_3: parsed.g4_3,
    g4_4: parsed.g4_4,

    g5_1: parsed.g5_1,
    g5_2: parsed.g5_2,
    g5_3: parsed.g5_3,
    g5_4: parsed.g5_4,
    g5_5: parsed.g5_5,
    g5_6: parsed.g5_6,

    g6_1: parsed.g6_1,
    g6_2: parsed.g6_2,
    g6_3: parsed.g6_3,

    g7_1: parsed.g7_1,
    g7_2: parsed.g7_2,
    g7_3: parsed.g7_3,
    g7_4: parsed.g7_4,
  };

  const status = getStatus(data);

  const payload = {
    ...data,
    status,
    createdAt,
  };

  if (result) {
    await result.update(payload);
  } else {
    await Result.create(payload);
  }
}

function getStatus(data) {
  let status = "done";

  const keys = Object.keys(data);

  for (const key of keys) {
    const val = data[key];

    if (val === "") {
      status = "pending";
    }
  }

  return status;
}

async function batchImport(fromDateStr, toDateStr) {
  const reports = [];

  let dateStr = fromDateStr;

  while (dateStr <= toDateStr) {
    try {
      console.log(`import result for ${dateStr} - start`);

      await importByDate(dateStr)

      console.log(`import result for ${dateStr} - done`);

      reports.push({
        isOk: true,
        date: dateStr,
      });

      dateStr = moment(dateStr).add(1, 'days').format('YYYY-MM-DD')
    } catch (error) {
      reports.push({
        isOk: false,
        date: dateStr,
        errorMessage: error.message,
      });

      console.log({
        message: `import result for ${dateStr} - error`,
        errorMessage: error.message,
      });
    }
  }

  return reports;
}

module.exports = {
  batchImport,
  importByDate,
};
