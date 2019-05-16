import React from 'react';

export default function({ changeCb, selected }) {
  function printOptions() {
    const lastYear = new Date().getFullYear() - 1;
    let year = 1999;
    const optionList = [];
    do {
      year++;
      optionList.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    } while (year <= lastYear);
    return optionList;
  }
  return (
    <div className="col">
      <label htmlFor="year">Select Year</label>
      <select className="custom-select" id="year" value={selected} onChange={changeCb}>
        {printOptions()}
      </select>
    </div>
  );
}
