import test from 'ava';

import { getAllPositions, getCoinSummary, getPairListSummaries, getPositionSummaries } from '../lib';


const BLOCKFOLIO_DEVICE_ID =
    'cQdh_rnrRgw:APA91bFF7944SC0gaijU7mhbRVhpgPNFJn2m-OA3G0ZFlm9w7VycjRgI17f' +
    '-QcQMY06mfTlfl9h24EklsuSRp-wxfKecG2lw1l82K59TsZVKnljz0W2jH7VcRsGqvI77GukydvE1OOOn';


test('it gets coin summary', async (t) => {
  try {
    const res = await getCoinSummary(BLOCKFOLIO_DEVICE_ID, 'USD-BTC');

    if (res.success === true) {
      t.pass();
    } else {
      t.fail();
    }
  } catch (err) {
    console.error(err);
  }
});

test('it gets all positions', async (t) => {
  try {
    const res = await getAllPositions(BLOCKFOLIO_DEVICE_ID);

    if (res.success === true) {
      t.pass();
    } else {
      t.fail();
    }
  } catch (err) {
    console.error(err);
  }
});

test('it gets pair list summaries', async (t) => {
  try {
    const res = await getPairListSummaries(BLOCKFOLIO_DEVICE_ID, ['USD-BTC']);

    if (res[0].success === true) {
      t.pass();
    } else {
      t.fail();
    }
  } catch (err) {
    console.error(err);
  }
});


test('it gets position summaries', async (t) => {
  try {
    const res = await getPositionSummaries(BLOCKFOLIO_DEVICE_ID, 'BTC,ETH,LTC');
    const { activePositionSummaries, portfolio } = res;

    if (!activePositionSummaries && !portfolio) {
      t.fail();
    } else {
      t.pass();
    }
  } catch (err) {
    console.error(err);
  }
});
