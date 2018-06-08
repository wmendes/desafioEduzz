import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as candidateAction from '../../action/CandidateAction';
import CandidateForm from './CandidateForm'; // eslint-disable-line import/no-named-as-default



export class AddOrEditCandidateContainer extends React.Component {


    constructor() {
        super();
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        this.state = {
        }

    }



    componentDidMount() {

        if(this.props.match.params.id){
          this.props.action.getCandidateAction(this.props.match.params.id)
              .catch(error => {
                  toastr.error(error);
              });
        }

    }

    componentWillReceiveProps(nextProps){
      if (nextProps.initialValues) {

      }
      this.setState({'initialValues':nextProps.initialValues});
    }

    handleSave(values) {
        const candidate = {
            id: values.id,
            name: values.name,
            mobileNumber: values.mobileNumber,
            email: values.email
        };

        this.props.action.saveCandidateAction(candidate)
            .then(() => {
                toastr.success('Saved User');
                this.props.history.push('/');
            }).catch(error => {
                toastr.error(error.data.message);
            });
    }


    handleStore(values) {
        const candidate = {
            name: values.name,
            mobileNumber: values.mobileNumber,
            email: values.email
        };

        this.props.action.saveCandidateAction(candidate)
            .then(() => {
                toastr.success('Saved User');
                this.props.history.push('/');
                this.state = {
                }

            }).catch(error => {
                toastr.error(error.data.message);
            });
    }



    handleCancel(event) {
        event.preventDefault();
        this.props.history.replace('/');
        // this.setState({'initialValues':this.props.initialValues});
    }



    render() {
        const { initialValues } = this.props;
        console.log(this.state)
        const heading = initialValues && initialValues.id ? 'Edit' : 'New';

        return (
            <div className="container">
                <CandidateForm
                    heading={heading}
                    handleSave={this.handleSave}
                    handleCancel={this.handleCancel}
                    initialValues={this.state.initialValues}
                />
            </div>
        );
    }
}



const mapStateToProps = (state, ownProps) => {
    const candidateId = ownProps.match.params.id; //from the path '/candidate/:id'
    if (candidateId && state.selectedCandidateReducer.candidate && candidateId === state.selectedCandidateReducer.candidate.id) {
        return {
            initialValues: state.selectedCandidateReducer.candidate,
        };
    } else {
        return {
        };
    }
};



const mapDispatchToProps = dispatch => ({
    action: bindActionCreators({ ...candidateAction }, dispatch)
});



AddOrEditCandidateContainer.propTypes = {
    action: PropTypes.object.isRequired,
    history: PropTypes.object,
    initialValues: PropTypes.object,
    match: PropTypes.object.isRequired
};



export default connect(mapStateToProps, mapDispatchToProps)(AddOrEditCandidateContainer);
