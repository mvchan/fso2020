import React from 'react'
import Weather from './Weather.js'

const Country = ({country,setFilterName}) => {
    return (
        <div>
            {country.name}<button onClick={() => setFilterName(country.name)}>show</button>
        </div>
    )
}

const CountryExpanded = ({country}) => {

    return (
        <div>
            <h2>{country.name}</h2>
            capital {country.capital}
            <br/>
            population {country.population}
            
            <h3>Spoken languages</h3>
            <ul>{country.languages.map(language => <li key={language.name}>{language.name}</li>)}</ul>
            <img src={country.flag} alt="flag" style={{width:"150px",height:"100px"}}></img>
            
            <Weather city={country.capital} />
        </div>
    )
}

const Countries = ({obj}) => {

    const countryList = obj.countries.filter(country => country.name.toLowerCase().includes(obj.filterName.toLowerCase()))                                   

    const Result = () => {
        
        if (countryList.length > 10) {
            return (
                <>
                Too many matches, specify another filter
                </>
            )
        }

        else if (countryList.length === 1) {
            return (
                <>
                {countryList.map(country => <CountryExpanded key={country.numericCode} country={country}/>)}
                </>
            )
        }

        else {
            return (
                <>
                {countryList.map(country => <Country key={country.numericCode} country={country} setFilterName={obj.setFilterName} />)}
                </>
            )
        }
    }

    return (
        <>
        {console.log("number of countries: ",countryList.length)}
        <Result />
        </>
    )
}

export default Countries