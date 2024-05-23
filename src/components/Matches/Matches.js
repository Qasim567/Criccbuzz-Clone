import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Matches.css';
import { Link } from 'react-router-dom';

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [matchState, setMatchState] = useState('live');
  const [loading, setLoading] = useState(true);

  const fetchData = async (selectedMatchState) => {
    const options = {
      method: 'GET',
      url: 'https://unofficial-cricbuzz.p.rapidapi.com/matches/list',
      params: { matchState: selectedMatchState },
      headers: {
        'X-RapidAPI-Key': '9d5ecbf72fmsh80034365670a1d2p1317c3jsna96cf5494285',
        'X-RapidAPI-Host': 'unofficial-cricbuzz.p.rapidapi.com'
      }
    };

    try {
      setLoading(true);
      const response = await axios.request(options);
      setMatches(response.data.typeMatches);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(matchState);
  }, [matchState]);

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

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
      {loading && <h5 className='text-center'><b>Loading matches...</b></h5>}
      {hasNoLiveMatches() && <p className='my-4'>There are no live matches at the moment. Please check back later.</p>}
      {!loading && matches && matches.map((matchType, matchTypeIndex) => (
        <div className="my-4" key={matchTypeIndex}>
          {matchType.seriesAdWrapper && matchType.seriesAdWrapper.map((seriesWrapper, seriesWrapperIndex) => (
            seriesWrapper.seriesMatches && (
              <div key={seriesWrapperIndex}>
                {chunkArray(seriesWrapper.seriesMatches.matches, 3).map((matchRow, rowIndex) => (
                  <div className="row" key={rowIndex}>
                    {matchRow.map((match, matchIndex) => (
                      <div key={matchIndex} className="col-md-4 mb-4">
                        <div className="card mb-4 rounded-3 shadow-sm">
                          <div className="card-header py-3 bg-success">
                            <h4 className="my-0 fw-normal primary"><b>{matchType.matchType}</b></h4>
                          </div>
                          <div className="card-body">
                            <p className="card-title pricing-card-title">
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
                            {/* <Link className='link' to={`/commentary/${match.matchInfo.matchId}`}>Full Commentary</Link> */}
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
