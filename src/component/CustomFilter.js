import React from 'react';
import PropTypes from "prop-types"
import './CustomFilter.css';

class CustomFilter extends React.Component{
    onSelectChange = (e) => {
        this.props.onSelectChange(e.target.value);
    };

    render(){
        let props = this.props;
        let filterList = props.filterList;

        let filters = filterList.map((filterName,i) =>
            <option key={i} value={filterName}>{filterName}</option>
        );

        return(
            <select className='SelectFilter'
                    onChange={this.onSelectChange}>
                <option value='All'>All</option>
                {filters}
            </select>
        );
    }
}

CustomFilter.propTypes = {
    filterList : PropTypes.array,
    onSelectChange: PropTypes.func
};

export default CustomFilter;