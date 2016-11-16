import React from 'react';

class ActionInsertItem extends React.Component {
    constructor(props) {
        super(props);

        //Bind functions to this context 
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.textChange(this.props.index, this.insertKey, this.insertVal);
    }

    render() {
        return (
            <div>
                <input type="text" placeholder="Key" onChange={this.handleChange} ref={(ref) => this.insertKey = ref} /> 
                <input type="text" placeholder="Value" onChange={this.handleChange} ref={(ref) => this.insertVal = ref} />
                { this.props.index > 0 ? <button type="button" onClick={this.props.removeItem}>x</button> : null }
            </div>
        );
    }
}

export default ActionInsertItem;