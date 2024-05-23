import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Commentary = () => {
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
          'X-RapidAPI-Key': '9d5ecbf72fmsh80034365670a1d2p1317c3jsna96cf5494285',
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='my-4'>
      <h1>Match Commentary</h1>
      {commentaryData && (
        <div>
          <h2>Match Status: {commentaryData.matchHeaders.status}</h2>
          <h3>{commentaryData.matchHeaders.matchDesc}</h3>
          {/* <h3>{commentaryData.matchHeaders.momPlayer.player[0].name}</h3> */}
          <h4>Commentary:</h4>
          <ul className='list-group'>
            {commentaryData.commentaryLines.map((lines,Index) => (
              <li className='list-group-item' key={Index}>
               {lines.commentary.commtxt}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Commentary;
