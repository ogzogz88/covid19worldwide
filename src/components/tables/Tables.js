import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardContent, Container, Grid } from '@material-ui/core'
import TableItem from './TableItem'
import AppContext from '../../context/AppContext'



function Tables() {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        const getCountriesData = async () => {
            await axios.get('https://disease.sh/v3/covid-19/countries')
                .then(response => response.data)
                .then(data => {
                    setTableData(data);
                });
        }
        getCountriesData();
    }, []);
    return (
        <AppContext.Consumer>
            {context => (
                <div className="app">
                    <div className="app__container app__container--table">
                        <Container maxWidth="lg" >
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} lg={4} >
                                    <Card style={context.borderStyles.cases}>
                                        <CardContent>
                                            <h3 className="text-center">Cases</h3>
                                            <TableItem countries={tableData} dataType="cases" country={context.countryName} />
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <Card style={context.borderStyles.recovered}>
                                        <CardContent>
                                            <h3 className="text-center">Recovered</h3>
                                            <TableItem countries={tableData} dataType="recovered" country={context.countryName} />
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <Card style={context.borderStyles.deaths}>
                                        <CardContent>
                                            <h3 className="text-center">Deaths</h3>
                                            <TableItem countries={tableData} dataType="deaths" country={context.countryName} />
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

export default Tables
