import React from 'react';

class ActionFindSort extends React.Component {
    constructor(props) {
        super(props);

        //Bind functions to this context 
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.valueChange(this.props.index, this.sortField, this.sortDirection);
    }

    render() {
        return (
            <div>
                <input type="text" placeholder="Field" onChange={this.handleChange} ref={(ref) => this.sortField = ref} />
                <select name="ascOrDesc" onChange={this.handleChange} ref={(ref) => this.sortDirection = ref} >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
        );
    }
}

export default ActionFindSort; 