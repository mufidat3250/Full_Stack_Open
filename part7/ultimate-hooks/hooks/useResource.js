import { useState } from 'react'
import axios from 'axios'
const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
  
    // ...
  
    const create = async(resource) => {
      const response = await axios.post(baseUrl,resource)
      setResources([...resources, {response}])
      setResources(resources)
    }
  
    const getAllResource = async() => {
      const response = await axios.get(baseUrl)
      setResources(resources.concat(response.data))
    }
    const service = {
      create,
      getAllResource
    }
  
    return [
      resources, service
    ]
  }
  export default useResource