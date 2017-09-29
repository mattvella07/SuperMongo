import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RemoveIcon from 'material-ui-icons/RemoveCircle';
var classNames = require('classnames');

class ActionKeyValueComparison extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            key: this.props.keys[this.props.index] || '',
            comp: this.props.comparisons[this.props.index] || ':',
            val: this.props.vals[this.props.index] || ''
        };

        //Bind functions to this context 
        this.keyChange = this.keyChange.bind(this);
        this.compChange = this.compChange.bind(this);
        this.valChange = this.valChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        //Set state with new props 
        if(nextProps) {
            this.setState({ key: nextProps.keys[nextProps.index]});
            this.setState({ comp: nextProps.comparisons[nextProps.index]});
            this.setState({ val: nextProps.vals[nextProps.index]});
        } 
    }

    keyChange(e) {
        let k = e.target.value;
        this.setState({ key: k });
        //The || '' part is used to keep the correct key and value together even if one doesn't have a value
        //It acts as a placeholder
        this.props.valueChange(this.props.index, k, this.state.comp, this.state.val || '');
    }

    compChange(event, index, value) {
        let c = value; 
        this.setState({ comp: c });
        //The || '' part is used to keep the correct key and value together even if one doesn't have a value
        //It acts as a placeholder
        this.props.valueChange(this.props.index, this.state.key || '', c, this.state.val || '');
    }

    valChange(e) {
        let v = e.target.value;
        this.setState({ val: v });
        //The || '' part is used to keep the correct key and value together even if one doesn't have a value
        //It acts as a placeholder
        this.props.valueChange(this.props.index, this.state.key || '', this.state.comp, v);
    }

    render() {
        let removeBtnClass = classNames({
                'queryItem': this.props.type && this.props.type === 'queryItem' ? true : false,
                'criteriaItem': this.props.type && this.props.type === 'criteriaItem' ? true : false
            }),
            self = this;

        return (
            <div className="materialUIComponents">
                <TextField style={{width: 150}} hintText="Key" value={this.state.key} onChange={this.keyChange} />           
                <SelectField style={{width: 200}} name="comparison" onChange={this.compChange} value={this.state.comp}>
                    <MenuItem value=":" primaryText="Equals" />
                    <MenuItem value="$lt" primaryText="Less than" />
                    <MenuItem value="$lte" primaryText="Less than or equal to" />
                    <MenuItem value="$gt" primaryText="Greater than" />
                    <MenuItem value="$gte" primaryText="Greater than or equal to" />
                    <MenuItem value="$ne" primaryText="Not equal" />
                </SelectField>
                <TextField style={{width: 150}} hintText="Value" value={this.state.val} onChange={this.valChange} />
                { this.props.index > 0 ? <RemoveIcon className={removeBtnClass} onClick={ (e) => { self.props.removeItem(self.props.index, self.props.type); }} /> : null }
            </div>
        );
    }
}

//Type checking for props
ActionKeyValueComparison.propTypes = {
    index: React.PropTypes.number,
    keys: React.PropTypes.array,
    comparisons: React.PropTypes.array,
    vals: React.PropTypes.array,
    valueChange: React.PropTypes.func,
    removeItem: React.PropTypes.func,
    type: React.PropTypes.string
};

export default ActionKeyValueComparison;
