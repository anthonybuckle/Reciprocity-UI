import { combineReducers } from 'redux';
import accounts from './accountsReducer';
import contracts from './contractsReducer';
import peers from './peersReducer';

export default combineReducers({
    accounts,
    contracts,
    peers
});