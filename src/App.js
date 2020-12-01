import React, { useState, useEffect } from 'react'
import { FormControl, InputLabel, Select, MenuItem, } from '@material-ui/core'
import axios from 'axios'
import './App.css';


{/* APPLICATION STRUCTURE
    Header
    Title + Select input dropdown field
    InfoBoxes * 3 (new case, recovered, deaths)
    Table 
    Graph
    Map 
    */}
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const handleChange = (e) => {
    setCountry(e.target.value);
  }

  useEffect(() => {
    const getCountriesData = async () => {
      await axios.get('https://disease.sh/v3/covid-19/countries')
        .then(response => response.data)
        .then(data => {
          console.log(data);
          const countries = data.map(element => ({
            name: element.country,
            value: element.countryInfo.iso2
          }));
          setCountries(countries);
        });
    }
    getCountriesData();
  }, []);
  return (
    <div className="app">
      <div className="app__header">
        <h1>Covid19 Tracker</h1>
        <FormControl className="app__dropdown">
          <InputLabel id="covid-countries">Select</InputLabel>
          <Select
            variant="outlined"
            labelId="covid-countries"
            id="covid-countries-select"
            value={country}
            onChange={handleChange}
            label="Country"
          >
            <MenuItem value="worldwide">
              <em>Worldwide</em>
            </MenuItem>
            {countries.length > 0 &&
              countries.map((country) => {
                return (
                  <MenuItem value={country.name}>{country.name}</MenuItem>
                );
              })
            }
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
