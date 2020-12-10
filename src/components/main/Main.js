import React, { useState, useEffect } from 'react'
import { Container } from '@material-ui/core'
import axios from 'axios'
import './Main.css'
import InfoBox from '../infobox/InfoBox'
import Map from '../map/Map'
import 'leaflet/dist/leaflet.css'
import AppContext from '../../context/AppContext'

function Main() {

    const [mapCountries, setMapCountries] = useState([]);
    useEffect(() => {
        const getCountriesData = async () => {
            await axios.get('https://disease.sh/v3/covid-19/countries')
                .then(response => response.data)
                .then(data => {
                    setMapCountries(data);
                });
        }
        getCountriesData();

    }, []);
    return (
        <div className="app">
            <div className="app__container app__container--main">
                <Container maxWidth="lg" >
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
                </Container>
            </div>
        </div>
    );
}

export default Main;
