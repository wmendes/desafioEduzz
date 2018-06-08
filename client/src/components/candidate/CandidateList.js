import React, { PropTypes } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const emailFormatter = (cell, row) => {
  return `<a href=mailto:${row.email}>${cell}</a>`;
};



class CandidateList extends React.Component {

    constructor(props) {
        super(props);

        this.options = {
            // sortIndicator: true,
            noDataText: 'Sem registros por enquanto'
        };

        this.selectRowProp = {
            mode: 'radio',
            bgColor: '#c1f291',
            onSelect: props.handleRowSelect,
            clickToSelect: true,
            hideSelectColumn: true
        };
    }



    render() {


        return (
            <BootstrapTable data={this.props.candidates}  selectRow={this.selectRowProp}  options={this.options} bordered={false} striped hover condensed>
                <TableHeaderColumn dataField="id" isKey hidden>Id</TableHeaderColumn>

                <TableHeaderColumn
                    dataField="name"
                    // dataFormat={emailFormatter}
                    // dataSort={true}
                    // caretRender={getCaret}
                    // filter={{type: 'TextFilter', delay: 0 }}
                    columnTitle
                >
                    Name
                </TableHeaderColumn>

                <TableHeaderColumn
                    dataField="email"
                    // dataSort={true}
                    dataFormat={emailFormatter}
                    // caretRender={getCaret}
                    columnTitle
                >
                    email
                </TableHeaderColumn>

                <TableHeaderColumn
                    dataField="mobileNumber"
                    // dataSort={true}
                    // caretRender={getCaret}
                    columnTitle
                >
                    Phone
                </TableHeaderColumn>

            </BootstrapTable>
        );
    }

}



CandidateList.propTypes = {
    candidates: PropTypes.array.isRequired,
    handleRowSelect: PropTypes.func.isRequired
};



export default CandidateList;
