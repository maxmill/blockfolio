const fetch = require('node-fetch');
const debug = require('debug')('blockfolio:lib');

const config = require('./config');

const base = 'https://api-v0.blockfolio.com/rest';

const { BLOCKFOLIO_DEVICE_ID, BLOCKFOLIO_FAVORITES } = config;
const httpFetch = async (url) => {
  try {
    const response = await fetch(url, { method: 'GET' });
    debug(response);
    if (response.status === '504') {
      console.error(new Error('Blockfolio server timeout, try again later'));
    }
    return response.json();
  } catch (err) {
    debug(this);
    return console.error(err);
  }
};

const filterPositions = (positionList, columnLimit) => {
  const prependedCoins = positionList.filter(
      coin => columnLimit.indexOf(coin.standardTokenSymbol) !== -1);

  const nullAndDupes = coin => coin.holdingValueFiat > 0 &&
      columnLimit.indexOf(coin.standardTokenSymbol) === -1;

  const sortedCoins =
      positionList.filter(nullAndDupes)
          .sort((p, n) => n.holdingValueFiat - p.holdingValueFiat);

  return prependedCoins.concat(sortedCoins);
};


const getAllPositions = async (token = BLOCKFOLIO_DEVICE_ID) =>
    httpFetch(`${base}/get_all_positions/${token}`);

const getCoinSummary = async (token = BLOCKFOLIO_DEVICE_ID, pair = 'BTC-ETH') =>
    httpFetch(`${base}/get_coin_summary/${token}/${pair}`);

const getPairListSummaries = async (token, pairList = ['BTC-ETH']) =>
    Promise.all(pairList.map(pair => getCoinSummary(token, pair)));

const getPositionSummaries =
    async (token = BLOCKFOLIO_DEVICE_ID, favorites = BLOCKFOLIO_FAVORITES) => {
      try {
        const allPositions = await getAllPositions(token);
        const activePositions =
        filterPositions(allPositions.positionList, favorites);

        const positionSummaries = await getPairListSummaries(
        token, activePositions.map(h => `${h.base}-${h.coin}`));
        return {
          portfolio: allPositions.portfolio,
          activePositionSummaries: activePositions.map(
          p => Object.assign(
              p,
              positionSummaries.find(s => s.holdings.coin === p.coin)
                  .holdings)),
        };
      } catch (err) {
        debug(this);
        return console.error(err);
      }
    };

module.exports = {
  getCoinSummary,
  getAllPositions,
  getPairListSummaries,
  getPositionSummaries,
};
