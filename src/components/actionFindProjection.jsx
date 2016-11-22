import React from 'react';

class ActionFindProjection extends React.Component {
    constructor(props) {
        super(props);

        //Bind functions to this context 
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.valueChange(this.props.index, this.projectionValue, this.projectionField);
    }

    render() {
        return (
            <div>
                <select name="hideOrShow" onChange={this.handleChange} ref={(ref) => this.projectionValue = ref} >
                    <option value="1">Show</option>
                    <option value="0">Hide</option>
                </select>
                <input type="text" placeholder="Field" onChange={this.handleChange} ref={(ref) => this.projectionField = ref} />
                { this.props.index > 0 ? <button type="button" className="projectionItem fa fa-times-circle" onClick={this.props.removeItem}></button> : null }
            </div>
        );
    }
}

export default ActionFindProjection;