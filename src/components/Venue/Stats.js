import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Stats = () => {
  const { id } = useParams();
  const [venueStats, setVenueStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const options = {
        method: 'GET',
        url: `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/venue/${id}`,
        headers: {
          'X-RapidAPI-Key': '9d5ecbf72fmsh80034365670a1d2p1317c3jsna96cf5494285',
          'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setVenueStats(response.data.venueStats);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, [id]);

  return (
    <div>
      <h3 style={{backgroundColor:'#ecebeb'}}>Venue Stats</h3>
        {venueStats.map((stat, index) => (
          <div className="row mb-3" key={index}>
           <p className="col-md-3">{stat.key}</p>
           <p className="col-md-9">{stat.value}</p>
          </div>
        ))}
    </div>
  );
};

export default Stats;