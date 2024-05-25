import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Schedule = () => {
    const { id } = useParams();
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const fetchSchedule = async () => {
            const options = {
                method: 'GET',
                url: `https://cricbuzz-cricket.p.rapidapi.com/series/v1/${id}`,
                headers: {
                    'X-RapidAPI-Key': '96321480c4msh8fb1fda7b752179p177346jsn3eb6f3c4078c',
                    'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                setSchedule(response.data.matchDetails);
            } catch (error) {
                console.error('Error fetching the schedule:', error);
            }
        };

        fetchSchedule();
    }, [id]);

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

export default Schedule;
