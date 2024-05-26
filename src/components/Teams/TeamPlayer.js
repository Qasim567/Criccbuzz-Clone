import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TeamPlayer = () => {
  const { teamId } = useParams();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const options = {
        method: 'GET',
        url: `https://cricbuzz-cricket.p.rapidapi.com/teams/v1/${teamId}/players`,
        headers: {
          'X-RapidAPI-Key': '56a0784ee0mshf2be9cf52cc965dp1cdd5bjsn3079f3d9fa51',
          'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setPlayers(response.data.player);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlayers();
  }, [teamId]);

  return (
    <div>
      <h1 className='my-4'>Team Players</h1>
      {players.map(player => (
        <div className="row mb-3" style={{padding:'10px'}} key={player.id}>
              <img className="col-md-1 themed-grid-col"
                src={`https://www.cricbuzz.com/a/img/v1/75x75/i1/c${player.imageId}/player-image.jpg`}
                alt={player.name}/>
              <p className="col-md-4 themed-grid-col">{player.name}</p>
          </div>
            ))}
    </div>
  );
};

export default TeamPlayer;
