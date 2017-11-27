const Table = require('cli-table2');
const colors = require('colors');
const debug = require('debug')('blockfolio:table-format');
const defaultTableFormat = require('./config').defaultTableFormat;

const colorRowItem = (item, arrow) =>
    colors[arrow === 'up' ? 'green' : 'red'](item);

const colorIfPositive = str =>
    colorRowItem(str, str.indexOf('-') === -1 ? 'up' : null);

const formatSummaries = (coinSummaries) => {
  debug(JSON.stringify(coinSummaries));
  const head = [
    '',
    'Market',
    'Units',
    '',
    'Cost',
    'Value',
    'Profit/Loss',
    'Change',
    '%',
    'Price',
  ];
  const table = new Table(Object.assign(defaultTableFormat, { head }));

  coinSummaries.forEach(s => table.push([
    colors.blue(s.coin),
    `${s.exchange}\n(${s.base})`,
    s.quantityString,
    colors.gray(`${s.holdingValueString.charAt(0)}\n$`),
    `${s.netCostString}\n${s.netCostFiatString}`,
    `${s.holdingValueString}\n${s.holdingValueFiatString}`,
    `${colorIfPositive(s.lifetimeChangeString)}\n${colorIfPositive(
        s.lifetimeChangeFiatString)}`,
    `${colorIfPositive(s.twentyFourHourChangeString)}\n${colorIfPositive(
        s.twentyFourHourChangeFiatString)}`,
    `${colorIfPositive(s.twentyFourHourPercentChangeString)}\n${colorIfPositive(
        s.twentyFourHourPercentChangeFiatString)}`,
    `${colorIfPositive(s.lastPriceString)}\n${colorIfPositive(
        s.lastPriceFiatString)}`,
  ]));
  return table.toString();
};

const formatPositions = (portfolio, positions) => {
  const {
    portfolioValueBtc,
    portfolioValueFiat,
    changeBtc,
    changeFiat,
    arrowFiat,
    arrowBtc,
    percentChangeBtc,
    percentChangeFiat,
  } = portfolio;

  const head = ['', 'Value', 'Change', ''].concat(positions.map(p => p.coin));
  const table = new Table(Object.assign(defaultTableFormat, { head }));

  debug(table);

  table.push(
    {
      BTC: [
        portfolioValueBtc,
        colorRowItem(`${changeBtc}\n${percentChangeBtc}`, arrowBtc),
        colors.gray('฿\n%'),
      ]
                 .concat(positions.map(
                     p => colorRowItem(
                         `${p.holdingValueBtcString
                         }\n ${p.twentyFourHourPercentChangeString}`,
                         p.arrow))),
    },
    {
      USD: [
        portfolioValueFiat,
        colorRowItem(`${changeFiat}\n${percentChangeFiat}`, arrowFiat),
        colors.gray('$\n%'),
      ]
                 .concat(positions.map(
                     p => colorRowItem(
                         `${p.holdingValueFiatString
                         }\n ${p.twentyFourHourPercentChangeFiatString}`,
                         p.arrow))),
    });
  return table.toString();
};

module.exports = {
  formatPositions,
  formatSummaries,
};
