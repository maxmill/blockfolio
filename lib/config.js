const debug = require('debug')('blockfolio:config');

const { BLOCKFOLIO_DEVICE_ID, BLOCKFOLIO_FAVORITES } = process.env;

let { BLOCKFOLIO_COLUMN_LIMIT, BLOCKFOLIO_COLUMN_WIDTH } = process.env;

BLOCKFOLIO_COLUMN_WIDTH = BLOCKFOLIO_COLUMN_WIDTH || 15;
BLOCKFOLIO_COLUMN_LIMIT = BLOCKFOLIO_COLUMN_LIMIT || 5;

const config = {
  BLOCKFOLIO_DEVICE_ID,
  BLOCKFOLIO_COLUMN_LIMIT,
  BLOCKFOLIO_FAVORITES:
      (BLOCKFOLIO_FAVORITES || 'BTC,LTC,ETH,XRP').toUpperCase(),
  defaultTableFormat: {
    style: { padding: 0.5, head: [], border: [] },
    chars: {
      top: '═',
      'top-mid': '╤',
      'top-left': '╔',
      'top-right': '╗',
      bottom: '═',
      'bottom-mid': '╧',
      'bottom-left': '╚',
      'bottom-right': '╝',
      left: '║',
      'left-mid': '╟',
      right: '║',
      'right-mid': '╢',
    },
    colWidths: [7, 13, BLOCKFOLIO_COLUMN_WIDTH, 3].concat(
        new Array(BLOCKFOLIO_COLUMN_LIMIT).fill(BLOCKFOLIO_COLUMN_WIDTH)),
  },
};

debug(config);

module.exports = config;
