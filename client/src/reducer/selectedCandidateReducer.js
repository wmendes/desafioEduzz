import * as ActionType from '../action/ActionType';
import initialState from './initialState';
import _ from 'lodash';


const selectedCandidateReducer = (state = initialState.selectedCandidateReducer, action) => {
    switch(action.type) {

        case ActionType.GET_CANDIDATE_RESPONSE: {
            return {
                ...state,
                candidate: _.assign(action.candidate)
            };
        }

        default: { return state; }
    }
};


export default selectedCandidateReducer;
