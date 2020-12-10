import React from 'react'
import './TableItem.css';

function TableItem({ countries, dataType, country }) {
    let rank = 0;
    const Compare = (a, b) => {
        const A = a[dataType];
        const B = b[dataType];
        let comparison = 0;
        if (A > B) {
            comparison = -1;
        } else if (A < B) {
            comparison = +1;
        }
        return comparison;
    }
    const sortedCountries = countries.sort(Compare);
    const styleClass = {
        cases: "table__highlight--cases",
        recovered: "table__highlight--recovered",
        deaths: "table__highlight--deaths"
    }
    return (
        <div className="table">
            {
                sortedCountries.map((countries) => {
                    return (
                        <tr key={countries.country} className={countries.country === country && styleClass[dataType]} >
                            <td><strong>{++rank}</strong></td>
                            <td >{countries.country}</td>
                            <td><strong>{countries[dataType].toLocaleString()}</strong></td>
                        </tr>
                    );
                })}
        </div>
    )
}

export default TableItem
