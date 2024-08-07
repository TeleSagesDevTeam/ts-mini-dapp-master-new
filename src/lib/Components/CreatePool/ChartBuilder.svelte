<script>
	import { createEventDispatcher, onMount } from 'svelte'
	import Chart from 'chart.js/auto'
	import ChartDataLabels from 'chartjs-plugin-datalabels'
	import ChartOption from './ChartOption.svelte'
	import { etherToWei } from '$lib/helper.js'

	export let type = 'Quadratic'

	let fixedPrice = 6.9
	let initialPrice = 1
	let incrementPerUnit = 0.005
	let basePrice = 0.005
	let growthFactor = 0.005
	let chart
	
	const length = 105
	const everyNth = 20

	const dispatch = createEventDispatcher()
	const createChart = () => {
		chart = new Chart(document.getElementById('priceChart'), {
			type: 'line',
			data: {
				labels: Array.from({ length }, (_, i) => i + 1),
				datasets: [{
					data: [],
					borderColor: 'white',
					borderWidth: 2,
					pointRadius: Array.from({ length }, (_, i) => (i % everyNth === 0 ? 5 : 0)),
					pointBackgroundColor: 'white'
				}]
			},
			options: {
				responsive: true,
				layout: {
					padding: {
						left: 25,
						right: 25,
						top: 20,
						bottom: 20
					}
				},
				scales: {
					x: {
						display: false,
						ticks: { display: false },
						grid: { display: false, color: 'rgba(78, 78, 78, 0.8)' }
					},
					y: {
						beginAtZero: true,
						display: true,
						ticks: { display: false },
						grid: {
							display: true,
							color: 'rgba(78, 78, 78, 0.8)',
							drawBorder: false
						}
					}
				},
				plugins: {
					legend: { display: false },
					datalabels: {
						backgroundColor: context => ((context.dataIndex + 1) % everyNth === 0 || context.dataIndex === 0) ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
						align: 'top',
						anchor: 'end',
						clamp: false,
						color: 'white',
						font: { size: 12, family: 'Helvetica' },
						formatter: (value, context) => {
							const ordinalSuffixOf = i => {
								var j = i % everyNth, k = i % 100
								if (j === 1 && k !== 11) return i + 'st'
								if (j === 2 && k !== 12) return i + 'nd'
								if (j === 3 && k !== 13) return i + 'rd'
								return i + 'th'
							}

							if (context.dataIndex === 0 || (context.dataIndex + 1) % everyNth === 0) {
								return `${ordinalSuffixOf(context.dataIndex + 1)} key\n${Number(value).toFixed(3)} ETH`
							}
							return ''
						}
					}
				}
			},
			plugins: [ChartDataLabels]
		})
	}

	const updateChart = () => {
		let prices = []
		const supply = Array.from({ length }, (_, i) => i + 1)
console.log(supply)
		switch(type) {
			case 'Fixed':
				prices = supply.map(() => fixedPrice)
				adjustFixedChartScale(fixedPrice)
				break
			case 'Linear':
				prices = supply.map(supply => initialPrice + incrementPerUnit * supply)
				resetChartScale()
				break
			case 'Quadratic':

				prices = supply.map(supply => {
					let sum1 = (supply - 1) * supply * (2 * (supply - 1) + 1) / 6
					let sum2 = supply * (supply + 1) * (2 * supply + 1) / 6
		
					return growthFactor * (sum2 - sum1) + basePrice			
				})
				resetChartScale()
				break
		}

		chart.data.labels = supply
		chart.data.datasets[0].data = prices
		chart.update()
	}

	const adjustFixedChartScale = () => {
		const padding = fixedPrice * 0.5
		chart.options.scales.y.min = fixedPrice - padding
		chart.options.scales.y.max = fixedPrice + padding
	}

	const resetChartScale = () => {
		delete chart.options.scales.y.min
		delete chart.options.scales.y.max
	}
	const calculateForSC = (type, fixedPrice, initialPrice, incrementPerUnit, basePrice, growthFactor) => {
		let flatPriceParam, multiPriceParam

		switch(type) {
			case 'Fixed':
				flatPriceParam = etherToWei(fixedPrice)
				multiPriceParam = etherToWei(0)
				break
			case 'Linear':
				flatPriceParam = etherToWei(initialPrice)
				multiPriceParam = etherToWei(incrementPerUnit)
				break
			case 'Quadratic':
				flatPriceParam = etherToWei(basePrice)
				multiPriceParam = etherToWei(growthFactor)
				break
		}

		return {
			priceCurve: activeOption,
			flatPriceParam,
			multiPriceParam
		}
	}

	onMount(() => {
		createChart()
		updateChart()
	})

	$: if(chart && type) updateChart(fixedPrice, initialPrice, incrementPerUnit, basePrice, growthFactor)
	$: activeOption = type === 'Fixed' ? 0 : type === 'Linear' ? 1 : 2
	$: dispatch('update', calculateForSC(type, fixedPrice, initialPrice, incrementPerUnit, basePrice, growthFactor))
