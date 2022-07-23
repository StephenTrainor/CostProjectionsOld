import ReactApexChart from "react-apexcharts";
import useWindowDimensions from '../hooks/useWindowDimensions';

const AllTimeVisitsApexChart = (props) => {
    const { height: deviceHeight, width: deviceWidth } = useWindowDimensions();
    const { airtableRecords }  = props;

    const minChartWidth = 180;
    const minChartHeight = 200;

    const state = {
        series: [{
            name: 'Losing Positions',
            data: []
        },
        {
            name: 'Gaining Positions',
            data: []
        }],
        options: {
            colors: ['#e12f2f', '#16c25d'],
            chart: {
                type: 'bar',
                height: minChartHeight + deviceHeight / 10,
                width: minChartWidth + deviceWidth / 3,
                stacked: true,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: false
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                }
            },
            xaxis: {
                categories: []
            },
            title: {
                text: 'Most Visited Stocks',
                align: 'center'
            },
            legend: {
                positions: 'bottom',
                align: 'center',
            },
            fill: {
                opacity: 0.9
            },
            tooltip: {
                theme: 'dark'
            }
        }
    };

    airtableRecords.sort((a, b) => {
        return b.fields.allTimeVisits - a.fields.allTimeVisits;
    });

    for (let i = 0; i < 6; i++) {
        if (airtableRecords[i] === undefined) {break}

        const { symbol, losingPositions, gainingPositions } = airtableRecords[i].fields;

        state.series[0].data.push(losingPositions);
        state.series[1].data.push(gainingPositions);
        state.options.xaxis.categories.push(symbol);
    }

    return (
        <ReactApexChart 
            series={state.series}
            options={state.options}
            type={state.options.chart.type}
            width={state.options.chart.width}
            height={state.options.chart.height}
            tooltip={state.options.tooltip}
            legend={state.options.legend}
        />
    )
}

AllTimeVisitsApexChart.defaultProps = {
    airtableRecords: []
};

export default AllTimeVisitsApexChart;
