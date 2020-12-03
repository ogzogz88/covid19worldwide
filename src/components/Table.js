import React from 'react'
import './Table.css';

function Table({ countries }) {
    let rank = 0;
    const Compare = (a, b) => {
        const A = a.cases;
        const B = b.cases;
        let comparison = 0;
        if (A > B) {
            comparison = -1;
        } else if (A < B) {
            comparison = +1;
        }
        return comparison;
    }
    const sortedCountries = countries.sort(Compare);
    return (
        <div className="table">
            {

                sortedCountries.map(({ country, cases }) => {
                    return (
                        <tr key={country}>
                            <td><strong>{++rank}</strong></td>
                            <td >{country}</td>
                            <td><strong>{cases.toLocaleString()}</strong></td>
                        </tr>
                    );
                })}
        </div>
    )
}

export default Table