</script>

<div class="grid grid-cols-3 gap-[6px] mb-3">
	<ChartOption
		active={activeOption === 0}
		label=Fixed
		on:click={() => type = 'Fixed'}
		disabled={activeOption === 1 || activeOption === 2}
		data={[1, 1]}
	/>
	<ChartOption
		active={activeOption === 1}
		label=Linear
		on:click={() => type = 'Linear'}
		disabled={activeOption === 1 || activeOption === 2}
		data={[0, 1]}
	/>
	<ChartOption
		active={activeOption === 2}
		label=Quadratic
		on:click={() => type = 'Quadratic'}
		disabled={activeOption === 0 || activeOption === 1}
		data={[
			1, 0.9793000000000001, 0.9664000000000001, 1.0351000000000001, 1.2592,
			1.7125, 2.4688, 3.6018999999999997, 5.185600000000001, 7.293700000000001,
			10,
		]}
	/>
</div>

<div class="mb-3">
	{#if type === 'Fixed'}
		<p class="text-sm mb-3 text-white/80">Fixed - offers keys at a uniform price, granting lifetime access, with 95% of sales revenue benefiting the group owner and a 5% tax, without the option for trade or resale.</p>
		<label class="flex-column">
			<span class="label-text">Fixed Price:</span>
			<input class="input-style" type="number" bind:value={fixedPrice} step="0.001" placeholder="Enter fixed price">
		</label>
	{:else if type === 'Linear'}
		<p class="text-sm mb-3 text-white/80">Each key's price increases step-by-step from the initial cost, with the option to trade keys, and each trade incurs a total of 10% tax, split between the platform and sage.</p>
		<label class="flex-column">
			<span class="label-text">Initial Price:</span>
			<input class="input-style" type="number" bind:value={initialPrice} step="0.001" placeholder="Enter initial price">
		</label>
		<label class="flex-column">
			<span class="label-text">Increment Per Unit:</span>
			<input class="input-style" type="number" bind:value={incrementPerUnit} step="0.001" placeholder="Enter price increment per unit">
		</label>
	{:else if type === 'Quadratic'}
	<p class="text-sm mb-3 text-white/80">Each new key's price increases faster than the last, based on a squared formula. Keys can be traded, with each transaction attracting a 10% fee, divided equally between platform and sage taxes.</p>
<div class="flex-column">
    <span class="label-text">Base Price:</span>
    <div class="flex items-center">
        <input class="input-style" type="number" bind:value={basePrice} step="0.001" placeholder="Enter base price">
        <span class="ml-2 text-white">ETH</span>
    </div><span class="label-text">
</div>
<div class="flex-column">
    <span class="label-text">Growth Factor:</span>
    <div class="flex items-center">
        <input class="input-style" type="number" bind:value={growthFactor} step="0.001" placeholder="Enter growth factor">
        <span class="ml-2 text-white">ETH</span>
    </div>
</div>

	{/if}
</div>

<canvas id="priceChart"></canvas>

<style>
	.flex-column {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin-bottom: 10px;
	}

	.label-text {
		color: rgba(255,255,255, 0.9);
		font-weight: 500;
		margin-bottom: 5px;
	}

	.input-style {
		font-weight: normal;
		width: 100%;
		outline: none;
		text-align: right;
		padding: 2px;
		height: 40px;
		background-color: #1E1E1E;
		color: white;
		font-size: large;
		border: none;
		border-radius: 4px;
	}

	canvas {
		background: rgba(255, 255, 255, 0.05);
		border-radius: 10px;
	}
</style>
