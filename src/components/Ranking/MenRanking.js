import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Rankings.css';

export default function MenRanking() {
  const [rankings, setRankings] = useState([]);
  const [format, setFormat] = useState('test');
  const [category, setCategory] = useState('batsmen');

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const fetchRankings = async (selectedFormat, selectedCategory) => {
    const options = {
      method: 'GET',
      url: `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/rankings/${selectedCategory}`,
      params: { formatType: selectedFormat },
      headers: {
        'X-RapidAPI-Key': '56a0784ee0mshf2be9cf52cc965dp1cdd5bjsn3079f3d9fa51',
        'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setRankings(response.data.rank);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRankings(format, category);
  }, [format, category]);

  const renderTableHeaders = () => {
    if (category === 'teams') {
      return (
        <tr>
          <th>Position</th>
          <th>Team</th>
          <th>Rating</th>
        </tr>
      );
    } else {
      return (
        <tr>
          <th>Position</th>
          <th>Player</th>
          <th>Country</th>
          <th>Rating</th>
        </tr>
      );
    }
  };

  const renderTableRows = () => {
    if (category === 'teams') {
      return rankings.map((team) => (
        <tr key={team.id}>
          <td>{team.rank}</td>
          <td>
            <img className="col-md-3 themed-grid-col player-image"
              src={`https://www.cricbuzz.com/a/img/v1/300x300/i1/c${team.imageId}/team-image.jpg`}
               alt='abc' />
            {team.name}
          </td>
          <td>{team.rating}</td>
        </tr>
      ));
    } else {
      return rankings.map((player) => (
        <tr key={player.id}>
          <td>{player.rank}</td>
          <td>
            <img className="col-md-3 themed-grid-col player-image"
              src={`https://www.cricbuzz.com/a/img/v1/300x300/i1/c${player.faceImageId}/team-image.jpg`}
              alt='abc' />
            {player.name}
          </td>
          <td>{player.country}</td>
          <td>{player.rating}</td>
        </tr>
      ));
    }
  };

  return (
    <div className='my-4'>
      <h1>ICC Cricket Rankings - Men's {capitalizeFirstLetter(category)}</h1>
      <div className="category-buttons">
        <button
          className={category === 'batsmen' ? 'active' : ''}
          onClick={() => setCategory('batsmen')}
        >
          Batting
        </button>
        <button
          className={category === 'bowlers' ? 'active' : ''}
          onClick={() => setCategory('bowlers')}
        >
          Bowling
        </button>
        <button
          className={category === 'allrounders' ? 'active' : ''}
          onClick={() => setCategory('allrounders')}
        >
          All-rounders
        </button>
        <button
          className={category === 'teams' ? 'active' : ''}
          onClick={() => setCategory('teams')}
        >
          Teams
        </button>
      </div>
      <div className="format-buttons my-2">
        <button
          className={format === 'test' ? 'active' : ''}
          onClick={() => setFormat('test')}
        >
          TEST
        </button>
        <button
          className={format === 'odi' ? 'active' : ''}
          onClick={() => setFormat('odi')}
        >
          ODI
        </button>
        <button
          className={format === 't20' ? 'active' : ''}
          onClick={() => setFormat('t20')}
        >
          T20
        </button>
      </div>
      <table>
        <thead>
          {renderTableHeaders()}
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </table>
    </div>
  );
}
