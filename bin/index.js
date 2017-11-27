#!/usr/bin/env node

const _config = require('../lib/config');
const blockfolio = require('../lib');
const tables = require('../lib/table-format');
const debug = require('debug')('blockfolio:lib');

const { getPositionSummaries } = blockfolio;
const { formatPositions, formatSummaries } = tables;
const args = process.argv.splice(process.execArgv.length + 2);

let displayLimit = args[0];
displayLimit = !!displayLimit && !isNaN(displayLimit) ?
    parseInt(displayLimit, 10) :
    _config.BLOCKFOLIO_COLUMN_LIMIT;


(async (config) => {
  try {
    const res = await getPositionSummaries(
        config.BLOCKFOLIO_DEVICE_ID, config.BLOCKFOLIO_FAVORITES);
    const { activePositionSummaries, portfolio } = res;
    const positions = activePositionSummaries.slice(0, displayLimit);

    debug(portfolio);
    debug(positions);
    const portfolioTable = formatPositions(portfolio, positions);
    const summaryTable = formatSummaries(activePositionSummaries);

    console.log(portfolioTable);
    console.log(summaryTable);
  } catch (err) {
    console.error(err);
  }
})(_config);
