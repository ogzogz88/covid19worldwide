import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AppContext from './AppContext';

function AppProvider(props) {
    const [countries, setCountries] = useState([]);
    const [countryName, setCountryName] = useState('worldwide');
    const [countryInfo, setCountryInfo] = useState({});
    const [mapCenter, setMapCenter] = useState({ lat: 34, lng: -40 });
    const [mapZoom, setMapZoom] = useState(3);
    const [dataType, setDataType] = useState("cases");

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
                setMapZoom(6);
            });
    }

    const borderStyles = {
        cases: { borderTop: "5px solid #eb5569" },
        recovered: { borderTop: "5px solid #46b29d" },
        deaths: { borderTop: "5px solid #555" }
    }
    const colors = {
        cases: "#eb5569",
        recovered: "#46b29d",
        deaths: "#555"
    }

    return (
        <AppContext.Provider
            value={{
                handleChange,
                countryName,
                countryInfo,
                mapCenter,
                mapZoom,
                countries,
                dataType,
                setDataType,
                borderStyles,
                colors
            }}
        >
            {props.children}
        </AppContext.Provider>
    );

}

export default AppProvider