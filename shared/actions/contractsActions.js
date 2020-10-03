import {
    CONTRACTS_RELOAD,
    CONTRACTS_LOADING,
    CONTRACTS_LOADING_SUCCESS,
    CONTRACTS_LOADING_FAILURE
} from '../types/types';

import { postRequest } from '../util/ajax'

export const reload = () => ({
    type: CONTRACTS_RELOAD
});

export const loading = () => ({
    type: CONTRACTS_LOADING
});

export const loadingSuccess = (payload) => ({
    type: CONTRACTS_LOADING_SUCCESS,
    payload
});

export const loadingFailure = (error) => ({
    type: CONTRACTS_LOADING_FAILURE,
    error
});

export function getContracts() {
    const body = {
        'jsonrpc': '2.0', 
        'method': 'GetContracts', 
        'params': [], 
        'id': 1
    };

    return dispatch => {
        dispatch(loading());
        return postRequest(body)
            .then(json => {
                dispatch(
                    loadingSuccess({
                        contracts: json.result
                    })
                );
            })
            .catch(error =>
                dispatch(loadingFailure(error))
            );
    };
}

export function watchContracts(contract) {
    const body = {
        'jsonrpc': '2.0', 
        'method': 'WatchContracts', 
        'params': [contract], 
        'id': 1
    };

    return dispatch => {
        dispatch(loading());
        return postRequest(body)
            .then(() => {
                dispatch(reload());
            })
            .catch(error =>
                dispatch(loadingFailure(error))
            );
    };
}

export function deleteContracts(contracts) {
    const body = {
        'jsonrpc': '2.0', 
        'method': 'DeleteContracts', 
        'params': contracts, 
        'id': 1
    };

    return dispatch => {
        dispatch(loading());
        return postRequest(body)
            .then(() => {
                dispatch(reload());
            })
            .catch(error =>
                dispatch(loadingFailure(error))
            );
    };
}