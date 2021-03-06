import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RemoveIcon from 'material-ui-icons/RemoveCircle';
import MenuItem from 'material-ui/MenuItem';

class ActionFindProjection extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            val: this.props.projectionVals[this.props.index] || '1',
            field: this.props.projectionFields[this.props.index] || ''
        };

        //Bind functions to this context 
        this.valChange = this.valChange.bind(this);
        this.fieldChange = this.fieldChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        //Set state with new props 
        if(nextProps) {
            this.setState({ val: nextProps.projectionVals[nextProps.index]});
            this.setState({ field: nextProps.projectionFields[nextProps.index]});
        } 
    }

    valChange(event, index, value) {
        let v = value;
        this.setState({ val: v });
        //The || ' ' part is used to keep the correct key and value together even if one doesn't have a value
        //It acts as a placeholder
        this.props.valueChange(this.props.index, v, this.state.field || '');
    }

    fieldChange(e) {
        let f = e.target.value;
        this.setState({ field: f });
        this.props.valueChange(this.props.index, this.state.val, f);
    }

    render() {
        return (
            <div className="materialUIComponents">
                <SelectField style={{width: 100}} name="hideOrShow" onChange={this.valChange} value={this.state.val}>
                    <MenuItem value="1" primaryText="Show" />
                    <MenuItem value="0" primaryText="Hide" />
                </SelectField>
                <TextField style={{width: 150}} hintText="Field" value={this.state.field} onChange={this.fieldChange} />
                { this.props.index > 0 ? <RemoveIcon className='projectionItem' onClick={ e => this.props.removeItem(this.props.index, this.props.type) } /> : null }
            </div>
        );
    }
}

//Type checking for props
ActionFindProjection.propTypes = {
    index: React.PropTypes.number,
    projectionVals: React.PropTypes.array,
    projectionFields: React.PropTypes.array,
    valueChange: React.PropTypes.func,
    removeItem: React.PropTypes.func
};

export default ActionFindProjection;
