import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Matches.css';

export default function MatchesSchedule() {
    const [schedule, setSchedule] = useState([]);
    const [category, setCategory] = useState('international');

    useEffect(() => {
        const fetchSchedule = async (selectedCategory) => {
            const options = {
                method: 'GET',
                url: `https://cricbuzz-cricket.p.rapidapi.com/schedule/v1/${selectedCategory}`,
                headers: {
                    'X-RapidAPI-Key': '96321480c4msh8fb1fda7b752179p177346jsn3eb6f3c4078c',
                    'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com',
                },
            };

            try {
                const response = await axios.request(options);
                setSchedule(response.data.matchScheduleMap);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSchedule(category);
    }, [category]);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div>
            <h2 className='my-5 mx-3'>{capitalizeFirstLetter(category)} Cricket Schedule</h2>
            <div className="format-buttons my-2">
                <button
                    className={category === 'international' ? 'active' : ''}
                    onClick={() => setCategory('international')}
                >
                    International
                </button>
                <button
                    className={category === 'league' ? 'active' : ''}
                    onClick={() => setCategory('league')}
                >
                    Leagues
                </button>
                <button
                    className={category === 'domestic' ? 'active' : ''}
                    onClick={() => setCategory('domestic')}
                >
                    Domestic
                </button>
                <button
                    className={category === 'women' ? 'active' : ''}
                    onClick={() => setCategory('women')}
                >
                    Women
                </button>
            </div>
            {schedule.map((day, index) => (
                <div key={index}>
                    {day.scheduleAdWrapper && (
                        <div>
                            <p style={{ backgroundColor: 'lightgray', padding: '10px' }}><b>{new Date(day.scheduleAdWrapper.date).toDateString()}</b></p>
                            {day.scheduleAdWrapper.matchScheduleList.map((series, seriesIndex) => (
                                <div key={seriesIndex} style={{ marginBottom: '20px' }}>
                                    {series.matchInfo.map((match, matchIndex) => (
                                        <div className='abc' key={matchIndex} style={{ marginBottom: '10px' }}>
                                            <div className='series-name'>
                                                <b>{series.seriesName}</b>
                                            </div>
                                            <div className='match-details'>
                                                <span>{match.team1.teamName} vs {match.team2.teamName}, {match.matchDesc}</span><br />
                                                <span>{match.venueInfo.ground}, {match.venueInfo.city}</span>
                                            </div>
                                            <div className='match-time'>
                                                <span>{new Date(parseInt(match.startDate)).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
