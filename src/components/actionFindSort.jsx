import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class ActionFindSort extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            field: this.props.sortFields[this.props.index] || '',
            direction: this.props.sortDirections[this.props.index] || 'asc'
        };

        //Bind functions to this context 
        this.fieldChange = this.fieldChange.bind(this);
        this.directionChange = this.directionChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        //Set state with new props 
        if(nextProps) {
            if(nextProps.sortFields && nextProps.sortFields[nextProps.index]) {
                this.setState({ field: nextProps.sortFields[nextProps.index]});
            }

            if(nextProps.sortDirections && nextProps.sortDirections[nextProps.index]) {
                this.setState({ direction: nextProps.sortDirections[nextProps.index]});
            }
        } 
    }

    fieldChange(e) {
        let f = e.target.value;
        this.setState({ field: f });
        this.props.valueChange(this.props.index, f, this.state.direction);
    }

    directionChange(event, index, value) {
        let d = value;
        this.setState({ direction: d });
        this.props.valueChange(this.props.index, this.state.field, d);
    }

    render() {
        let self = this; 
        return (
            <div className="materialUIComponents">
                <TextField style={{width: 150}} hintText="Field" value={this.state.field} onChange={this.fieldChange} />
                <SelectField style={{width: 150}} name="ascOrDesc" onChange={this.directionChange} value={this.state.direction}>
                    <MenuItem value="asc" primaryText="Ascending" />
                    <MenuItem value="desc" primaryText="Descending" />
                </SelectField>

        { this.props.index > 0 ? <button type="button" className="sortItem fa fa-times" onClick={ (e) => { self.props.removeItem(e, self.props.index); }}></button> : null }
            </div>
        );
    }
}

//Type checking for props
ActionFindSort.propTypes = {
    index: React.PropTypes.number,
    sortFields: React.PropTypes.array,
    sortDirections: React.PropTypes.array,
    valueChange: React.PropTypes.func,
    removeItem: React.PropTypes.func
};

export default ActionFindSort; 