import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardContent, Container } from '@material-ui/core'
import Table from '../Table'


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
        <Container>
            <Card style={{ borderTop: "5px solid #9090ff" }}>
                <CardContent>
                    <h3>Worldwide Info For Last 4 Months</h3>
                    <Table countries={tableData} />
                </CardContent>
            </Card>
            <Card style={{ borderTop: "5px solid #9090ff" }}>
                <CardContent>
                    <h3>Worldwide Info For Last 4 Months</h3>
                    <Table countries={tableData} />
                </CardContent>
            </Card>
            <Card style={{ borderTop: "5px solid #9090ff" }}>
                <CardContent>
                    <h3>Worldwide Info For Last 4 Months</h3>
                    <Table countries={tableData} />
                </CardContent>
            </Card>
        </Container>
    )
}

export default Tables
