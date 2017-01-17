import React from 'react';
import ActionFind from './actionFind.jsx';
import ActionInsertOrRemove from './actionInsertOrRemove.jsx';
import ActionUpdate from './actionUpdate.jsx';

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

                { this.state.operation === 'find' ? <ActionFind db={this.props.selectedDB} col={this.props.selectedCol} onFind={this.props.onFind} /> : null }
                { this.state.operation === 'insert' ? <ActionInsertOrRemove db={this.props.selectedDB} col={this.props.selectedCol} op={this.state.operation} onInsert={this.props.onInsert} /> : null }
                { this.state.operation === 'remove' ? <ActionInsertOrRemove db={this.props.selectedDB} col={this.props.selectedCol} op={this.state.operation} onRemove={this.props.onRemove} /> : null }
                { this.state.operation === 'update' ? <ActionUpdate onUpdate={this.props.onUpdate} /> : null }
            </div>
        );
    }
}

export default ActionArea; 