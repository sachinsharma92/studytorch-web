import Highcharts from "highcharts/highstock";
import Column from 'highcharts-react-official';

function ColumnHighchartChart() {
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
			categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12','13', '14', '15', '16', '17', '18', '19', '20', '21'],
		},
		yAxis: {
			labels: {
				enabled: false
			},
			title: false,
			gridLineColor: 'transparent',
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
			data: [29, 31, 36, 39, 46, 56, 46, 39, 36, 114, 29, 31, 36, 39, 46, 56, 46, 39, 36, 31, 29 ],
			showInLegend: false,
		}]
	};
	return (
		<div className="chart-wrappers">
			<Column highcharts={Highcharts} options={options} />
		</div>
	)
}

export default ColumnHighchartChart;