import React from 'react';
import ActionFind from './actionFind.jsx';
import ActionInsertOrRemove from './actionInsertOrRemove.jsx';

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
                </select>

                { this.state.operation === 'find' ? <ActionFind db={this.props.selectedDB} col={this.props.selectedCol} onFind={this.props.onFind} /> : null }
                { this.state.operation === 'insert' ? <ActionInsertOrRemove db={this.props.selectedDB} col={this.props.selectedCol} op={this.state.operation} onInsert={this.props.onInsert} /> : null }
                { this.state.operation === 'remove' ? <ActionInsertOrRemove db={this.props.selectedDB} col={this.props.selectedCol} op={this.state.operation} onRemove={this.props.onRemove} /> : null }
                
            </div>
        );
    }
}

export default ActionArea; 