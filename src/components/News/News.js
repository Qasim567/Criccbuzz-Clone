import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './News.css';

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const options = {
        method: 'GET',
        url: 'https://cricbuzz-cricket.p.rapidapi.com/news/v1/index',
        headers: {
          'X-RapidAPI-Key': '96321480c4msh8fb1fda7b752179p177346jsn3eb6f3c4078c',
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
        src={`https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${story.imageId}/i.jpg`}
               alt={story.coverImage.caption}/>
        <p className="col-md-6 themed-grid-col">{story.storyType}-{story.context}<br/>
        <h2>{story.hline}</h2><br/>{story.intro}</p>
    </div>
      ))}
    </div>
  );
};

export default News;
