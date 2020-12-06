import React, { useState, useEffect } from 'react'
import { FormControl, InputLabel, Select, MenuItem, Card, CardContent } from '@material-ui/core'
import axios from 'axios'
import './App.css'
import InfoBox from './components/InfoBox'
import Map from './components/Map'
import Table from './components/Table'
import LineGraph from './components/LineGraph'
import 'leaflet/dist/leaflet.css'

function App() {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
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
        setMapZoom(4);
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
          setTableData(data);
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
        <div className="app__header">
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
        </div>

        <div className="app__stats">
          <div className="infoBox">
            <InfoBox
              clicked={"cases" === dataType}
              onClick={e => setDataType("cases")}
              img={'assets/caseImg.png'}
              title={"Cases"}
              caseTitle={"Daily Number"}
              totalTitle={"Total Number"}
              casesNumber={countryInfo.todayCases ? countryInfo.todayCases.toLocaleString() : ''}
              totalNumber={countryInfo.cases ? countryInfo.cases.toLocaleString() : ''}

            />
          </div>
          <div className="infoBox">
            <InfoBox
              clicked={"recovered" === dataType}
              onClick={e => setDataType("recovered")}
              img={'assets/recovered.png'}
              title={"Recovered"}
              caseTitle={"Daily Number"}
              totalTitle={"Total Number"}
              casesNumber={countryInfo.todayRecovered ? countryInfo.todayRecovered.toLocaleString() : ''}
              totalNumber={countryInfo.recovered ? countryInfo.recovered.toLocaleString() : ''}
            />
          </div>
          <div className="infoBox">
            <InfoBox
              clicked={"deaths" === dataType}
              onClick={e => setDataType("deaths")}
              img={'assets/death.png'}
              title={"Deaths"}
              caseTitle={"Daily Number"}
              totalTitle={"Total Number"}
              casesNumber={countryInfo.todayDeaths ? countryInfo.todayDeaths.toLocaleString() : ''}
              totalNumber={countryInfo.deaths ? countryInfo.deaths.toLocaleString() : ''}
            />
          </div>
        </div>

        <Map
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
          dataType={dataType}
        />
      </div>
      <div className="app__right">
        <Card style={{ borderTop: "5px solid #9090ff" }}>
          <CardContent>
            <h3>Total Cases by Country</h3>
            <Table countries={tableData} />
            <h3>Worldwide Info For Last 4 Months</h3>
            <LineGraph dataType={dataType} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
