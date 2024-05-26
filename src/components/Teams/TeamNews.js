import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TeamNews = () => {
  const apikey = process.env.REACT_APP_API_KEY_2;
  const { teamId } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      const options = {
        method: 'GET',
        url: `https://cricbuzz-cricket.p.rapidapi.com/news/v1/team/${teamId}`,
        headers: {
          'X-RapidAPI-Key': apikey,
          'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setNews(response.data.storyList.filter(item => item.story));
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchNews();
  }, [teamId]);

  if (loading) return <p className='my-4'>Loading...</p>;
  if (error) return <p className='my-4'>Error loading news: {error.message}</p>;

  return (
    <div className='my-4'>
    <h2>Cricket News</h2>
  {news.map(({ story }) => (
    <div className="row mb-3" style={{padding:'10px'}}>
    <img className="col-md-3 themed-grid-col" 
    src={`https://www.cricbuzz.com/a/img/v1/300x300/i1/c${story.imageId}/team-image.jpg`}
           alt={story.coverImage.caption}/>
    <p className="col-md-6 themed-grid-col">{story.storyType}-{story.context}<br/>
    <h2>{story.hline}</h2><br/>{story.intro}</p>
</div>
  ))}
</div>
  );
};

export default TeamNews;
