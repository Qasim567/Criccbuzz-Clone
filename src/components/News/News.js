import React, { useEffect, useState } from 'react';
import axios from 'axios';

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const options = {
        method: 'GET',
        url: 'https://cricbuzz-cricket.p.rapidapi.com/news/v1/index',
        headers: {
          'X-RapidAPI-Key': '56a0784ee0mshf2be9cf52cc965dp1cdd5bjsn3079f3d9fa51',
          'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setNews(response.data.storyList.filter(item => item.story));
      } catch (error) {
        console.error(error);
      }
    };

    fetchNews();
  }, []);

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

export default News;
