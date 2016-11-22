import React from 'react';

class ActionFindQuery extends React.Component {
    constructor(props) {
        super(props);

        //Bind functions to this context 
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.valueChange(this.props.index, this.queryKey, this.queryComparison, this.queryVal);
    }

    render() {
        return (
            <div>
                <input type="text" placeholder="Key" onChange={this.handleChange} ref={(ref) => this.queryKey = ref} /> 
                <select name="comparison" onChange={this.handleChange} ref={(ref) => this.queryComparison = ref} > 
                    <option value=":">Equals</option>
                    <option value="$lt">Less than</option>
                    <option value="$lte">Less than or equal to</option>
                    <option value="$gt">Greater than</option>
                    <option value="$gte">Greater than or equal to</option>
                    <option value="$ne">Not equal</option>
                </select>
                <input type="text" placeholder="Value" onChange={this.handleChange} ref={(ref) => this.queryVal = ref} />&nbsp;
                { this.props.index > 0 ? <button type="button" className="queryItem fa fa-times-circle" onClick={this.props.removeItem}></button> : null }
            </div>
        );
    }
}

export default ActionFindQuery;