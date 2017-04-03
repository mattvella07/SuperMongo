import React from 'react';
import ActionFind from './actionFind.jsx';
import ActionInsert from './actionInsert.jsx';
import ActionUpdate from './actionUpdate.jsx';
import ActionRemove from './actionRemove.jsx';

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

    opChange(e) {
        this.setState({ operation: e.target.value });
    }

    render() {
        return (
            <div className="actionArea">
                <select name="operations" onChange={this.opChange} value={this.state.operation} > 
                    <option value="find">Find</option>
                    <option value="insert">Insert</option>
                    <option value="remove">Remove</option>
                    <option value="update">Update</option>
                </select>

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