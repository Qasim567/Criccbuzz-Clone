import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TeamList = () => {
  const apikey = process.env.REACT_APP_API_KEY_2;
  const [testTeams, setTestTeams] = useState([]);
  const [associateTeams, setAssociateTeams] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://cricbuzz-cricket.p.rapidapi.com/teams/v1/international',
      headers: {
        'X-RapidAPI-Key': apikey,
        'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.request(options);
        const teams = response.data.list;

        const testTeams = [];
        const associateTeams = [];

        let isTestTeams = true;

        teams.forEach(team => {
          if (team.teamName === 'Test Teams') {
            isTestTeams = true;
          } else if (team.teamName === 'Associate Teams') {
            isTestTeams = false;
          } else if (isTestTeams) {
            testTeams.push(team);
          } else {
            associateTeams.push(team);
          }
        });

        setTestTeams(testTeams);
        setAssociateTeams(associateTeams);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
        <h2 className='my-5 text-center'>Test Teams</h2>       
        <div className="row row-cols-1 row-cols-md-3">
        {testTeams.map((team) => (
        <div className="col" key={team.teamId}>
          <div className="card shadow-sm my-3">
            <img src={`https://www.cricbuzz.com/a/img/v1/3200x3200/i1/c${team.imageId}/team-image.jpg`} 
            height='150px'  alt={team.teamName}/>
            <div className="card-body">
              <p className="card-text text-center"><b>{team.teamName} ({team.teamSName})</b></p>
              <Link className='mx-3 text-decoration-none' to={`/teamschedule/${team.teamId}`}>Schedule</Link>
              <Link className='mx-4 text-decoration-none' to={`/teamresult/${team.teamId}`}>Result</Link>
              <Link className='mx-4 text-decoration-none' to={`/teamnews/${team.teamId}`}>News</Link>
              <Link className='mx-4 text-decoration-none' to={`/teamplayer/${team.teamId}`}>Players</Link>
            </div>
          </div>
        </div>
        ))}
        </div>
        <h2 className='my-5 text-center'>Associate Teams</h2>       
        <div className="row row-cols-1 row-cols-md-3">
        {associateTeams.map((team) => (
        <div className="col" key={team.teamId}>
          <div className="card shadow-sm my-3">
            <img src={`https://www.cricbuzz.com/a/img/v1/1600x1600/i1/c${team.imageId}/team-image.jpg`} 
            height='150px' alt={team.teamName}/>
            <div className="card-body">
              <p className="card-text text-center"><b>{team.teamName} ({team.teamSName})</b></p>
              <Link className='mx-3 text-decoration-none' to={`/teamschedule/${team.teamId}`}>Schedule</Link>
              <Link className='mx-4 text-decoration-none' to={`/teamresult/${team.teamId}`}>Result</Link>
              <Link className='mx-4 text-decoration-none' to={`/teamnews/${team.teamId}`}>News</Link>
              <Link className='mx-4 text-decoration-none' to={`/teamplayer/${team.teamId}`}>Players</Link>
            </div>
          </div>
        </div>
        ))}
        </div>
    </div>
  );
};

export default TeamList;
