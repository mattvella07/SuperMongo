import React from 'react';
var classNames = require('classnames');

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
        let removeBtnClass = classNames({
            'criteriaItem': this.props.type && this.props.type === 'criteriaItem' ? true : false,
            'updatedItem': this.props.type && this.props.type === 'updatedItem' ? true : false,
            'fa': true,
            'fa-times-circle': true
        });

        return (
            <div>
                <input type="text" placeholder="Key" onChange={this.handleChange} ref={(ref) => this.key = ref} /> 
                <input type="text" placeholder="Value" onChange={this.handleChange} ref={(ref) => this.val = ref} />
                { this.props.index > 0 ? <button type="button" className={removeBtnClass} onClick={this.props.removeItem}></button> : null }
            </div>
        );
    }
}

export default ActionInsertItem;