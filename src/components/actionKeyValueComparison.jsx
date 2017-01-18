import React from 'react';
var classNames = require('classnames');

class ActionKeyValueComparison extends React.Component {
    constructor(props) {
        super(props);

        //Bind functions to this context 
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.valueChange(this.props.index, this.key, this.comparison, this.val);
    }

    render() {
        let removeBtnClass = classNames({
            'queryItem': this.props.type && this.props.type === 'queryItem' ? true : false,
            'criteriaItem': this.props.type && this.props.type === 'criteriaItem' ? true : false,
            'fa': true,
            'fa-times-circle': true
        });

        return (
            <div>
                <input type="text" placeholder="Key" onChange={this.handleChange} ref={(ref) => this.key = ref} /> 
                <select name="comparison" onChange={this.handleChange} ref={(ref) => this.comparison = ref} > 
                    <option value=":">Equals</option>
                    <option value="$lt">Less than</option>
                    <option value="$lte">Less than or equal to</option>
                    <option value="$gt">Greater than</option>
                    <option value="$gte">Greater than or equal to</option>
                    <option value="$ne">Not equal</option>
                </select>
                <input type="text" placeholder="Value" onChange={this.handleChange} ref={(ref) => this.val = ref} />&nbsp;
                { this.props.index > 0 ? <button type="button" className={removeBtnClass} onClick={this.props.removeItem}></button> : null }
            </div>
        );
    }
}

export default ActionKeyValueComparison;