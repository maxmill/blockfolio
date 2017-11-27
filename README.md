# Blockfolio node module
cli and node module for convenient access to blockfolio

## Getting started:
if using cli tool, install module globally
```
npm i -g blockfolio
```

set the following environment variables in your shell profile. 
```
# required: device id. copy it from your blockfolio app settings
BLOCKFOLIO_DEVICE_ID=device_token_goes_here

# optional: column limit. adjust according to your preferred terminal window size
BLOCKFOLIO_COLUMN_LIMIT=larger_limit_displays_more_columns  
  
# optional: favorites. coins are added to porfolio table, and listed at the top of summaries table
BLOCKFOLIO_FAVORITES=comma_delimited_coins

# optional: column width. applies to columns 5+ only
BLOCKFOLIO_COLUMN_WIDTH=smaller_widths_truncate_cell_data

# default values for optional parameters
 BLOCKFOLIO_COLUMN_LIMIT=5 
 BLOCKFOLIO_FAVORITES=BTC,LTC,ETH,XRP
 BLOCKFOLIO_COLUMN_WIDTH=14
```

### cli usage
 column limit and favorites are overridable
```
  blockfolio 
  
# override column limit to 7:
  blockfolio 7
```
![Alt text](/media/blockfolio.png "blockfolio")
### module usage
```
const blockfolio = require('blockfolio');

(async () => {
	try {
    // params are not necessary if environment variables are set
	// const res = await  getPositionSummaries(BLOCKFOLIO_DEVICE_ID, BLOCKFOLIO_FAVORITES);
		const res = await  getPositionSummaries();
		const {activePositionSummaries, portfolio} = res;
    console.log(portfolio);
    console.log(activePositionSummaries);
    
    } catch (err) {
		console.error(err);
	}
})()
```
                  
## Roadmap:
- add custom handling for when blockfolio api server is experiencing a timeout
- finish test suite
- expose http interface
- add coinmarketcap.com price column(for price verification) to coin-summaries table
- add coinmarketcap.com global cryptocurrency markets data to portfolio table
- add net profit/loss column to portfolio table
- add portfolio allocation % column to coin-summaries table 

##Thank you
```
BTC: 1A7nYzBy1bs6oML6EtdC4h5FbyPTx6UDB4
ETH: 0x898348a0Ccb2E2F011752984Af7791ed6095af61
LTC: LfrgdFi8L4dA5J1H33xgksaU6nNXqirQqA
```