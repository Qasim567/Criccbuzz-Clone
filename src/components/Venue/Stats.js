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
          'X-RapidAPI-Key': '96321480c4msh8fb1fda7b752179p177346jsn3eb6f3c4078c',
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
