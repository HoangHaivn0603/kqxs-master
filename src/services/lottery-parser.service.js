const Axios = require("axios");
const cheerio = require("cheerio");
const axios = Axios.create();

async function getContent(url) {
  const res = await axios({
    method: "GET",
    url,
  });

  return res.data;
}

async function parseLottery(html) {
  const $ = cheerio.load(html);

  const db = $(
    "#result_1 > tbody > tr:nth-child(1) > td.results > div > span"
  ).text().trim();

  const g1 = $(
    "#result_1 > tbody > tr:nth-child(2) > td.results > div > span"
  ).text();

  const g2_1 = $(
    "#result_1 > tbody > tr:nth-child(3) > td.results > div > span:nth-child(1)"
  ).attr('data-value');

  const g2_2 = $(
    "#result_1 > tbody > tr:nth-child(3) > td.results > div > span:nth-child(2)"
  ).attr('data-value');

  const g3_1 = $(
    "#result_1 > tbody > tr:nth-child(4) > td.results > div > span:nth-child(1)"
  ).attr('data-value');
  const g3_2 = $(
    "#result_1 > tbody > tr:nth-child(4) > td.results > div > span:nth-child(2)"
  ).attr('data-value');
  const g3_3 = $(
    "#result_1 > tbody > tr:nth-child(4) > td.results > div > span:nth-child(3)"
  ).attr('data-value');
  const g3_4 = $(
    "#result_1 > tbody > tr:nth-child(4) > td.results > div > span:nth-child(4)"
  ).attr('data-value');
  const g3_5 = $(
    "#result_1 > tbody > tr:nth-child(4) > td.results > div > span:nth-child(5)"
  ).attr('data-value');
  const g3_6 = $(
    "#result_1 > tbody > tr:nth-child(4) > td.results > div > span:nth-child(6)"
  ).attr('data-value');

  const g4_1 = $(
    "#result_1 > tbody > tr:nth-child(5) > td.results > div > span:nth-child(1)"
  ).attr('data-value');
  const g4_2 = $(
    "#result_1 > tbody > tr:nth-child(5) > td.results > div > span:nth-child(2)"
  ).attr('data-value');
  const g4_3 = $(
    "#result_1 > tbody > tr:nth-child(5) > td.results > div > span:nth-child(3)"
  ).attr('data-value');
  const g4_4 = $(
    "#result_1 > tbody > tr:nth-child(5) > td.results > div > span:nth-child(4)"
  ).attr('data-value');

  const g5_1 = $(
    "#result_1 > tbody > tr:nth-child(6) > td.results > div > span:nth-child(1)"
  ).attr('data-value');
  const g5_2 = $(
    "#result_1 > tbody > tr:nth-child(6) > td.results > div > span:nth-child(2)"
  ).attr('data-value');
  const g5_3 = $(
    "#result_1 > tbody > tr:nth-child(6) > td.results > div > span:nth-child(3)"
  ).attr('data-value');
  const g5_4 = $(
    "#result_1 > tbody > tr:nth-child(6) > td.results > div > span:nth-child(4)"
  ).attr('data-value');
  const g5_5 = $(
    "#result_1 > tbody > tr:nth-child(6) > td.results > div > span:nth-child(5)"
  ).attr('data-value');
  const g5_6 = $(
    "#result_1 > tbody > tr:nth-child(6) > td.results > div > span:nth-child(6)"
  ).attr('data-value');

  const g6_1 = $(
    "#result_1 > tbody > tr:nth-child(7) > td.results > div > span:nth-child(1)"
  ).attr('data-value');
  const g6_2 = $(
    "#result_1 > tbody > tr:nth-child(7) > td.results > div > span:nth-child(2)"
  ).attr('data-value');
  const g6_3 = $(
    "#result_1 > tbody > tr:nth-child(7) > td.results > div > span:nth-child(3)"
  ).attr('data-value');

  const g7_1 = $(
    "#result_1 > tbody > tr:nth-child(8) > td.results > div > span:nth-child(1)"
  ).attr('data-value');
  const g7_2 = $(
    "#result_1 > tbody > tr:nth-child(8) > td.results > div > span:nth-child(2)"
  ).attr('data-value');
  const g7_3 = $(
    "#result_1 > tbody > tr:nth-child(8) > td.results > div > span:nth-child(3)"
  ).attr('data-value');
  const g7_4 = $(
    "#result_1 > tbody > tr:nth-child(8) > td.results > div > span:nth-child(4)"
  ).attr('data-value');

  return {
    db,
    g1,
    g2_1,
    g2_2,
    g3_1,
    g3_2,
    g3_3,
    g3_4,
    g3_5,
    g3_6,
    
    g4_1,
    g4_2,
    g4_3,
    g4_4,
    
    g5_1,
    g5_2,
    g5_3,
    g5_4,
    g5_5,
    g5_6,
    
    g6_1,
    g6_2,
    g6_3,
    
    g7_1,
    g7_2,
    g7_3,
    g7_4,
  };
}

module.exports = {
  parseLottery,
  getContent,
};