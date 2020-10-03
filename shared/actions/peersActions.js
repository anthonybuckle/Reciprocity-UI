import {
    PEERS_RELOAD,
    PEERS_LOADING,
    PEERS_LOADING_SUCCESS,
    PEERS_LOADING_FAILURE
} from '../types/types';

import { postRequest } from '../util/ajax'

export const reload = () => ({
    type: PEERS_RELOAD
});

export const loading = () => ({
    type: PEERS_LOADING
});

export const loadingSuccess = (payload) => ({
    type: PEERS_LOADING_SUCCESS,
    payload
});

export const loadingFailure = (error) => ({
    type: PEERS_LOADING_FAILURE,
    error
});

export function getPeers() {
    const body = {
        'jsonrpc': '2.0', 
        'method': 
        'GetPeers', 
        'params': [], 
        'id': 1
    };

    return dispatch => {
        dispatch(loading());
        return postRequest(body)
            .then(json => {
                dispatch(
                    loadingSuccess({
                        peers: json.result
                    })
                );
            })
            .catch(error =>
                dispatch(loadingFailure(error))
            );
    };
}

export function addPeers(peer) {
    const body = {
        'jsonrpc': '2.0', 
        'method': 
        'AddPeers', 
        'params': [peer], 
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

export function deletePeers(peers) {
    const body = {
        'jsonrpc': '2.0', 
        'method': 'DeletePeers', 
        'params': peers, 
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