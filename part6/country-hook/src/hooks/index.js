import { useEffect, useState } from "react"
import countryService from '../services/country'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

export const useCountry = () => {    
    const [ searchString, setSearchString ] = useState('')
    const [ data, setData ] = useState({})
    const [ found, setFound ] = useState(false)

    const createDataObject = (result) => {
        const dataObject = {
            name: result.name.common,
            capital: result.capital[0],
            population: result.population,
            flag: result.flags.png
        }
        return dataObject
    }

    useEffect(() => {        
        if (searchString !== '') {                                  
            async function fetchCountry() {
                try {
                    const result = await countryService.getCountry(searchString)                                                             
                    setData(createDataObject(result[0]))                   
                    setFound(true)
                } catch (error) {                    
                    setFound(false)
                }                
            }
            fetchCountry()
        } else {
            setFound(false)
        }
                
    }, [searchString])

    return {
        data,        
        found,
        setSearchString
    }
}