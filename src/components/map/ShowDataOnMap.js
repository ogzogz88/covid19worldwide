import React from 'react'
import { Circle, Popup } from 'react-leaflet'


function ShowDataOnMap(data, dataType, dataTypeColors) {

    return (
        data.map(country => {
            return (
                <Circle
                    key={country.country}
                    center={[country.countryInfo.lat, country.countryInfo.long]}
                    fillOpacity={0.4}
                    color={dataTypeColors[dataType].hex}
                    fillColor={dataTypeColors[dataType].hex}
                    radius={
                        Math.sqrt(country[dataType]) * dataTypeColors[dataType].multiplier
                    }
                >
                    <Popup>
                        <img className="app__flag" src={country?.countryInfo?.flag} alt="" />
                        <h3>{country.country}</h3>
                        <div>
                            {`${dataType.toUpperCase()} ${country[dataType].toLocaleString()}`}
                        </div>

                    </Popup>
                </Circle>

            );
        })
    );
}

export default ShowDataOnMap
