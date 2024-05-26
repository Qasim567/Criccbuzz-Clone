import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Stats from './Stats'
import VenueMatches from './VenueMatches';

const Venue = () => {
  const apikey = process.env.REACT_APP_API_KEY_2;
  const { id } = useParams();
  const [venueData, setVenueData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenueData = async () => {
      const options = {
        method: 'GET',
        url: `https://cricbuzz-cricket.p.rapidapi.com/venues/v1/${id}`,
        headers: {
          'X-RapidAPI-Key': apikey,
          'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setVenueData(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchVenueData();
  }, [id]);

  if (error) {
    return <div className='my-4'>Error: {error}</div>;
  }

  if (!venueData) {
    return <div className='my-4'>Loading...</div>;
  }

  return (
    <div className='my-5'>
      <div>
        <h1 classNameS="col-md-6">{venueData.ground}</h1>
      </div>
      <div>
        <p className="col-md-6"><strong>{venueData.city}</strong></p>
      </div>
      <div>
        <img className="col-md-6" src={venueData.imageUrl} alt={`${venueData.ground} image`} />
      </div>
      <h3 className='my-2' style={{backgroundColor:'#ecebeb'}}>Facts</h3>
      <div className="row mb-3">
        <p className="col-md-2">Capacity</p>
        <p className="col-md-10">{venueData.capacity}</p>
      </div>
      <div className="row mb-3">
        <p className="col-md-2">Known as</p>
        <p className="col-md-10">{venueData.knownAs}</p>
      </div>
      <div className="row mb-3">
        <p className="col-md-2">Ends</p>
        <p className="col-md-10">{venueData.ends}</p>
      </div>
      <div className="row mb-3">
        <p className="col-md-2">Location</p>
        <p className="col-md-10">{venueData.city}, {venueData.country}</p>
      </div>
      <div className="row mb-3">
        <p className="col-md-2">Home to</p>
        <p className="col-md-10">{venueData.homeTeam}</p>
      </div>
      <div className="row mb-3">
        <p className="col-md-2">Time Zone</p>
        <p className="col-md-10">{venueData.timezone}</p>
      </div>
      <div className="row mb-3">
        <p className="col-md-2">Floodlights</p>
        <p className="col-md-10">{venueData.floodlights}</p>
      </div>
      <div className="row mb-3">
        <p className="col-md-2">Curator</p>
        <p className="col-md-10">{venueData.curator}</p>
      </div>
      <div className="row mb-3">
        <p className="col-md-2">Ground Length</p>
        <p className="col-md-10">{venueData.groundLength}</p>
      </div>
      <div className="row mb-3">
        <p className="col-md-2">Ground Width</p>
        <p className="col-md-10">{venueData.groundWidth}</p>
      </div>
      <div className="row mb-3">
        <p className="col-md-2">Other Sports</p>
        <p className="col-md-10">{venueData.otherSports}</p>
      </div>
      <Stats/>
      <VenueMatches/>
      <h3 className='my-2' style={{backgroundColor:'#ecebeb'}}>Facts</h3>
      <div className="row mb-3">
        <p className="col-md-12">{venueData.profile}</p>
      </div>
    </div>
  );
};

export default Venue;
