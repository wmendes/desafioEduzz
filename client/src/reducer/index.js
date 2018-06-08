import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import candidatesReducer from './candidatesReducer';
import selectedCandidateReducer from './selectedCandidateReducer';
import apiReducer from './apiReducer';

export default combineReducers({
    candidatesReducer,
    selectedCandidateReducer,
    apiReducer,
    form: formReducer
});
