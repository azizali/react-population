import React, { useState, useEffect } from 'react'

import Year from '../Year'
import Countries from '../Countries'

export default function App() {
  const [year, setYear] = useState(2017)
  const [country, setCountry] = useState('')
  const [people, setPeople] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!year || !country) return

    setIsLoading(true)

    const url = `http://54.72.28.201/1.0/population/${year}/${country}/`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        const totalPeople = json.reduce((total, item) => {
          return total + item.total
        }, 0)

        setPeople(totalPeople)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
      })
  }, [country, year])

  return (
    <div className="container mt-5 mx-auto">
      <div className="bg-white border border-dark p-5 rounded">
        <h1 className="text-center">Population:</h1>
        <form className="row">
          <Countries changeCb={setCountry} />
          <Year selected={year} changeCb={(e) => setYear(e.target.value)} />
        </form>
        <div className="alert text-center h2">
          {
            isLoading ? ('Loading...') : (
              `${people.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}`
            )
          }
        </div>
      </div>
    </div>
  )
}
