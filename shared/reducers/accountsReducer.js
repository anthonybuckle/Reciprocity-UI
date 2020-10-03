import {
    ACCOUNTS_RELOAD,
    ACCOUNTS_LOADING,
    ACCOUNTS_LOADING_SUCCESS,
    ACCOUNTS_LOADING_FAILURE
} from '../types/types';

const initialState = {
    loading: false,
    payload: null,
    error: null
};

export default function commonReducer(state = initialState, action) {
    switch (action.type) {
        case ACCOUNTS_RELOAD:
            return {
                ...state,
                payload: ACCOUNTS_RELOAD
            };
        case ACCOUNTS_LOADING:
            return {
                ...state,
                loading: true,
                payload: null,
                error: null
            };
        case ACCOUNTS_LOADING_SUCCESS:
            return {
                ...state,
                loading: false,
                payload: action.payload,
                error: null
            };
        case ACCOUNTS_LOADING_FAILURE:
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