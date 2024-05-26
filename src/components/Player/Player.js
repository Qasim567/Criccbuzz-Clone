import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Player = () => {
  const apikey=process.env.REACT_APP_API_KEY_1
  const [searchText, setSearchText] = useState('');
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const options = {
        method: 'GET',
        url: 'https://unofficial-cricbuzz.p.rapidapi.com/players/search',
        params: { plrN: searchText },
        headers: {
          'X-RapidAPI-Key': apikey,
          'X-RapidAPI-Host': 'unofficial-cricbuzz.p.rapidapi.com'
        }
      };
      const response = await axios.request(options);
      console.log(response.data);
      if (response.data.player && response.data.player.length > 0) {
        setPlayers(response.data.player);
      } else {
        setPlayers([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const handlePlayerClick = (playerId) => {
    navigate(`/player/${playerId}`);
  };

  return (
    <div className="my-3">
      <div className="container search-container">
        <input
          type="text"
          placeholder="Search your player"
          value={searchText}
          onChange={handleChange}
          className="search"
        />
        <button type="button" className="btn btn-sm custombtn" onClick={handleSearch}>
          Search
        </button>
      </div>

      {players.length > 0 && (
        <div className="container">
          <table className="table table-hover table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Team Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={player.id}>
                  <td>{index + 1}</td>
                  <td className="col-4">{player.name}</td>
                  <td className="col-4">{player.teamName}</td>
                  <td className="col-4">
                    <button
                      className="btn btn-sm btn-danger text-center"
                      onClick={() => handlePlayerClick(player.id)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {players.length === 0 && (
        <div className="container" style={{ textAlign: 'center' }}>
          No player found.
        </div>
      )}
    </div>
  );
};

export default Player;
