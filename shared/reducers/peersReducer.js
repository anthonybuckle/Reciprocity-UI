import {
    PEERS_RELOAD,
    PEERS_LOADING,
    PEERS_LOADING_SUCCESS,
    PEERS_LOADING_FAILURE
} from '../types/types';

const initialState = {
    loading: false,
    payload: null,
    error: null
};

export default function commonReducer(state = initialState, action) {
    switch (action.type) {
        case PEERS_RELOAD:
            return {
                ...state,
                payload: PEERS_RELOAD
            };
        case PEERS_LOADING:
            return {
                ...state,
                loading: true,
                payload: null,
                error: null
            };
        case PEERS_LOADING_SUCCESS:
            return {
                ...state,
                loading: false,
                payload: action.payload,
                error: null
            };
        case PEERS_LOADING_FAILURE:
            return {
                ...state,
                loading: false,
                payload: null,
                error: action.error
            };

        default:
            return state;
    }
}