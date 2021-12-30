import { useEffect, useState } from "react"
import resourceService from '../services/index.js'

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    const fetchAll = async () => {
        try {
            const result = await resourceService.getAll(baseUrl)
            setResources(result)
        } catch (error) {   
            console.log('error message: ', error.message)
        }
    }
  
    useEffect(() => {        
        fetchAll()
    }, [])
  
    const create = async (resource) => {
        try {
            const result = await resourceService.create(baseUrl, resource)
            setResources([...resources, result])
            await fetchAll()
        } catch (error) {
            console.log('error message', error.message)
        }                
    }
  
    const service = {
      create
    }
  
    return [
      resources, service
    ]
}

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