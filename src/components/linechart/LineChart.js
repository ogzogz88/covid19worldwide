import React from 'react'
import { Card, CardContent, Container, Grid } from '@material-ui/core'
import LineGraph from './LineGraph'
import AppContext from '../../context/AppContext'


function LineChart() {
    return (
        <AppContext.Consumer>
            {context => (
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Card style={{ borderTop: "5px solid #9090ff" }}>
                                <CardContent>
                                    <h3>Worldwide Info For Last 4 Months</h3>
                                    <LineGraph countryName={context.countryName} dataType={"cases"} />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Card style={{ borderTop: "5px solid #9090ff" }}>
                                <CardContent>
                                    <h3>Worldwide Info For Last 4 Months</h3>
                                    <LineGraph countryName={context.countryName} dataType={"recovered"} />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Card style={{ borderTop: "5px solid #9090ff" }}>
                                <CardContent>
                                    <h3>Worldwide Info For Last 4 Months</h3>
                                    <LineGraph countryName={context.countryName} dataType={"deaths"} />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            )}
        </AppContext.Consumer>
    )
}

export default LineChart
