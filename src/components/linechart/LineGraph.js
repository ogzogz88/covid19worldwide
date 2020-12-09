import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'

function LineGraph({ dataType, countryName, dataDay }) {
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
        maintainAspectRatio: false,
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
                        parser: "MM/DD/YY",
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
    const formatChartData = (data, dataType) => {
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

    const text = {
        cases: "Cases",
        recovered: "Recovered Cases",
        deaths: "Deaths",

    }
    const color = {
        cases: "rgba(235,85,105,0.4)",
        recovered: "rgba(70,178,150,0.4)",
        deaths: "rgba(82,82,82,0.4)",
    }
    const border = {
        cases: "rgba(235,85,105,0.9)",
        recovered: "rgba(70,178,150,0.9)",
        deaths: "rgba(82,82,82,0.9)",
    }

    useEffect(() => {
        const getLineData = async () => {
            if (countryName === "worldwide") {
                await axios.get(`https://disease.sh/v3/covid-19/historical/all?lastdays=${dataDay}`)
                    .then(response => response.data)
                    .then(data => {
                        console.log('line data');
                        console.log(data);
                        const chartData = formatChartData(data, dataType);
                        setData(chartData);
                    });
            } else {
                await axios.get(`https://disease.sh/v3/covid-19/historical/${countryName}?lastdays=${dataDay}`)
                    .then(response => response.data)
                    .then(data => {
                        console.log('line data');
                        console.log(data);
                        const chartData = formatChartData(data.timeline, dataType);
                        setData(chartData);
                    });

            }

        }
        getLineData();
    }, [dataType, countryName, dataDay]);
    return (
        <div>
            {data?.length > 0 &&
                <Line
                    width={460}
                    height={230}
                    options={options}
                    data={{
                        datasets: [{
                            label: text[dataType],
                            backgroundColor: color[dataType],
                            borderColor: border[dataType],
                            data: data
                        }]
                    }}
                />
            }

        </div>
    )
}

export default LineGraph
