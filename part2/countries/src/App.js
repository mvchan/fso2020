import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries ] = useState([]) 
  const [ filterName, setFilterName ] = useState('')

  useEffect(() => {
    console.log('country effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('country promise fulfilled')
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Filter filterName={filterName} setFilterName={setFilterName}/>
      <Countries obj={{countries,filterName,setFilterName}} />
    </div>
  )
}

export default App;
