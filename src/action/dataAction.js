import {getRequests} from "../API";
import {sortData} from "../api/utils";

export function setData(requestData){
    return {
        type:"setData",
        payload:{
            requestData
        }
    };
}

const fetchReqData = async (dispatch, param) => {
    await getRequests(param).then(response => {
        response = sortData(response);
        dispatch(setData(response))
    })
};
const fetchDataAction = (dispatch, param) => {
    return () => fetchReqData(dispatch);
};
export default fetchDataAction;

const setFilter = (dispatch, filterValue) => {
    return dispatch({
        type: "filterData",
        payload:{
            filterValue
        }
    });
};
export const setFilterAction = (dispatch) => {
    return (filterValue) => setFilter(dispatch, filterValue)
};

const deleteData = (dispatch, dataItem) => {
    return dispatch({
        type: "deleteData",
        payload:{
            dataItem
        }
    });
};
export const deleteDataAction = (dispatch) => {
    return (dataItem) => deleteData(dispatch, dataItem)
};


const updateStatusData = (dispatch, dataItem,status) => {
    return dispatch({
        type: "updateStatus",
        payload:{
            dataItem,
            status
        }
    });
};
export const updateStatusAction = (dispatch) => {
    return (dataItem,status) => updateStatusData(dispatch, dataItem,status)
};