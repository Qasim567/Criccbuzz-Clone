import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SquadList = () => {
  const { squadId, seriesId } = useParams();
  const apikey = process.env.REACT_APP_API_KEY_2;
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSquadPlayers = async () => {
      const options = {
        method: 'GET',
        url: `https://cricbuzz-cricket.p.rapidapi.com/series/v1/${seriesId}/squads/${squadId}`,
        headers: {
          'X-RapidAPI-Key': apikey,
          'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
        }
      };
  
      try {
        const response = await axios.request(options);
        console.log('API Response:', response.data);
        setPlayers(response.data.player);
      } catch (error) {
        console.error('Error fetching squad players:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchSquadPlayers();
  }, [squadId, seriesId, apikey]);
  

  if (loading) return <div className='my-4'>Loading...</div>;
  if (error) return <div className='my-4'>Error: {error.message}</div>;

  return (
    <div className='my-4'>
      <h1>Players in Squad for Series ID: {seriesId}</h1>
      {players.map((player) => (
        <div className="row mb-3" key={player.id} style={{ background: '#ecebeb', padding: '10px' }}>
          <img className="col-md-2 themed-grid-col player-image" src={`https://www.cricbuzz.com/a/img/v1/6600x6600/i1/c${player.imageId}/player-image.jpg`} alt={player.name} />
          <div className="col-md-3 themed-grid-col"><h3>{player.name}</h3></div>
        </div>
      ))}
    </div>
  );
};

export default SquadList;
