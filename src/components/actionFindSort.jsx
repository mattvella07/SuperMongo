import React from 'react';

class ActionFindSort extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            field: (this.props.sortFields[this.props.index]) ? this.props.sortFields[this.props.index].value : '',
            direction: (this.props.sortDirections[this.props.index]) ? this.props.sortDirections[this.props.index].value : ''
        };

        //Bind functions to this context 
        this.fieldChange = this.fieldChange.bind(this);
        this.directionChange = this.directionChange.bind(this);
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
        return (
            <div>
                <input type="text" placeholder="Field" value={this.state.field} onChange={this.fieldChange} ref={(ref) => this.sortField = ref} />
                <select name="ascOrDesc" value={this.state.direction} onChange={this.directionChange} ref={(ref) => this.sortDirection = ref} >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
                { this.props.index > 0 ? <button type="button" className="sortItem fa fa-times-circle" onClick={this.props.removeItem}></button> : null }
            </div>
        );
    }
}

export default ActionFindSort; 