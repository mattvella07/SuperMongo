import React from 'react';
import ActionFind from './actionFind.jsx';
import ActionInsert from './actionInsert.jsx';

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
                </select>

                { this.state.operation === 'find' ? <ActionFind db={this.props.selectedDB} col={this.props.selectedCol} onFind={this.props.onFind} /> : null }
                { this.state.operation === 'insert' ? <ActionInsert db={this.props.selectedDB} col={this.props.selectedCol} onInsert={this.props.onInsert} /> : null }
                
            </div>
        );
    }
}

export default ActionArea; 