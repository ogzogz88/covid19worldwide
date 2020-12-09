import React, { useState, useEffect } from 'react'
import { FormControl, InputLabel, Select, MenuItem, Card, CardContent } from '@material-ui/core'
import axios from 'axios'
import './Main.css'
import InfoBox from '../InfoBox'
import Map from '../Map'
import 'leaflet/dist/leaflet.css'
import AppContext from '../../context/AppContext'

function Main() {
    const [countries, setCountries] = useState([]);
    const [countryName, setCountryName] = useState('worldwide');
    const [countryInfo, setCountryInfo] = useState({});
    const [mapCenter, setMapCenter] = useState({ lat: 34, lng: -40 });
    const [mapZoom, setMapZoom] = useState(3);
    const [mapCountries, setMapCountries] = useState([]);
    const [dataType, setDataType] = useState("cases");

    const handleChange = async (e) => {
        const countryName = e.target.value;
        const URL = countryName === "worldwide" ? "https://disease.sh/v3/covid-19/all" :
            `https://disease.sh/v3/covid-19/countries/${countryName}`;
        await axios.get(URL)
            .then(response => response.data)
            .then(data => {
                setCountryName(countryName);
                setCountryInfo(data);

                if (countryName === 'worldwide') {
                    setMapCenter({ lat: 34, lng: -40 });
                    setMapZoom(2);
                    return;
                }
                setMapCenter({ lat: data.countryInfo.lat, lng: data.countryInfo.long });
                console.log("positionstate");
                console.log(mapCenter);
                setMapZoom(6);
            });
    }

    useEffect(() => {
        const getCountriesData = async () => {
            await axios.get('https://disease.sh/v3/covid-19/countries')
                .then(response => response.data)
                .then(data => {
                    let idNumber = 0;
                    const countries = data.map(element => ({
                        name: element.country,
                        value: element.countryInfo.iso2,
                        id: idNumber++
                    }));
                    setCountries(countries);
                    setMapCountries(data);
                });
        }
        getCountriesData();

        const getWorldInfo = async () => {
            await axios.get("https://disease.sh/v3/covid-19/all")
                .then(response => response.data)
                .then(data => {
                    setCountryInfo(data);
                });
        }
        getWorldInfo();
    }, []);
    return (
        <div className="app">
            <div className="app__left">
                {/* <div className="app__header">
                    <h1 className="app__title"><span className="app__covid">Covid19</span>info</h1>
                    <img className="app__flag" src={countryInfo?.countryInfo?.flag ?? "assets/worldFlag.png"} alt="" />
                    <FormControl className="app__dropdown">
                        <InputLabel id="covid-countries">Select</InputLabel>
                        <Select
                            variant="outlined"
                            labelId="covid-countries"
                            id="covid-countries-select"
                            value={countryName}
                            onChange={handleChange}
                            label="Country"
                        >
                            <MenuItem id={1000} value="worldwide">
                                <em>Worldwide</em>
                            </MenuItem>
                            {countries.length > 0 &&
                                countries.map((country) => {
                                    return (
                                        <MenuItem key={country.id} value={country.name}>{country.name}</MenuItem>
                                    );
                                })
                            }
                        </Select>
                    </FormControl>
                </div> */}

                <div className="app__stats">

                    <div className="infoBox">
                        <AppContext.Consumer>
                            {context => (
                                <InfoBox
                                    clicked={"cases" === context.dataType}
                                    onClick={e => context.setDataType("cases")}
                                    img={'assets/caseImg.png'}
                                    title={"Cases"}
                                    caseTitle={"Daily Number"}
                                    totalTitle={"Total Number"}
                                    casesNumber={context.countryInfo.todayCases ? context.countryInfo.todayCases.toLocaleString() : ''}
                                    totalNumber={context.countryInfo.cases ? context.countryInfo.cases.toLocaleString() : ''}

                                />

                            )}
                        </AppContext.Consumer>
                    </div>
                    <div className="infoBox">
                        <AppContext.Consumer>
                            {context => (
                                <InfoBox
                                    clicked={"recovered" === context.dataType}
                                    onClick={e => context.setDataType("recovered")}
                                    img={'assets/recovered.png'}
                                    title={"Recovered"}
                                    caseTitle={"Daily Number"}
                                    totalTitle={"Total Number"}
                                    casesNumber={context.countryInfo.todayRecovered ? context.countryInfo.todayRecovered.toLocaleString() : ''}
                                    totalNumber={context.countryInfo.recovered ? context.countryInfo.recovered.toLocaleString() : ''}
                                />

                            )}
                        </AppContext.Consumer>
                    </div>
                    <div className="infoBox">
                        <AppContext.Consumer>
                            {context => (
                                <InfoBox
                                    clicked={"deaths" === context.dataType}
                                    onClick={e => context.setDataType("deaths")}
                                    img={'assets/death.png'}
                                    title={"Deaths"}
                                    caseTitle={"Daily Number"}
                                    totalTitle={"Total Number"}
                                    casesNumber={context.countryInfo.todayDeaths ? context.countryInfo.todayDeaths.toLocaleString() : ''}
                                    totalNumber={context.countryInfo.deaths ? context.countryInfo.deaths.toLocaleString() : ''}
                                />

                            )}
                        </AppContext.Consumer>
                    </div>
                </div>
                <AppContext.Consumer>
                    {context => (
                        <Map
                            center={context.mapCenter}
                            zoom={context.mapZoom}
                            countries={mapCountries}
                            dataType={context.dataType}
                        />
                    )}
                </AppContext.Consumer>
            </div>
            {/* <div className="app__right">
                <Card style={{ borderTop: "5px solid #9090ff" }}>
                    <CardContent>
                        <h3>Total Cases by Country</h3>
                        <Table countries={tableData} />
                        <h3>Worldwide Info For Last 4 Months</h3>
                        <LineGraph dataType={dataType} />
                    </CardContent>
                </Card>
            </div> */}
        </div>
    );
}

export default Main;
