import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PointsTable = () => {
    const apikey = process.env.REACT_APP_API_KEY_2;
    const { id } = useParams();
    const [pointsTable, setPointsTable] = useState([]);

    useEffect(() => {
    const fetchPointsTable = async () => {
        const options = {
            method: 'GET',
            url: `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/series/${id}/points-table`,
            headers: {
                'X-RapidAPI-Key': apikey,
                'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setPointsTable(response.data.pointsTable[0].pointsTableInfo);
        } catch (error) {
            console.error(error);
        }
    };

    fetchPointsTable();
    }, [id]);

    return (
        <div className='my-4'>
            <h1>Points Table</h1>
            {pointsTable.length > 0 && (
                <div>
                    <div className="row mb-3" style={{ background: '#ecebeb', paddingTop: '10px' }}>
                        <p className="col-md-6 themed-grid-col">Team</p>
                        <p className="col-md-1 themed-grid-col">Mat</p>
                        <p className="col-md-1 themed-grid-col">Won</p>
                        <p className="col-md-1 themed-grid-col">Lost</p>
                        <p className="col-md-1 themed-grid-col">NR</p>
                        <p className="col-md-1 themed-grid-col">Pts</p>
                        <p className="col-md-1 themed-grid-col">NRR</p>
                    </div>
                    {pointsTable.map((team) => (
                        <div className="row mb-3" style={{ padding: '10px' }} key={team.id}>
                            <b className="col-md-6 themed-grid-col">{team.teamFullName || 0}</b>
                            <b className="col-md-1 themed-grid-col">{team.matchesPlayed || 0}</b>
                            <b className="col-md-1 themed-grid-col">{team.matchesWon || 0}</b>
                            <b className="col-md-1 themed-grid-col">{team.matchesLost || 0}</b>
                            <b className="col-md-1 themed-grid-col">{team.noRes || 0}</b>
                            <b className="col-md-1 themed-grid-col">{team.points || 0}</b>
                            <b className="col-md-1 themed-grid-col">{team.nrr || 0}</b>
                        </div>
                    ))}
                </div>
            )}
            {pointsTable.length === 0 && (
                    <div className="container" style={{ textAlign: 'center' }}>
                            No Points Table for this series
                    </div>
            )}
        </div>
    );
};

export default PointsTable;
