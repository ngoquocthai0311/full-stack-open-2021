import React from "react";
import Country from "./Country";

const Filter = ({countries, getCountryFromApi})  => {
    

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
                                    getCountryFromApi(item.name)
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

export default Filter