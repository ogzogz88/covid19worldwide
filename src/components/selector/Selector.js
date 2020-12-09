import React from 'react'
import AppContext from '../../context/AppContext'
import {
    FormControl,
    Select,
    MenuItem
} from "@material-ui/core";
import './Selector.css'

function Selector() {
    return (
        <AppContext.Consumer>
            {context => (
                <FormControl className="app__dropdown main__selector">
                    <Select
                        variant="outlined"
                        id="covid-countries-select"
                        value={context.countryName}
                        onChange={context.handleChange}

                    >
                        <MenuItem id={1000} value="worldwide">
                            <em>Worldwide</em>
                        </MenuItem>
                        {context.countries.length > 0 &&
                            context.countries.map((country) => {
                                return (
                                    <MenuItem key={country.id} value={country.name}>{country.name}</MenuItem>
                                );
                            })
                        }
                    </Select>
                </FormControl>

            )}
        </AppContext.Consumer>
    );

}

export default Selector
