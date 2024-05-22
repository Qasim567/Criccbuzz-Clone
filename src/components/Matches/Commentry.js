import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Commentary () {
  const { matchId } = useParams();
  const [commentaryData, setCommentaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommentaryData = async () => {
      const options = {
        method: 'GET',
        url: 'https://unofficial-cricbuzz.p.rapidapi.com/matches/get-commentaries',
        params: { matchId },
        headers: {
          'X-RapidAPI-Key': '56a0784ee0mshf2be9cf52cc965dp1cdd5bjsn3079f3d9fa51',
          'X-RapidAPI-Host': 'unofficial-cricbuzz.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setCommentaryData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCommentaryData();
  }, [matchId]);

  if (loading) return <div className='my-4'>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='my-4'>
      <h1>Match Commentary</h1>
      {commentaryData && (
        <div>
          <h2>Match Status: {commentaryData.matchHeaders.status}</h2>
          <h3>{commentaryData.matchHeaders.matchDesc}</h3>
          <p>
            {commentaryData.matchHeaders.teamDetails.batTeamName} vs {commentaryData.matchHeaders.teamDetails.bowlTeamName}
          </p>
          <h4>Commentary:</h4>
          <ul>
            {commentaryData.commentaryLines.map((line, index) => (
              <li key={index}>
                {new Date(parseInt(line.commentary.timestamp)).toLocaleTimeString()}: {line.commentary.commtxt}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};