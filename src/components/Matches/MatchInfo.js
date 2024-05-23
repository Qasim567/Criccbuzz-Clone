import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function MatchInfo () {
  const { matchId } = useParams();
  const apikey=process.env.REACT_APP_API_KEY
  const [matchData, setMatchData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://unofficial-cricbuzz.p.rapidapi.com/matches/get-info', {
          params: { matchId },
          headers: {
            'x-rapidapi-key': apikey,
            'x-rapidapi-host': 'unofficial-cricbuzz.p.rapidapi.com'
          }
        });
        setMatchData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [matchId]);

  return (
    <div className='my-4'>
      {matchData ? (
        <div>
          <h2 className='bg-dark text-white'><span className='mx-3'>Match Info</span></h2>
          <table>
            <tr>
                <td><b>Match:</b></td>
                <td>{matchData.team1.teamName} vs {matchData.team2.teamName}, {matchData.matchDesc}, {matchData.seriesName}</td>
            </tr>
            <tr>
                <td><b>Date:</b></td>
                <td>{new Date(parseInt(matchData.startDate)).toLocaleDateString()}</td>
            </tr>
            <tr>
                <td><b>Venue:</b></td>
                <td>{matchData.venueInfo.ground}, {matchData.venueInfo.city}, {matchData.venueInfo.country}</td>
            </tr>
            <tr>
                <td><b>Status:</b></td>
                <td>{matchData.status}</td>
            </tr>
            <tr>
                <td><b>Umpires:</b></td>
                <td>{matchData.umpire1.name || '- -'} {matchData.umpire2.name || '- -'}</td>
            </tr>
            <tr>
                <td><b>Third Umpire:</b></td>
                <td>{matchData.umpire3.name || '- -'}</td>
            </tr>
            <tr>
                <td><b>Referee:</b></td>
                <td>{matchData.referee.name || '- -'}</td>
            </tr>
          </table>
          <h2 className='bg-dark text-white my-3'><span className='mx-3'>Venue Guide</span></h2>
          <table>
            <tr>
                <td><b>Stadium:</b></td>
                <td>{matchData.venueInfo.ground}</td>
            </tr>
            <tr>
                <td><b>City:</b></td>
                <td>{matchData.venueInfo.city}</td>
            </tr>
            <tr>
                <td><b>Ends:</b></td>
                <td>{matchData.venueInfo.ends}</td>
            </tr>
            <tr>
                <td><b>Home Team:</b></td>
                <td>{matchData.venueInfo.homeTeam}</td>
            </tr>
            <tr>
                <td><b>Hosts to:</b></td>
                <td>{matchData.venueInfo.country}</td>
            </tr>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

