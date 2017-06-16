import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionKeyValueItem from './actionKeyValueItem.jsx';

class ActionInsert extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            isDisabled: true,
            numItems: 1
        };

        //Bind functions to this context 
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);

        this.insertKeys = [];
        this.insertVals = [];
    }

    onSubmit(e) {
        e.preventDefault();

        let completeStr = '{';
        
        //Item to insert
        for(let x = 0; x < this.state.numItems; x++) {
            if(this.insertKeys[x] && this.insertVals[x]) {
                let valStr = encodeURIComponent(this.insertVals[x]);
        
                //If the insert value is a string, make sure it satrts and end with double quotes
                if(isNaN(valStr) && valStr[0] !== '"' && valStr[valStr.length - 1] !== '"') {
                    //If single quotes were used replace them with double quotes, else just add double quotes 
                    if(valStr[0] === "'" && valStr[valStr.length - 1] === "'") {
                        valStr = valStr.replace("'" , '"');
                        valStr = valStr.replace("'" , '"');
                    } else if(valStr.trim() !== 'true' && valStr.trim() !== 'false') { //Else, its a string and not a bool value
                        valStr = `"${valStr}"`;
                    }
                }

                completeStr += `"${encodeURIComponent(this.insertKeys[x])}": ${valStr},`; 
            }
        }
        completeStr += '}';
        completeStr = completeStr.replace(',}', '}');

        this.props.onInsert(completeStr);
    }

    handleChange(index, k, v) {
        //Store keys and values to be inserted on form submit 
        this.insertKeys[index] = k;
        this.insertVals[index] = v;

        //Determine whether to enable button or not
        this.setState({ isDisabled: true });
        for(let x = 0; x < this.state.numItems; x++) {
            if(this.insertKeys[x] && this.insertVals[x] && this.insertKeys[x].toString().trim() !== '' && this.insertVals[x].toString().trim() !== '' ) {
                this.setState({ isDisabled: false });
                break;
            }
        }
    }

    addItem() {
        this.setState({ numItems: this.state.numItems + 1 });
    }

    removeItem(e, idx) {
        //Remove specified item
        this.insertKeys.splice(idx, 1);
        this.insertVals.splice(idx, 1);

        //Decrease count of Query items 
        this.setState({ numItems: this.state.numItems - 1 });
    }

    render() {
        let items = [];
        for (let i = 0; i < this.state.numItems; i++) {
            items.push(<ActionKeyValueItem index={i} keys={this.insertKeys} vals={this.insertVals} textChange={this.handleChange} removeItem={this.removeItem} />);
        }

        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <div>
                        {items}
                        <button type="button" className="fa fa-plus-circle" onClick={this.addItem}></button>
                    </div>
                    <RaisedButton style={{width: 75, height: 30 }} type="submit" label="Insert" disabled={this.state.isDisabled} />
                </div>
            </form>
        );
    }
}

//Type checking for props
ActionInsert.propTypes = {
    onInsert: React.PropTypes.func
};

export default ActionInsert;