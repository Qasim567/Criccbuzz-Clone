import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Series.css';
import { Link } from "react-router-dom";

export default function Archives() {
  const [archives, setArchives] = useState([]);
  const [seriesState, setSeriesState] = useState('international');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const fetchArchives = async (matchType, year) => {
    try {
      const options = {
        method: 'GET',
        url: `https://cricbuzz-cricket.p.rapidapi.com/series/v1/archives/${matchType}`,
        params: { year: year },
        headers: {
          'X-RapidAPI-Key': '96321480c4msh8fb1fda7b752179p177346jsn3eb6f3c4078c',
          'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
        }
      };
      const response = await axios.request(options);
      setArchives(response.data.seriesMapProto);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchArchives(seriesState, selectedYear);
  }, [seriesState, selectedYear]);

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    let years = [];
    for (let year = 1890; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  }

  return (
    <div className="my-4">
      <h2>All Series Schedule</h2>
      <div className="container match-state-buttons my-2">
        <button className={seriesState === 'international' ? 'active' : ''}
          onClick={() => setSeriesState('international')}>International</button>
        <button className={seriesState === 'league' ? 'active' : ''}
          onClick={() => setSeriesState('league')}>League</button>
        <button className={seriesState === 'domestic' ? 'active' : ''}
          onClick={() => setSeriesState('domestic')}>Domestic</button>
        <button className={seriesState === 'women' ? 'active' : ''}
          onClick={() => setSeriesState('women')}>Women</button>
      </div>
      <div className="container my-2">
        <label htmlFor="year-select">Select Year: </label>
        <select className="mx-3"
          id="year-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {generateYearOptions().map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <h2 className="text-center">{capitalizeFirstLetter(seriesState)} Schedule - {selectedYear}</h2>
      {archives.length > 0 && (
        <div className="container my-1">
          <div className="row mb-3" style={{background:'#ecebeb',padding:'10px'}}>
              <p className="col-md-3 themed-grid-col">Month</p>
              <p className="col-md-4 themed-grid-col">Series Name</p>
              <p className="col-md-5 themed-grid-col">Series Details</p>
          </div>
          {archives.map((archive, index) => (
            <div key={index}>
              {archive.series.map((series) => (
                <div className="row mb-3" style={{padding:'10px'}} key={series.id}>
                  <b className="col-md-3 themed-grid-col">{archive.date}</b>
                  <p className="col-md-4 themed-grid-col text-decoration-none" style={{color:'black'}}>
                    {series.name}<br/>
                    <span>{new Date(parseInt(series.startDt)).toLocaleDateString()} - {new Date(parseInt(series.endDt)).toLocaleDateString()}</span>
                  </p>
                  <p className="col-md-5 themed-grid-col">
                    <Link className="text-decoration-none" to={`/seriesschedule/${series.id}`}>Matches Schedule</Link>
                    <Link className="mx-3 text-decoration-none" to={`/pointstable/${series.id}`}>Points Table</Link>
                    <Link className="text-decoration-none" to={`/venues/${series.id}`}>Venues</Link>
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {archives.length === 0 && (
        <div className="container" style={{ textAlign: 'center' }}>
          No Series found.
        </div>
      )}
    </div>
  );
}
