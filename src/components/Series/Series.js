import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Series.css';
import { Link } from "react-router-dom";

export default function Series() {
  const apikey = process.env.REACT_APP_API_KEY_2;
  const [archives, setArchives] = useState([]);
  const [seriesState, setSeriesState] = useState('international');

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const fetchArchives = async (matchType) => {
    try {
      const options = {
        method: 'GET',
        url: `https://cricbuzz-cricket.p.rapidapi.com/series/v1/${matchType}`,
        headers: {
          'X-RapidAPI-Key': apikey,
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
    fetchArchives(seriesState);
  }, [seriesState]);

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
      <h2 className="text-center">{capitalizeFirstLetter(seriesState)} Schedule</h2>
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
                    <div className="row mb-3" style={{padding:'10px'}}>
                    <b className="col-md-3 themed-grid-col">{archive.date}</b>
                    <p key={series.id} className="col-md-4 themed-grid-col text-decoration-none" style={
                      {color:'black'}
                    }>{series.name}<br/>
                    <span>{new Date(parseInt(series.startDt)).toLocaleDateString()} - {new Date(parseInt(series.endDt)).toLocaleDateString()}</span></p>
                    <p className="col-md-5 themed-grid-col">
                      <Link className="text-decoration-none" to={`/seriesschedule/${series.id}`}>Matches Schedule</Link>
                      <Link className="mx-3 text-decoration-none" to={`/pointstable/${series.id}`}>Points Table</Link>
                      <Link className="mx-3 text-decoration-none" to={`/squad/${series.id}`}>Squad</Link>
                      <Link className="mx-3 text-decoration-none" to={`/venues/${series.id}`}>Venues</Link>
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
