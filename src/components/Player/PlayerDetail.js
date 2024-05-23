import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./Player.css";

const PlayerDetail = () => {
  const { id } = useParams();
  const apikey=process.env.REACT_APP_API_KEY
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchPlayerDetails(id);
    }
  }, [id]);

  const fetchPlayerDetails = async (id) => {
    try {
      const response = await axios.get('https://unofficial-cricbuzz.p.rapidapi.com/players/get-info', {
        params: { playerId: id },
        headers: {
          'X-RapidAPI-Key': apikey,
          'X-RapidAPI-Host': 'unofficial-cricbuzz.p.rapidapi.com'
        }
      });
      const cleanedBio = response.data.bio.replace(/<br\/><br\/>/g, '');
      setPlayerData({ ...response.data, bio: cleanedBio });
      setError(null);
    } catch (error) {
      console.error('Error fetching player details:', error);
      setError('Could not fetch player details. Please check the player ID and try again.');
      setPlayerData(null);
    }
  };

  return (
    <div className='container my-3'>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {playerData && (
        <div className='player-info'>
          <div className='player-header'>
            <img className="player-image" src={playerData.image} alt={playerData.name}></img>
            <div className='player-basic-info'>
              <h2>{playerData.name}</h2>
              <p>Team: {playerData.intlTeam}</p>
            </div>
          </div>
          <div className='abc'>
            <div className='player-details'>
              <div className='personal-info'>
                <h3>Personal Information</h3>
                <p><b>Born:</b> {playerData.DoB}</p>
                <p><b>Birth Place:</b> {playerData.birthPlace}</p>
                <p><b>Role:</b> {playerData.role}</p>
                <p><b>Batting Style:</b> {playerData.bat}</p>
                <p><b>Bowling Style:</b> {playerData.bowl}</p>
              </div>
              <div className='icc-rankings'>
                <h3>ICC Rankings</h3>
                <table className='rankings-table'>
                  <thead>
                    <tr className='text-center'>
                      <th></th>
                      <th>Test</th>
                      <th>ODI</th>
                      <th>T20</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><b>Batting</b></td>
                      <td>{playerData.currRank.bat.testRank}</td>
                      <td>{playerData.currRank.bat.odiRank}</td>
                      <td>{playerData.currRank.bat.t20Rank}</td>
                    </tr>
                    <tr>
                      <td><b>Bowling</b></td>
                      <td>{playerData.currRank.bowl.testBestRank}</td>
                      <td>{playerData.currRank.bowl.odiBestRank}</td>
                      <td>{playerData.currRank.bowl.t20BestRank}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className='career-info mx-4'>
              <h3>Career Information</h3>
              <p><b>Teams:</b> {playerData.teams.join(', ')}</p>
              <p><b>Bio:</b> {playerData.bio}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerDetail;
