import React from 'react';
import TextField from 'material-ui/TextField';
import RemoveIcon from 'material-ui-icons/RemoveCircle';
var classNames = require('classnames');

class ActionKeyValueItem extends React.Component {
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
            this.setState({ key: nextProps.keys[nextProps.index]});
            this.setState({ val: nextProps.vals[nextProps.index]});
        } 
    }

    keyChange(e) {
        let k = e.target.value;
        this.setState({ key: k });
        this.props.textChange(this.props.index, k, this.state.val || '');
    }

    valChange(e) {
        let v = e.target.value; 
        this.setState({ val: v });
        this.props.textChange(this.props.index, this.state.key || '', v);
    }

    render() {
        let removeBtnClass = classNames({
                'criteriaItem': this.props.type && this.props.type === 'criteriaItem' ? true : false,
                'updatedItem': this.props.type && this.props.type === 'updatedItem' ? true : false
            }),
            self = this;

        return (
            <div className="materialUIComponents">
                <TextField style={{width: 150}} hintText="Key" value={this.state.key} onChange={this.keyChange} />
                <TextField style={{width: 150}} hintText="Value" value={this.state.val} onChange={this.valChange} />
                { this.props.index > 0 ? <RemoveIcon className={removeBtnClass} onClick={ (e) => { self.props.removeItem(self.props.index, self.props.type); }} /> : null }
            </div>
        );
    }
}

//Type checking for props
ActionKeyValueItem.propTypes = {
    index: React.PropTypes.number,
    keys: React.PropTypes.array,
    vals: React.PropTypes.array,
    textChange: React.PropTypes.func,
    removeItem: React.PropTypes.func,
    type: React.PropTypes.string
};

export default ActionKeyValueItem;
