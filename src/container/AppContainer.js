import React,{ Component } from 'react';
import { connect } from 'react-redux';
import './appContainer.css';

import CustomFilter from '../component/CustomFilter';
import DataTable from '../component/DataTable';

import fetchDataAction, {setFilterAction, deleteDataAction, updateStatusAction} from "../action/dataAction";
import {sortData} from "../api/utils";

const filterList = [
    'Approved',
    'Pending',
    'Denied'
];
const heading = [
    'Title',
    'Status',
    'Created',
    'Updated',
    'Delete'
];

class AppContainer extends Component{
    onSelectChange = (filterValue) => {
        this.props.filterData(filterValue);
    };

    onDelete = (dataItem) => {
        this.props.deleteData(dataItem);
    };

    onStatusUpdate = (dataItem,status) => {
        this.props.updateStatus(dataItem,status);
    };

    componentDidMount() {
        this.props.getData();
    }

    render() {
        let requestData = this.props.requestData;
        return (
            <div>
                <div className = 'RequestDiv'>Requests</div>
                <div className='LabelDiv'>
                    <label id='label'>Filter by Status:</label>
                    <CustomFilter filterList = {filterList}
                                  onSelectChange = {this.onSelectChange}/>
                </div>
                <div className='dataDiv'>
                    {requestData ? <DataTable heading = {heading}
                                              requestData = {requestData}
                                              filterList = {filterList}
                                              onDelete = {this.onDelete}
                                              onStatusUpdate={this.onStatusUpdate}/> : null
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let filterValue = state.dataReducer.filterValue;
    let requestData = state.dataReducer.requestData;

    /*Filter Data*/
    let r_data = requestData;
    if(filterValue !== 'All'){
        r_data = requestData.filter(request =>
            !(filterValue.localeCompare(request.status)));
    }

    /*Sort Data*/
    let finalData = sortData(r_data);

    /*Return Final Data*/
    return {
        requestData: finalData,
        filterValue:state.dataReducer.filterValue
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getData: fetchDataAction(dispatch),
        filterData: setFilterAction(dispatch),
        deleteData: deleteDataAction(dispatch),
        updateStatus: updateStatusAction(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
