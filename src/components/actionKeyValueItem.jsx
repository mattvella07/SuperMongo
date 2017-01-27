import React from 'react';
var classNames = require('classnames');

class ActionInsertItem extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            key: (this.props.keys && this.props.keys[this.props.index]) ? this.props.keys[this.props.index].value : '',
            val: (this.props.vals && this.props.vals[this.props.index]) ? this.props.vals[this.props.index].value : ''
        };

        //Bind functions to this context 
        this.keyChange = this.keyChange.bind(this);
        this.valChange = this.valChange.bind(this);
    }

    keyChange(e) {
        this.setState({ key: e.target.value });
        this.props.textChange(this.props.index, this.key, this.val);
    }

    valChange(e) {
        this.setState({ val: e.target.value });
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
                <input type="text" placeholder="Key" value={this.state.key} onChange={this.keyChange} ref={(ref) => this.key = ref} /> 
                <input type="text" placeholder="Value" value={this.state.val} onChange={this.valChange} ref={(ref) => this.val = ref} />
                { this.props.index > 0 ? <button type="button" className={removeBtnClass} onClick={this.props.removeItem}></button> : null }
            </div>
        );
    }
}

export default ActionInsertItem;