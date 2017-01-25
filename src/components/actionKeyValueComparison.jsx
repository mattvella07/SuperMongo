import React from 'react';
var classNames = require('classnames');

class ActionKeyValueComparison extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            key: (this.props.keys && this.props.keys[this.props.index]) ? this.props.keys[this.props.index].value : '',
            comp: (this.props.comparisons && this.props.comparisons[this.props.index]) ? this.props.comparisons[this.props.index].value : '',
            val: (this.props.vals && this.props.vals[this.props.index]) ? this.props.vals[this.props.index].value : ''
        };

        //Bind functions to this context 
        this.keyChange = this.keyChange.bind(this);
        this.compChange = this.compChange.bind(this);
        this.valChange = this.valChange.bind(this);
    }

    keyChange(e) {
        this.setState({ key: e.target.value });
        this.props.valueChange(this.props.index, this.key, this.comparison, this.val);
    }

    compChange(e) {
        this.setState({ comp: e.target.value });
        this.props.valueChange(this.props.index, this.key, this.comparison, this.val);
    }

    valChange(e) {
        this.setState({ val: e.target.value });
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
                <input type="text" placeholder="Key" value={this.state.key} onChange={this.keyChange} ref={(ref) => this.key = ref} /> 
                <select name="comparison" value={this.state.comp} onChange={this.compChange} ref={(ref) => this.comparison = ref} > 
                    <option value=":">Equals</option>
                    <option value="$lt">Less than</option>
                    <option value="$lte">Less than or equal to</option>
                    <option value="$gt">Greater than</option>
                    <option value="$gte">Greater than or equal to</option>
                    <option value="$ne">Not equal</option>
                </select>
                <input type="text" placeholder="Value" value={this.state.val} onChange={this.valChange} ref={(ref) => this.val = ref} />&nbsp;
                { this.props.index > 0 ? <button type="button" className={removeBtnClass} onClick={this.props.removeItem}></button> : null }
            </div>
        );
    }
}

export default ActionKeyValueComparison;