import * as ActionType from '../action/ActionType';
import initialState from './initialState';
import _ from 'lodash';

const candidatesReducer = (state = initialState.candidatesReducer, action) => {
    switch(action.type) {
        case ActionType.GET_CANDIDATES_RESPONSE: {
            return {
                ...state,
                candidates: _.assign(action.candidates)
            };
        }

        default: { return state; }
    }
};

export default candidatesReducer;
