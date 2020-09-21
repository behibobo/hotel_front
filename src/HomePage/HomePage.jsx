import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { hotelActions } from '../_actions';

function HomePage() {
    const hotels = useSelector(state => state.hotels);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(hotelActions.getAll());
    }, []);

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h1>Hi {user.firstName}!</h1>
            <p>You're logged in with React Hooks!!</p>
            <h3>All registered users:</h3>
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
            <p>
                <Link to="/login">Logout</Link>
            </p>
        </div>
    );
}

export { HomePage };