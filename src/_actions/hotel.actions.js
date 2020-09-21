import { hotelConstants } from '../_constants';
import { hotelService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const hotelActions = {
    getAll,
};


function getAll() {
    return dispatch => {
        dispatch(request());

        hotelService.getAll()
            .then(
                hotels => dispatch(success(hotels)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: hotelConstants.GETALL_REQUEST } }
    function success(hotels) { return { type: hotelConstants.GETALL_SUCCESS, hotels } }
    function failure(error) { return { type: hotelConstants.GETALL_FAILURE, error } }
}
