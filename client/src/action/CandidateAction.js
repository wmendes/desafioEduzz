import * as ActionType from './ActionType';
import CandidateApi from '../api/CandidateApi';
import { ApiCallBeginAction, ApiCallErrorAction } from './ApiAction';



export const getCandidatesResponse = candidates => ({
    type: ActionType.GET_CANDIDATES_RESPONSE,
    candidates
});



export function getCandidatesAction() {
    return (dispatch) => {

        dispatch(ApiCallBeginAction());

        return CandidateApi.getAllCandidates()
            .then(candidates => {
                dispatch(getCandidatesResponse(candidates.data.candidates));
            }).catch(error => {
                throw error;
            });
    };
}



export const addNewCandidateResponse = () => ({
    type: ActionType.ADD_NEW_CANDIDATE_RESPONSE
});



export const updateExistingCandidateResponse = () => ({
    type: ActionType.UPDATE_EXISTING_CANDIDATE_RESPONSE
});



export function saveCandidateAction(candidateBeingAddedOrEdited) {
    return function (dispatch) {

        dispatch(ApiCallBeginAction());

        if (candidateBeingAddedOrEdited.id) {
          return CandidateApi.saveCandidate(candidateBeingAddedOrEdited)
              .then(() => {
                  dispatch(updateExistingCandidateResponse());
              }).then(() => {
                  dispatch(getCandidatesAction());
              }).catch(error => {
                  dispatch(ApiCallErrorAction());
                  throw (error);
              });
        } else {
          return CandidateApi.storeCandidate(candidateBeingAddedOrEdited)
              .then(() => {
                  dispatch(addNewCandidateResponse());
              }).then(() => {
                  dispatch(getCandidatesAction());
              }).catch(error => {
                  dispatch(ApiCallErrorAction());
                  throw (error);
              });
        }
    };
}



export const getCandidateResponse = candidateFound => ({
    type: ActionType.GET_CANDIDATE_RESPONSE,
    candidate: candidateFound
});



export function getCandidateAction(candidateId) {
    return (dispatch) => {

        dispatch(ApiCallBeginAction());

        return CandidateApi.getCandidate(candidateId)
            .then(candidate => {
                dispatch(getCandidateResponse(candidate.data.candidate));
            }).catch(error => {
                throw error;
            });
    };
}



export const deleteCandidateResponse = () => ({
    type: ActionType.DELETE_CANDIDATE_RESPONSE
});



export function deleteCandidateAction(candidateId) {
    return (dispatch) => {

        dispatch(ApiCallBeginAction());

        return CandidateApi.deleteCandidate(candidateId)
            .then(() => {
                dispatch(deleteCandidateResponse());
            }).then(() => {
                dispatch(getCandidatesAction());
            }).catch(error => {
                throw error;
            });
    };
}
