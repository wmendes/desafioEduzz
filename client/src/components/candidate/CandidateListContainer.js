import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as candidateAction from '../../action/CandidateAction';
import CandidateList from './CandidateList';



export class CandidateListContainer extends React.Component {

    constructor() {
        super();

        this.state = {selectedCandidateId: undefined};

        this.handleAddCandidate = this.handleAddCandidate.bind(this);
        this.handleEditCandidate = this.handleEditCandidate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleRowSelect = this.handleRowSelect.bind(this);
    }


    componentDidMount() {
        this.props.action.getCandidatesAction()
            .catch(error => {
                toastr.error(error);
            });
    }



    handleAddCandidate() {
        this.props.history.push('/candidate');
    }



    handleEditCandidate() {
        const selectedCandidateId = this.state.selectedCandidateId;

        if (selectedCandidateId) {
            this.setState({selectedCandidateId: undefined});
            this.props.history.push(`/candidate/${selectedCandidateId}`);
        }
    }



    handleDelete() {
        const selectedCandidateId = this.state.selectedCandidateId;

        if (selectedCandidateId) {
            this.setState({selectedCandidateId: undefined});
            this.props.action.deleteCandidateAction(selectedCandidateId)
              .then(() => {
                  toastr.success('Deleted User');
              }).catch(error => {
                    toastr.error(error);
                });
        }
    }



    handleRowSelect(row, isSelected) {
        if (isSelected) {
            this.setState({selectedCandidateId: row.id});
        }
    }



    render() {
        const { candidates } = this.props;

        if (!candidates) {
            return (
                <div>Loading...</div>
            );
        }

        return (
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col">
                        <h1>Candidates</h1>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <div className="btn-group" role="group">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.handleAddCandidate}
                            >
                                <i className="fa fa-plus" aria-hidden="true"/> Add
                            </button>

                            <button
                                type="button"
                                className="btn btn-warning ml-2"
                                onClick={this.handleEditCandidate}
                            >
                                <i className="fa fa-pencil" aria-hidden="true"/> Edit
                            </button>

                            <button
                                type="button"
                                className="btn btn-danger ml-2"
                                onClick={this.handleDelete}
                            >
                                <i className="fa fa-trash-o" aria-hidden="true" onClick={this.handleDelete}/> Delete
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <CandidateList candidates={candidates} handleRowSelect={this.handleRowSelect}/>
                    </div>
                </div>
            </div>
        );
    }
}



const mapStateToProps = state => ({
    candidates: state.candidatesReducer.candidates
});



const mapDispatchToProps = dispatch => ({
    action: bindActionCreators(candidateAction, dispatch)

});



CandidateListContainer.propTypes = {
    candidates: PropTypes.array,
    action: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};



export default connect(mapStateToProps, mapDispatchToProps)(CandidateListContainer);
