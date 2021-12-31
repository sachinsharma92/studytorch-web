import Highcharts from "highcharts/highstock";
import Column from 'highcharts-react-official';

function ScoreHighchartChart() {
	const options = {
		chart: {
			type: 'column',
			height: 220,
		},
		title:{
			text:''
	},
	rangeSelector: {
    selected: 0
  },
		xAxis: {
			categories: ['01', '02', '03', '04', '05', '06',],
		},
		yAxis: {
			title: false,
		},
		credits: {
			enabled: false
		},
		plotOptions: {
			column: {
					colorByPoint: true
			}
	},
		colors: ["#6C5ECF", "#E4ECF7"],
		series: [{
			data: [29, 41, 36, 79, 106, 114],
			showInLegend: false,
		}]
	};
	return (
		<div className="chart-wrappers">
			<Column highcharts={Highcharts} options={options} />
		</div>
	)
}

export default ScoreHighchartChart;