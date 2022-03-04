import Highcharts from 'highcharts/highstock';
import PieChart from 'highcharts-react-official';

function PieHighchartChart(props: any) {
  const { success, unSuccess, percentText } = props;

  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      marginTop: 0,
      spacingLeft: 0,
      spacingRight: 0,
      spacingTop: 30,
      width: 160,
      height: 160,
      style: {
        fontSize: 18,
        fontWeight: 700,
      },
    },
    title: false,
    subtitle: {
      text: `${percentText} %`,
      align: 'center',
      verticalAlign: 'middle',
      y: 0,
    },
    tooltip: {
      enabled: false,
    },
    plotOptions: {
      series: {
        states: {
          hover: {
            enabled: false,
          },
        },
      },
      pie: {
        allowPointSelect: false,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
        point: {
          events: {
            legendItemClick: () => false,
          },
        },
        showInLegend: false,
        borderWidth: 0,
        colors: ['#66CB9F', '#E1FCEF'],
      },
    },
    series: [
      {
        innerSize: '67%',
        data: [
          {
            name: 'Listed',
            y: success,
          },
          {
            name: 'Not Listed',
            y: unSuccess,
          },
        ],
      },
    ],
    credits: {
      enabled: false,
    },
    legend: {
      itemStyle: {
        color: '#787878',
      },
      symbolRadius: 0,
    },
  };
  return (
    <div className="chart-wrappers">
      <PieChart highcharts={Highcharts} options={options} />
    </div>
  );
}

export default PieHighchartChart;
