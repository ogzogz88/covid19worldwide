import React, { useState } from 'react'
import {
    Card,
    CardContent,
    Container,
    Grid,
    FormControl,
    Select,
    MenuItem
} from '@material-ui/core'
import LineGraph from './LineGraph'
import AppContext from '../../context/AppContext'
import './LineChart.css'


const capitalizeFirstLetter = s => s.charAt(0).toUpperCase() + s.slice(1);

function LineChart() {
    const [chartSelector, setChartSelector] = useState("Last 1 Year");
    const selectorValues = ["Last 10 Months", "Last 8 Months", "Last 6 Months", "Last 3 Months", "Last 1 Month"];
    const [dataDay, setDataDay] = useState(365);
    const dataDays = {
        "Last 1 Year": 365,
        "Last 10 Months": 300,
        "Last 8 Months": 240,
        "Last 6 Months": 180,
        "Last 3 Months": 90,
        "Last 1 Month": 30,
    }
    const handleChange = (e) => {
        const chartSelector = e.target.value;
        setChartSelector(chartSelector);
        setDataDay(dataDays[chartSelector]);
    }
    return (
        <AppContext.Consumer>
            {context => (
                <div className="app">
                    <div className="app__container">
                        <Container maxWidth="lg" className="linechart__container">
                            <div className="app__header">
                                <img className="app__flag" src={context.countryInfo?.countryInfo?.flag ?? "assets/worldFlag.png"} alt="" />

                                <h3 className="app__title--linechart">{capitalizeFirstLetter(context.countryName)}{' '}<span className="app__covid--linechart">{chartSelector}</span></h3>
                                <FormControl className="app__dropdown app__dropdown--chart" id="chart">
                                    <Select

                                        variant="outlined"
                                        id="covid-countries-select"
                                        value={chartSelector}
                                        onChange={handleChange}
                                    >
                                        <MenuItem id={1000} value="Last 1 Year" className="app__dropdown--select">
                                            <em>Last 1 Year</em>
                                        </MenuItem>
                                        {selectorValues.length > 0 &&
                                            selectorValues.map((value) => {
                                                return (
                                                    <MenuItem key={value} value={value} className="app__dropdown--select">{value}</MenuItem>
                                                );
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                        </Container>
                        <Container maxWidth="lg" className="linechart__container">
                            <Grid container >
                                <Grid item xs={12} >
                                    <Card style={context.borderStyles.cases} className="linechart__container--grid">
                                        <CardContent>
                                            <LineGraph countryName={context.countryName} dataType={"cases"} dataDay={dataDay} />
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={6} >
                                    <Card style={context.borderStyles.recovered} className="linechart__container--grid second">
                                        <CardContent>
                                            <LineGraph countryName={context.countryName} dataType={"recovered"} dataDay={dataDay} />
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={6} >
                                    <Card style={context.borderStyles.deaths} className="linechart__container--grid third">
                                        <CardContent>
                                            <LineGraph countryName={context.countryName} dataType={"deaths"} dataDay={dataDay} />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Container>
                    </div>
                </div>
            )}
        </AppContext.Consumer >
    )
}

export default LineChart
