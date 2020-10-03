import {
    ACCOUNTS_RELOAD,
    ACCOUNTS_LOADING,
    ACCOUNTS_LOADING_SUCCESS,
    ACCOUNTS_LOADING_FAILURE
} from '../types/types';

import { postRequest } from '../util/ajax'

export const reload = () => ({
    type: ACCOUNTS_RELOAD
});

export const loading = () => ({
    type: ACCOUNTS_LOADING
});

export const loadingSuccess = (payload) => ({
    type: ACCOUNTS_LOADING_SUCCESS,
    payload
});

export const loadingFailure = (error) => ({
    type: ACCOUNTS_LOADING_FAILURE,
    error
});

export function getAccounts() {
    const body = {
        'jsonrpc': '2.0',
        'method': 'GetAccounts',
        'params': [],
        'id': 1
    };

    return dispatch => {
        dispatch(loading());
        return postRequest(body)
            .then(json => {
                dispatch(
                    loadingSuccess({
                        accounts: json.result
                    })
                );
            })
            .catch(error =>
                dispatch(loadingFailure(error))
            );
    };
}

export function getNewAccount() {
    const body = {
        'jsonrpc': '2.0',
        'method': 'GetNewAccount',
        'params': [],
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

export function deleteAccounts(addresses) {
    const body = {
        'jsonrpc': '2.0',
        'method': 'DeleteAccounts',
        'params': addresses,
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