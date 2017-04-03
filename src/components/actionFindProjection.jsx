import React from 'react';

class ActionFindProjection extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            val: this.props.projectionVals[this.props.index] || '',
            field: this.props.projectionFields[this.props.index] || ''
        };

        //Bind functions to this context 
        this.valChange = this.valChange.bind(this);
        this.fieldChange = this.fieldChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        //Set state with new props 
        if(nextProps) {
            if(nextProps.projectionVals && nextProps.projectionVals[nextProps.index]) {
                this.setState({ val: nextProps.projectionVals[nextProps.index]});
            }

            if(nextProps.projectionFields && nextProps.projectionFields[nextProps.index]) {
                this.setState({ field: nextProps.projectionFields[nextProps.index]});
            }
        } 
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
        let self = this;
        return (
            <div>
                <select name="hideOrShow" value={this.state.val} onChange={this.valChange} ref={(ref) => this.projectionValue = ref} >
                    <option value="1">Show</option>
                    <option value="0">Hide</option>
                </select>
                <input type="text" placeholder="Field" value={this.state.field} onChange={this.fieldChange} ref={(ref) => this.projectionField = ref} />
                { this.props.index > 0 ? <button type="button" className="projectionItem fa fa-times" onClick={ (e) => { self.props.removeItem(e, self.props.index); }}></button> : null }
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