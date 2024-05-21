import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Series.css';

export default function Series() {
  const [archives, setArchives] = useState([]);
  const [seriesState, setSeriesState] = useState('international');

  const capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const fetchArchives = async (matchType) => {
    try {
      const options = {
        method: 'GET',
        url: 'https://unofficial-cricbuzz.p.rapidapi.com/series/list-archives',
        params: {
          matchType: matchType
        },
        headers: {
          'X-RapidAPI-Key': '56a0784ee0mshf2be9cf52cc965dp1cdd5bjsn3079f3d9fa51',
          'X-RapidAPI-Host': 'unofficial-cricbuzz.p.rapidapi.com'
        }
      };
      const response = await axios.request(options);
      setArchives(response.data.seriesMap[0].series);
    } catch (error) {
      console.error(error);
    }
  };

  const convertToPST = (timestamp) => {
    const pstOffset = 5.00;
    const pstTime = new Date(timestamp + (pstOffset * 3600 * 1000));
    return pstTime.toLocaleString('en-US', {timeZone: 'Asia/Karachi'});
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
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
              </tr>
            </thead>
            <tbody>
              {archives.map((archive, index) => (
                <tr key={archive.id}>
                  <td>{index + 1}</td>
                  <td className="col-4">{archive.name}</td>
                  <td className="col-4">{convertToPST(parseInt(archive.startDt))}</td>
                  <td className="col-4">{convertToPST(parseInt(archive.endDt))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {archives.length === 0 && (
        <div className="container" style={{textAlign:'center'}}>
          No Series found.
        </div>
      )}
    </div>
  );
}
