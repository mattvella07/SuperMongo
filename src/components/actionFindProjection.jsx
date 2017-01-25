import React from 'react';

class ActionFindProjection extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            val: (this.props.projectionVals[this.props.index]) ? this.props.projectionVals[this.props.index].value : '',
            field: (this.props.projectionFields[this.props.index]) ? this.props.projectionFields[this.props.index].value : ''
        };

        //Bind functions to this context 
        this.valChange = this.valChange.bind(this);
        this.fieldChange = this.fieldChange.bind(this);
    }

    valChange(e) {
        this.setState({ val: e.target.value });
        this.props.valueChange(this.props.index, this.projectionValue, this.projectionField);
    }

    fieldChange(e) {
        this.setState({ field: e.target.value });
        this.props.valueChange(this.props.index, this.projectionValue, this.projectionField);
    }

    render() {
        return (
            <div>
                <select name="hideOrShow" value={this.state.val} onChange={this.valChange} ref={(ref) => this.projectionValue = ref} >
                    <option value="1">Show</option>
                    <option value="0">Hide</option>
                </select>
                <input type="text" placeholder="Field" value={this.state.field} onChange={this.fieldChange} ref={(ref) => this.projectionField = ref} />
                { this.props.index > 0 ? <button type="button" className="projectionItem fa fa-times-circle" onClick={this.props.removeItem}></button> : null }
            </div>
        );
    }
}

export default ActionFindProjection;