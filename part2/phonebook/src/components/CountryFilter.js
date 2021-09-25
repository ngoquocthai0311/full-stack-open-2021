import React from "react";
import Country from "./Country";

const CountryFilter = ({countries, getCountriesFromAPI})  => {
    
    

    const render = () => {
        switch (countries.length) {
            case 1: {
                const country = countries[0]
                return (
                    <>
                        <Country country={country}/>
                    </>
                )
            }
            case 0: {
                return (
                    <></>
                )
            }
            default: {  
                if (countries.length > 10) {
                    return (
                        <p>Too many matches, specify another filter</p>
                    )
                } else if (countries.length <= 10) {
                    return (
                        <ul>
                            {countries.map((item, index) => 
                                <li key={index}>{item.name} <button onClick={() => {
                                    getCountriesFromAPI(item.name)
                                }}>show</button> </li>
                            )}
                        </ul>
                    )
                }
            }
        }
    }
    return (
        <>
            {render()}
        </>
    )
}

export default CountryFilter