import React, { useState, useEffect } from 'react'
import { FormControl, InputLabel, Select, MenuItem, Card, CardContent } from '@material-ui/core'
import axios from 'axios'
import './App.css'
import InfoBox from './components/InfoBox'
import Map from './components/Map'
import Table from './components/Table'

function App() {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  const handleChange = async (e) => {
    const countryName = e.target.value;
    const URL = countryName === "worldwide" ? "https://disease.sh/v3/covid-19/all" :
      `https://disease.sh/v3/covid-19/countries/${countryName}`;
    await axios.get(URL)
      .then(response => response.data)
      .then(data => {
        setCountryName(countryName);
        setCountryInfo(data);
      });
  }

  useEffect(() => {
    const getCountriesData = async () => {
      await axios.get('https://disease.sh/v3/covid-19/countries')
        .then(response => response.data)
        .then(data => {
          console.log(data);
          let idNumber = 0;
          const countries = data.map(element => ({
            name: element.country,
            value: element.countryInfo.iso2,
            id: idNumber++
          }));
          setCountries(countries);
          setTableData(data);
          console.log(data);
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
          <div className="infobox__wrapper">
            <InfoBox
              img={'assets/caseImg.png'}
              title={"Cases"}
              caseTitle={"Daily Number"}
              totalTitle={"Total Number"}
              casesNumber={countryInfo.todayCases ? countryInfo.todayCases.toLocaleString() : ''}
              totalNumber={countryInfo.cases ? countryInfo.cases.toLocaleString() : ''}

            />
          </div>
          <div className="infobox__wrapper">
            <InfoBox
              img={'assets/recovered.png'}
              title={"Recovered"}
              caseTitle={"Daily Number"}
              totalTitle={"Total Number"}
              casesNumber={countryInfo.todayRecovered ? countryInfo.todayRecovered.toLocaleString() : ''}
              totalNumber={countryInfo.recovered ? countryInfo.recovered.toLocaleString() : ''}
            />
          </div>
          <div className="infobox__wrapper">
            <InfoBox
              img={'assets/current.png'}
              title={"Current"}
              caseTitle={"Active"}
              totalTitle={"Critical"}
              casesNumber={countryInfo.active ? countryInfo.active.toLocaleString() : ''}
              totalNumber={countryInfo.critical ? countryInfo.critical.toLocaleString() : ''}
            />
          </div>
          <div className="infobox__wrapper">
            <InfoBox
              img={'assets/death.png'}
              title={"Deaths"}
              caseTitle={"Daily Number"}
              totalTitle={"Total Number"}
              casesNumber={countryInfo.todayDeaths ? countryInfo.todayDeaths.toLocaleString() : ''}
              totalNumber={countryInfo.deaths ? countryInfo.deaths.toLocaleString() : ''}
            />
          </div>
        </div>

        <Map />
      </div>
      <Card className="app__right" style={{ borderTop: "5px solid #eb5569" }}>
        <CardContent>
          <h3>Total Cases by Country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
