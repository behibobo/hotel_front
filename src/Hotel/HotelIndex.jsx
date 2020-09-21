import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { hotelActions } from '../_actions';

function HotelIndex() {
    const hotels = useSelector(state => state.hotels);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(hotelActions.getAll());
    }, []);


    return (
        <div className="col-lg-8 offset-lg-2">
            {hotels.loading && <em>Loading hotels...</em>}
            {hotels.error && <span className="text-danger">ERROR: {hotels.error}</span>}
            {hotels.items &&
                <ul>
                    {hotels.items.map((hotel, index) =>
                        <li key={hotel.id}>
                            {hotel.name}
                            
                        </li>
                    )}
                </ul>
            }
        </div>
    );
}

export default HotelIndex;