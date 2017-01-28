import React from 'react';
var classNames = require('classnames');

class ActionInsertItem extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            key: this.props.keys[this.props.index] || '',
            val: this.props.vals[this.props.index] || ''
        };

        //Bind functions to this context 
        this.keyChange = this.keyChange.bind(this);
        this.valChange = this.valChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        //Set state with new props 
        if(nextProps) {
            if(nextProps.keys && nextProps.keys[nextProps.index]) {
                this.setState({ key: nextProps.keys[nextProps.index]});
            }

            if(nextProps.vals && nextProps.vals[nextProps.index]) {
                this.setState({ val: nextProps.vals[nextProps.index]});
            }
        } 
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
            }),
            self = this;

        return (
            <div>
                <input type="text" placeholder="Key" value={this.state.key} onChange={this.keyChange} ref={(ref) => this.key = ref} /> 
                <input type="text" placeholder="Value" value={this.state.val} onChange={this.valChange} ref={(ref) => this.val = ref} />
                { this.props.index > 0 ? <button type="button" className={removeBtnClass} onClick={ (e) => { self.props.removeItem(e, self.props.index); }}></button> : null }
            </div>
        );
    }
}

export default ActionInsertItem;