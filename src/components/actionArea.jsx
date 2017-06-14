import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ActionFind from './actionFind.jsx';
import ActionInsert from './actionInsert.jsx';
import ActionUpdate from './actionUpdate.jsx';
import ActionRemove from './actionRemove.jsx';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

class ActionArea extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            operation: 'find'
        };

        //Bind functions to this context 
        this.opChange = this.opChange.bind(this);
    } 

    opChange(event, index, value) {
        this.setState({ operation: value });
    }

    render() {
        return (
            <div className="actionArea">
                <SelectField style={{width: 125}} floatingLabelText="Operation" name="operations" onChange={this.opChange} value={this.state.operation}>
                    <MenuItem value="find" primaryText="Find" />
                    <MenuItem value="insert" primaryText="Insert" />
                    <MenuItem value="remove" primaryText="Remove" />
                    <MenuItem value="update" primaryText="Update" />
                </SelectField>

                { this.state.operation === 'find' ? <ActionFind onFind={this.props.onFind} /> : null }
                { this.state.operation === 'insert' ? <ActionInsert onInsert={this.props.onInsert} /> : null }
                { this.state.operation === 'remove' ? <ActionRemove onRemove={this.props.onRemove} /> : null }
                { this.state.operation === 'update' ? <ActionUpdate onUpdate={this.props.onUpdate} /> : null }
            </div>
        );
    }
}

//Type checking for props
ActionArea.propTypes = {
    onFind: React.PropTypes.func,
    onInsert: React.PropTypes.func,
    onRemove: React.PropTypes.func,
    onUpdate: React.PropTypes.func
};

export default ActionArea; 