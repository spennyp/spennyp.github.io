let plotNumber = 0
const baseImgPath = "../../img/dashboard/" 
const coinForCode = {
	"0x6c8c6b02e7b2be14d4fa6022dfd6d75921d90e4e":"BAT", 
	"0x5d3a536e4d6dbd6114cc1ead35777bab948e3643":"DAI", 
	"0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5":"ETH", 
	"0x158079ee67fce2f58472a96584a73c7ab9ac95c1":"REP", 
	"0xf5dce57282a584d2746faf1593d3121fcac444dc":"SAI", 
	"0x35a18000230da775cac24873d00ff85bccded550":"UNI", 
	"0x39aa39c021dfbae8fac545936693ac917d5e7563": "USDC",
	"0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9": "USDT",
	"0xc11b1268c1a384e55c48c2391d8d480264a3a7f4": "WBTC",
	"0xb3319f5d18bc0d84dd1b4825dcde5d5f7266d407": "ZRX" 
}

window.onload = async function() {
	generatePlot()
}

function generatePlot() {
	const timeUTC = Math.floor((new Date()).getTime() / 1000)
	const minTimestamp = "1456647900" // A value that doesn't give an error
	const maxTimestamp = timeUTC 
 	const numBuckets = 180
	const baseUrl = "https://api.compound.finance/api/v2/market_history/graph?asset=" 
	const urlTimeParam = "&min_block_timestamp=" + minTimestamp + "&max_block_timestamp=" + maxTimestamp + "&num_buckets=" + numBuckets

	// Generate request urls
	let urls = []
	for (const code in coinForCode) {
		urls.push(baseUrl + code + urlTimeParam)
	}
	
	// batch url requests, then generate plot for each response
	Promise.all(urls.map(url => fetch(url)))
		.then(function (responses) {
			return Promise.all(responses.map(function (response) {
				return response.json()
			}))
		})
		.then(function (data) { // array of the responses in order
			data.forEach(function(object) {
				createPlot(object)
			})
		})
		.then(() => {
			// Hide the loading spinner once loaded
			document.getElementById("loadingSpinner").setAttribute("hidden", "")
		})
		.catch(function (error) {
			console.log(error)
		})
}

function createPlot(data) {
	let bRate = []
	let bTime = []
	let lRate = []
	let lTime = []
	let avgBorrowRate = 0
	let avgLendRate = 0

	const borrowData = data.borrow_rates
	const lendData = data.supply_rates
	const asset = data.asset
	const assetName = coinForCode[asset]

	for(let i = 0; i < borrowData.length; i++) {
		const rate = borrowData[i].rate * 100
		avgBorrowRate += rate
		bRate.push(rate)
		let date = new Date(borrowData[i].block_timestamp * 1000)
		bTime.push(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate())
	}

	for(let i = 0; i < lendData.length; i++) {
		const rate = lendData[i].rate * 100
		avgLendRate += rate
		lRate.push(rate)
		let date = new Date(lendData[i].block_timestamp * 1000)
		lTime.push(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate())
	}

	avgBorrowRate /= borrowData.length
	avgLendRate /= lendData.length
	const avgSplitRate = avgBorrowRate - avgLendRate

	let borrow = {
		x: bTime,
		y: bRate,
		type: "scatter",
		name: "borrow"
	}
	let lend = {
		x: lTime,
		y: lRate,
		type: "scatter",
		name: "lend"
	}
	let plotData = [borrow, lend]
	let layout = {
		title: assetName,
		dragmode: false,
		xaxis: {
			fixedrange: true
		},
		yaxis: {
			title: "% APY",	
			fixedrange: true
		},
		legend: {
			"orientation": "h",
			y: 1.1
		},
		margin: {
			l: 35,
			r: 25,
			b: 50
		}

	}
	const cardId = plotCard(avgBorrowRate, avgLendRate, avgSplitRate)
	Plotly.newPlot(cardId, plotData, layout, {scrollZoom: false})
}

function plotCard(averageBorrowRate, averageLendRate, averageSplitRate) {
	const id = "plot" + plotNumber
	const card = `<div class="plotEntry" id="entry1">
		<div class="plot" id="${id}">
		</div>
		<div class="plotSummary">
			<div class="plotSummaryText">
				<ul>
					<li id="avgBorrow">Average Borrow: ${averageBorrowRate.toFixed(2)}%</li>
					<li id="avgLend">Average Lend: ${averageLendRate.toFixed(2)}%</li>
					<li id="avgSplit">Average Split: ${averageSplitRate.toFixed(2)}%</li>
				</ul>
			</div>
		</div>
	</div>`
	plotNumber += 1;
	document.getElementById("content").insertAdjacentHTML("beforeend", card)
	return id
}


