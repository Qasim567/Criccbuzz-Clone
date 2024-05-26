import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Venues = () => {
    const { id } = useParams();
    const [venues, setVenues] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVenues = async () => {
            const options = {
                method: 'GET',
                url: `https://cricbuzz-cricket.p.rapidapi.com/series/v1/${id}/venues`,
                headers: {
                    'X-RapidAPI-Key': '9d5ecbf72fmsh80034365670a1d2p1317c3jsna96cf5494285',
                    'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                setVenues(response.data.seriesVenue);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchVenues();
    }, [id]);

    return (
        <div className='my-4'>
            <h1>Venues</h1>
            {error && <p>Error fetching data: {error}</p>}
            <div>
                {venues.map((venue) => (
                    <div className="col-md-12 my-3">
                        <div className="row g-0  overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col-auto d-none d-lg-block">
                                <img src='https://static.cricbuzz.com/a/img/v1/205x152/i1/c189174/ma-chidambaram-stadium.jpg' alt="..." />
                            </div>
                            <div className="col p-4 d-flex flex-column position-static">
                                <Link to={`/venue/${venue.id}`} className="mb-0">{venue.ground}</Link>
                                <div className="mb-1 text-body-secondary">{venue.city}, {venue.country}</div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Venues;
