import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Commentary = () => {
  const apikey = process.env.REACT_APP_API_KEY_1;
  const { matchId } = useParams();
  const [commentaryData, setCommentaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://unofficial-cricbuzz.p.rapidapi.com/matches/get-commentaries',
      params: { matchId: matchId },
      headers: {
        'X-RapidAPI-Key': apikey,
        'X-RapidAPI-Host': 'unofficial-cricbuzz.p.rapidapi.com'
      }
    };

    axios.request(options)
      .then(response => {
        setCommentaryData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [matchId]);

  if (loading) return <p className='my-4'>Loading...</p>;
  if (error) return <p className='my-4'>Error fetching data: {error.message}</p>;

  return (
    <div className='my-4'>
      <h1>Match Commentary</h1>
      <h2>{commentaryData.matchHeaders.status}</h2>
      <div>
        {commentaryData.commentaryLines.map((line, index) => {
          const { commentary } = line;
          const timestamp = commentary?.timestamp;
          const commtxt = commentary?.commtxt;

          if (!timestamp || !commtxt) return null;

          return (
            <div key={index}>
              <p>{new Date(parseInt(timestamp)).toLocaleString()}</p>
              <p>{commtxt}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Commentary;
