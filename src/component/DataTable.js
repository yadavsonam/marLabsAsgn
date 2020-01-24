import React from 'react';
import PropTypes from "prop-types"
import Tooltip from '@material-ui/core/Tooltip';
import './DataTable.css';

import { formatDate } from '../../src/api/utils';
import {colorCode,DEFAULT_COLOR} from '../../src/api/constants';

const StatusContent = (props) => {
    let dataItem = props.dataItem;
    let excludeStatus = dataItem.status;
    let list = props.filterList;

    let nList = list.filter(item => item !== excludeStatus);

    let listItems = nList.map((item,i) => <div key={i} onClick={() => props.onStatusUpdate(dataItem,item)}>{item}</div>);
    return (
        <div className='StatusTooltip'>
            {listItems}
        </div>
    )
};

class DataTable extends React.Component{
    getColor = (status) => {
        if(status in colorCode){
            return colorCode[status];
        }
        return DEFAULT_COLOR;
    };

    render() {
        let props = this.props;
        let keys = props.heading;
        let requestData = props.requestData;
        let filterList = props.filterList;
        let onStatusUpdate = props.onStatusUpdate;

        let tableHeading = keys.map((key, i) => {
            return <th style={{width:20}} key={i}>{key}</th>
        });

        let requestDataList = requestData.map((data, i) => {
            let color = this.getColor(data.status);
            return (
                <tr key={i} style={{backgroundColor:color}}>
                    <td id='td'>{data.title}</td>
                    <td id='td'>
                        <u>
                            <Tooltip arrow placement="left" interactive
                                title={<StatusContent filterList={filterList}
                                                      dataItem={data}
                                                      onStatusUpdate={onStatusUpdate}/>}>
                                <div>{data.status}</div>
                            </Tooltip>
                        </u>
                    </td>
                    <td id='td'>{formatDate(data.created_at)}</td>
                    <td id='td'>{formatDate(data.updated_at)}</td>
                    <td id='td'><u onClick={() => {props.onDelete(data)}}>Delete</u></td>
                </tr>
            );
        });

        return (
            <div>
                <table>
                    <tbody>
                        <tr className='headingRow'>{tableHeading}</tr>
                        {requestDataList}
                    </tbody>
                </table>
            </div>
        );
    }
}

DataTable.propTypes = {
    heading: PropTypes.array,
    requestData: PropTypes.array,
    onDelete: PropTypes.func,
    filterList: PropTypes.array,
    onStatusUpdate: PropTypes.func
};

export default DataTable;