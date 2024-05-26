import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TeamSchedule = () => {
    const { teamId } = useParams();
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const fetchSchedule = async () => {
            const options = {
                method: 'GET',
                url: `https://cricbuzz-cricket.p.rapidapi.com/teams/v1/${teamId}/schedule`,
                headers: {
                    'X-RapidAPI-Key': '56a0784ee0mshf2be9cf52cc965dp1cdd5bjsn3079f3d9fa51',
                    'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                setSchedule(response.data.teamMatchesData);
            } catch (error) {
                console.error('Error fetching the schedule:', error);
            }
        };

        fetchSchedule();
    }, [teamId]);

    return (
        <div className='my-4'>
            <h1>Match Schedule</h1>
            <div className="row mb-3" style={{ background: '#ecebeb', padding: '10px' }}>
                <p className="col-md-3 themed-grid-col">Date</p>
                <p className="col-md-6 themed-grid-col">Match Info</p>
                <p className="col-md-3 themed-grid-col">Venue</p>
            </div>
            {schedule.map((detail, index) => (
                <div key={index}>
                    {detail.matchDetailsMap && detail.matchDetailsMap.match && detail.matchDetailsMap.match.map((match) => (
                        <div className="row mb-2" style={{ paddingTop: '5px' }} key={match.matchInfo.matchId}>
                            <p className="col-md-3 themed-grid-col">{new Date(parseInt(match.matchInfo.startDate)).toLocaleDateString()}</p>
                            <p className="col-md-6 themed-grid-col">{match.matchInfo.team1.teamName} vs {match.matchInfo.team2.teamName}, {match.matchInfo.matchDesc}<br />
                                <span style={{ color: 'blue' }}>{match.matchInfo.status}</span></p>
                            <p className="col-md-3 themed-grid-col">{match.matchInfo.venueInfo.ground}, {match.matchInfo.venueInfo.city}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default TeamSchedule;
