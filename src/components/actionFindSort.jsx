import React from 'react';

class ActionFindSort extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            field: this.props.sortFields[this.props.index] || '',
            direction: this.props.sortDirections[this.props.index] || ''
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
        this.setState({ field: e.target.value });
        this.props.valueChange(this.props.index, this.sortField, this.sortDirection);
    }

    directionChange(e) {
        this.setState({ direction: e.target.value });
        this.props.valueChange(this.props.index, this.sortField, this.sortDirection);
    }

    render() {
        let self = this; 
        return (
            <div>
                <input type="text" placeholder="Field" value={this.state.field} onChange={this.fieldChange} ref={(ref) => this.sortField = ref} />
                <select name="ascOrDesc" value={this.state.direction} onChange={this.directionChange} ref={(ref) => this.sortDirection = ref} >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
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