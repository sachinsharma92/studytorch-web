import Highcharts from 'highcharts/highstock';
import Column from 'highcharts-react-official';
import get from 'lodash/get';
import { getTimeText } from '../../../utilities/helpers';

function ColumnHighchartChart(props: any) {
  const { categories, values } = props;
  
  const options = {
    chart: {
      type: 'column',
      height: 220,
    },
    tooltip: {
      formatter: function (obj: any, obj2: any) {
        return `<text x="8" data-z-index="1" y="18" style="color:#333333;font-size:12px;fill:#333333;">
		<tspan style="font-size: 10px">${get(this, 'x')}</tspan>
		<tspan class="highcharts-br" dy="15" x="8">​</tspan>
		<tspan style="fill:#6C5ECF">●</tspan>
		Time: 
		<tspan style="font-weight:bold;">${getTimeText(get(this, 'y'))}</tspan>
		<tspan class="highcharts-br">​</tspan>
	 </text>`;
      },
    },
  
    title: {
      text: '',
    },
    rangeSelector: {
      selected: 0,
    },
    xAxis: {
      categories,
      title:{
        text: 'Dates (DD)',
      },
    },
    yAxis: {
      labels: {
        enabled: false,
      },
      title:{
        text: 'Time Spent',
      },
      gridLineColor: 'transparent',
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      column: {
        colorByPoint: true,
      },
    },
    colors: ['#6C5ECF', '#E4ECF7'],
    series: [
      {
        data: values,
        showInLegend: false,
      },
    ],
  };
  return (
    <div className="chart-wrappers">
      <Column highcharts={Highcharts} options={options} />
    </div>
  );
}

export default ColumnHighchartChart;
