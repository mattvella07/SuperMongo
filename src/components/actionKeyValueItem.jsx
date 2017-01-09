import React from 'react';

class ActionInsertItem extends React.Component {
    constructor(props) {
        super(props);

        //Bind functions to this context 
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.textChange(this.props.index, this.key, this.val);
    }

    render() {
        return (
            <div>
                <input type="text" placeholder="Key" onChange={this.handleChange} ref={(ref) => this.key = ref} /> 
                <input type="text" placeholder="Value" onChange={this.handleChange} ref={(ref) => this.val = ref} />
                { this.props.index > 0 ? <button type="button" className="fa fa-times-circle" onClick={this.props.removeItem}></button> : null }
            </div>
        );
    }
}

export default ActionInsertItem;