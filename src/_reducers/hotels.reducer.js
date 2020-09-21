import { hotelConstants } from '../_constants';

export function hotels(state = {}, action) {
    switch (action.type) {
        case hotelConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case hotelConstants.GETALL_SUCCESS:
            return {
                items: action.hotels
            };
        case hotelConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        
        default:
            return state
    }
}