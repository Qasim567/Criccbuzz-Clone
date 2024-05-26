import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const VenueMatches = () => {
    const { id } = useParams();
    const [matches, setMatches] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const options = {
            method: 'GET',
            url: `https://cricbuzz-cricket.p.rapidapi.com/venues/v1/${id}/matches`,
            headers: {
                'X-RapidAPI-Key': '9d5ecbf72fmsh80034365670a1d2p1317c3jsna96cf5494285',
                'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
            }
        };

        const fetchData = async () => {
            try {
                const response = await axios.request(options);
                setMatches(response.data.matchDetails);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!matches.length) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h3 style={{ backgroundColor: '#ecebeb' }}>Venue Matches</h3>
            {matches.map((matchDetail, index) => (
                matchDetail.matchDetailsMap ? (
                    <div classname='my-3' key={index}>
                        <h4 className='my-2'>{matchDetail.matchDetailsMap.key} matches scheduled at this venue</h4>
                        {matchDetail.matchDetailsMap.match.map(match => (
                            <div key={match.matchInfo.matchId} className="row mb-3 my-2">
                                <p className="col-md-3">{new Date(parseInt(match.matchInfo.startDate)).toLocaleString()}</p>
                                <p className="col-md-9">{match.matchInfo.team1.teamName} vs {match.matchInfo.team2.teamName}, {match.matchInfo.matchDesc}</p>
                            </div>
                        ))}
                    </div>
                ) : null
            ))}
        </div>
    );
};

export default VenueMatches;
