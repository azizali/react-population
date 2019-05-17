import React, { useState, useEffect } from 'react'

export default function Countries({ changeCb, selected }) {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    const url = 'http://54.72.28.201/1.0/countries'
    fetch(url, {
      headers: {
        accept: 'application/json; charset=utf=8'
      }
    })
      .then((res) => res.json())
      .then((json) => {
        setCountries(['', ...json.countries])
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const changeCountry = (e) => {
    changeCb(e.target.value)
  }

  return (
    <div className="col">
      <label htmlFor="country">Select Country</label>
      <select
        value={selected}
        onChange={changeCountry}
        className="custom-select"
        id="country"
      >
        {countries.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          )
        })}
      </select>
    </div>
  )
}
