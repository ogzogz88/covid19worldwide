import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'

function LineGraph({ dataType = "cases" }) {
    const [data, setData] = useState({});
    // we  will get last 120 days accumulated worldwide data, as cases, recovered and death
    // API endpoint https://disease.sh/v3/covid-19/historical/all
    const options = {
        legend: {
            display: true
        },
        elements: {
            point: {
                radius: 0
            },
        },
        maintainAspectRatio: true,
        tooltips: {
            mode: "index",
            intersect: false,
            callbacks: {
                label: function (tooltipItem, data) {
                    return numeral(tooltipItem.value).format("+0,0");
                }
            }
        },
        scales: {
            xAxes: [
                {
                    type: "time",
                    time: {
                        format: "MM/DD/YY",
                        tooltipFormat: "ll"
                    },
                },
            ],
            yAxes: [
                {
                    gridLİnes: {
                        display: false,
                    },
                    ticks: {
                        callback: function (value, index, values) {
                            return numeral(value).format("0a")
                        }
                    }
                }
            ]
        }

    };
    const formatChartData = (data, dataType = "cases") => {
        const chartData = [];
        let lastDataPoint;
        for (let date in data[dataType]) {
            if (lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data[dataType][date] - lastDataPoint
                };

                chartData.push(newDataPoint);
            }
            lastDataPoint = data[dataType][date];
        };
        return chartData;
    };

    useEffect(() => {
        const getLineData = async () => {
            await axios.get("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
                .then(response => response.data)
                .then(data => {
                    console.log('line data');
                    console.log(data);
                    const chartData = formatChartData(data, dataType);
                    setData(chartData);
                });
        }
        getLineData();
    }, [dataType]);
    return (
        <div>
            {data?.length > 0 &&
                <Line
                    options={options}
                    data={{
                        datasets: [{
                            label: dataType === "recovered" ? "Recovered Cases" : dataType === "deaths" ? "Deaths" : "New Cases",
                            backgroundColor: dataType === "recovered" ? 'rgba(70,178,150,0.4)' : dataType === "deaths" ? 'rgba(82,82,82,0.4)' : 'rgba(235,85,105,0.4)',
                            borderColor: dataType === "recovered" ? 'rgba(70,178,150,1)' : dataType === "deaths" ? 'rgba(82,82,82,1)' : 'rgba(235,85,105,1)',
                            data: data
                        }]
                    }}
                />
            }

        </div>
    )
}

export default LineGraph
