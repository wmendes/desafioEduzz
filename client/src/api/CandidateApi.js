import axios from 'axios';

const api = axios.create({
  baseURL: '//localhost:8000/api',
  timeout: 1000
});

api.interceptors.response.use((response) => {
    return response;
}, function (error) {
    return Promise.reject(error.response);
});

class CandidateApi {
    static getAllCandidates() {
        return api.get('candidates')
    }

    static saveCandidate(candidate) {
        candidate = Object.assign({}, candidate);
        return api.put('candidates/' + candidate.id, candidate)
    }

    static storeCandidate(candidate) {
        candidate = Object.assign({}, candidate);
        return api.post('candidates', candidate)
    }

    static deleteCandidate(candidateId) {
        return api.delete('candidates/' + candidateId)
    }


    static getCandidate(candidateId) {
      return api.get('candidates/' + candidateId)
    }

}

export default CandidateApi;
