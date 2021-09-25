import React from "react";

const Country = ({country}) => {
    
    // let weather = null

    // useEffect(() => {
    //     const link = "https://api.weatherstack.com/current?access_key=" + process.env.REACT_APP_API_KEY + "&query=" + country.capital
    //     axios
    //         .get(link)
    //         .then(response => {
    //             weather = response.data
    //         })
    // }, [])

    return (
        <>
            <h1>{country.name}</h1>
            <p>
                capital {country.capital} <br/>
                population {country.population}
            </p>
            <h1>Languages</h1>
            <ul>
                {country.languages.map((item, index) => <li key={index}>{item.name}</li>)}
            </ul>

            <img src={country.flag} alt='a colorful flag' width='100' height='100'/>          

            {/* <Weather weather={weather}/> */}
        </>
    )
}

export default Country;