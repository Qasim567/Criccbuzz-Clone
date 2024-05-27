import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './Series.css';

const Squad = () => {
  const { id } = useParams();
  const apikey = process.env.REACT_APP_API_KEY_2;
  const [squads, setSquads] = useState([]);
  const [seriesId, setSeriesId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSquads = async () => {
      const options = {
        method: 'GET',
        url: `https://cricbuzz-cricket.p.rapidapi.com/series/v1/${id}/squads`,
        headers: {
          'X-RapidAPI-Key': apikey,
          'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setSquads(response.data.squads);
        setSeriesId(response.data.seriesId); 
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSquads();
  }, [id]);

  if (loading) return <div className='my-4'>Loading...</div>;
  if (error) return <div className='my-4'>Error: {error.message}</div>;

  return (
    <div className='my-4'>
      <h1>Teams Squad</h1>
      {squads.map((squad) => (
        !squad.isHeader && (
            <div className="row mb-3" key={squad.squadId} style={{ background: '#ecebeb', padding: '10px' }}>
                <img className="col-md-2 themed-grid-col player-image" src={`https://www.cricbuzz.com/a/img/v1/6600x6600/i1/c${squad.imageId}/team-image.jpg`} alt={squad.squadType} />
                <Link to={`/squadList/${squad.squadId}/${seriesId}`} className="col-md-3 themed-grid-col text-decoration-none"><h3>{squad.squadType}</h3></Link>
            </div>
        )
      ))}
    </div>
  );
};

export default Squad;
