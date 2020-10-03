import {
    CONTRACTS_RELOAD,
    CONTRACTS_LOADING,
    CONTRACTS_LOADING_SUCCESS,
    CONTRACTS_LOADING_FAILURE
} from '../types/types';

const initialState = {
    loading: false,
    payload: null,
    error: null
};

export default function commonReducer(state = initialState, action) {
    switch (action.type) {
        case CONTRACTS_RELOAD:
            return {
                ...state,
                payload: CONTRACTS_RELOAD
            };
        case CONTRACTS_LOADING:
            return {
                ...state,
                loading: true,
                payload: null,
                error: null
            };
        case CONTRACTS_LOADING_SUCCESS:
            return {
                ...state,
                loading: false,
                payload: action.payload,
                error: null
            };
        case CONTRACTS_LOADING_FAILURE:
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