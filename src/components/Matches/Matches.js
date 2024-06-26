import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Matches.css';
import { Link } from 'react-router-dom';

export default function Matches() {
  const apikey = process.env.REACT_APP_API_KEY_1;
  const [matches, setMatches] = useState([]);
  const [matchState, setMatchState] = useState('live');
  const [matchType, setMatchType] = useState('international');
  const [loading, setLoading] = useState(true);

  const fetchData = async (selectedMatchState, selectedMatchType) => {
    const options = {
      method: 'GET',
      url: 'https://unofficial-cricbuzz.p.rapidapi.com/matches/list',
      params: { matchState: selectedMatchState },
      headers: {
        'X-RapidAPI-Key': apikey,
        'X-RapidAPI-Host': 'unofficial-cricbuzz.p.rapidapi.com'
      }
    };

    try {
      setLoading(true);
      const response = await axios.request(options);
      const filteredMatches = response.data.typeMatches.filter(
        match => match.matchType.toLowerCase() === selectedMatchType
      );
      setMatches(filteredMatches);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(matchState, matchType);
  }, [matchState, matchType]);

  const hasNoLiveMatches = () => {
    return matchState === 'live' && (!matches || matches.length === 0);
  };

  return (
    <div className='my-4'>
      <h1>Live Cricket Score</h1>
      <div className="match-state-buttons my-2">
        <button
          className={matchState === 'live' ? 'active' : ''}
          onClick={() => setMatchState('live')}
        >
          Live
        </button>
        <button
          className={matchState === 'recent' ? 'active' : ''}
          onClick={() => setMatchState('recent')}
        >
          Recent
        </button>
        <button
          className={matchState === 'upcoming' ? 'active' : ''}
          onClick={() => setMatchState('upcoming')}
        >
          Upcoming
        </button>
      </div>
      <div className="format-buttons my-2">
        <button
          className={matchType === 'international' ? 'active' : ''}
          onClick={() => setMatchType('international')}
        >
          International
        </button>
        <button
          className={matchType === 'league' ? 'active' : ''}
          onClick={() => setMatchType('league')}
        >
          Leagues
        </button>
        <button
          className={matchType === 'domestic' ? 'active' : ''}
          onClick={() => setMatchType('domestic')}
        >
          Domestic
        </button>
        <button
          className={matchType === 'women' ? 'active' : ''}
          onClick={() => setMatchType('women')}
        >
          Women
        </button>
      </div>
      {hasNoLiveMatches() && <p className='my-4'>There are no live matches at the moment. Please check back later.</p>}
      {!loading && matches && matches.map((matchTypeData, matchTypeIndex) => (
        <div className="my-4" key={matchTypeIndex}>
          {matchTypeData.seriesAdWrapper && matchTypeData.seriesAdWrapper.map((seriesWrapper, seriesWrapperIndex) => (
            seriesWrapper.seriesMatches && (
              <div key={seriesWrapperIndex}>
                {seriesWrapper.seriesMatches.matches.reduce((rows, match, index) => {
                  if (index % 3 === 0) rows.push([]);
                  rows[rows.length - 1].push(match);
                  return rows;
                }, []).map((matchRow, rowIndex) => (
                  <div className="row" key={rowIndex}>
                    {matchRow.map((match, matchIndex) => (
                      <div key={matchIndex} className="col-md-4 mb-4">
                        <div className="card shadow-sm">
                          <div className="card-header py-3 bg-success">
                            <h4><b>{matchTypeData.matchType}</b></h4>
                          </div>
                          <div className="card-body">
                            <p>
                              <b>{match.matchInfo.seriesName}, {match.matchInfo.matchDesc}</b><br />
                              <p>
                                <b>Venue:</b> {match.matchInfo.venueInfo.city}, {match.matchInfo.venueInfo.ground}
                              </p>
                            </p>
                            <ul className="list-unstyled mt-3 mb-4">
                              <li>
                                {match.matchInfo.team1.teamName}
                                {match.matchScore?.team1Score?.inngs1 &&
                                  `: ${match.matchScore.team1Score.inngs1.runs}-${match.matchScore.team1Score.inngs1.wickets}`}
                                {!match.matchScore?.team1Score?.inngs1 && ''}
                              </li>
                              <li>
                                {match.matchInfo.team2.teamName}
                                {match.matchScore?.team2Score?.inngs1 &&
                                  `: ${match.matchScore.team2Score.inngs1.runs}-${match.matchScore.team2Score.inngs1.wickets}`}
                                {!match.matchScore?.team2Score?.inngs1 && ''}
                              </li>
                              <li style={{ color: 'red' }}>{match.matchInfo.status}</li>
                            </ul>
                            <Link className='link' to={`/scoreboard/${match.matchInfo.matchId}`}>Scoreboard</Link>
                            <Link className='link mx-2' to={`/matchinfo/${match.matchInfo.matchId}`}>Match Facts</Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )
          ))}
        </div>
      ))}
    </div>
  );
}
