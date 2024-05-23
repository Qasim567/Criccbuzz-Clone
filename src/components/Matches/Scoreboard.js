import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Scoreboard() {
    const { matchId } = useParams();
    const apikey=process.env.REACT_APP_API_KEY
    const [scoreData, setScoreData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Match ID:", matchId);
        const fetchData = async () => {
            const options = {
                method: 'GET',
                url: 'https://unofficial-cricbuzz.p.rapidapi.com/matches/get-scorecard',
                params: { matchId },
                headers: {
                    'X-RapidAPI-Key': apikey,
                    'X-RapidAPI-Host': 'unofficial-cricbuzz.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                setScoreData(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [matchId]);
    
    if (loading) {
        return <div className='my-4'>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!scoreData || !scoreData.scorecard || scoreData.scorecard.length === 0) {
        return <div className='my-4'>There is no scorecard available for this match</div>;
    }

    return (
        <div className='my-4'>
            <h5 className='text-danger'>{scoreData.status}</h5>
            {scoreData.scorecard.map((inning, index) => (
                <div key={index}>
                    <h2>{inning.batTeamName} Innings - {inning.score}/{inning.wickets} ({inning.overs} Ov)</h2>
                    <table className="table">
                        <thead>
                            <tr className="table-secondary text-center">
                                <th className="text-center" scope="col">Batter</th>
                                <th className="text-center" scope="col">R</th>
                                <th className="text-center" scope="col">B</th>
                                <th className="text-center" scope="col">4s</th>
                                <th className="text-center" scope="col">6s</th>
                                <th className="text-center" scope="col">SR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inning.batsman.map((batsman) => (
                                <tr key={batsman.id}>
                                    <td style={{ color: 'blue', textAlign: 'left' }}>
                                        <span>{batsman.name}</span>
                                        <span style={{ marginLeft: '10px', color: 'black' }}>{batsman.outDec || 'Did not Bat'}</span>
                                    </td>
                                    <td className="text-center">{batsman.runs || 0}</td>
                                    <td className="text-center">{batsman.balls || 0}</td>
                                    <td className="text-center">{batsman.fours || 0}</td>
                                    <td className="text-center">{batsman.sixes || 0}</td>
                                    <td className="text-center">{batsman.strkRate || 0}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h5 className='my-2'><b>Fall of wickets</b></h5>
                    {inning.fow && (
                        <div>
                            <p>
                                {inning.fow[0].fow.map((wicket, wIndex) => (
                                    `${wicket.runs || 0} (${wicket.batsmanName || 'Unknown'}, ${wicket.overNbr || 0}) `
                                ))}
                            </p>
                        </div>
                    )}
                    <table className="table">
                        <thead>
                            <tr className="table-secondary">
                                <th className="text-center" scope="col">Bowler</th>
                                <th className="text-center" scope="col">R</th>
                                <th className="text-center" scope="col">W</th>
                                <th className="text-center" scope="col">ECO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inning.bowler.map((bowler) => (
                                <tr key={bowler.id}>
                                    <td style={{ color: 'blue' }}>{bowler.name}</td>
                                    <td className="text-center">{bowler.runs || 0}</td>
                                    <td className="text-center">{bowler.wickets || 0}</td>
                                    <td className="text-center">{bowler.economy || 0}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};