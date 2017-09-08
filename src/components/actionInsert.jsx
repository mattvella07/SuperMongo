import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AddIcon from 'material-ui-icons/AddCircle';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ActionKeyValueItem from './actionKeyValueItem.jsx';

class ActionInsert extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            isDisabled: true,
            numItems: 1,
            op: 'dataEntry',
            showItems: true
        };

        //Bind functions to this context 
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.opChange = this.opChange.bind(this);

        //Variables for storing user entered values 
        this.insertKeys = [];
        this.insertVals = [];

        //Initialize arrays
        this.insertKeys[0] = '';
        this.insertVals[0] = '';
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
        //Initialize next index in array
        this.insertKeys[this.state.numItems] = '';
        this.insertVals[this.state.numItems] = '';

        this.setState({ numItems: this.state.numItems + 1 });
    }

    removeItem(idx, itemToRemove) {
        //Remove specified item
        this.insertKeys.splice(idx, 1);
        this.insertVals.splice(idx, 1);

        //Decrease count of Query items 
        this.setState({ numItems: this.state.numItems - 1 });
    }

    opChange(event, value) {
        switch(value) {
            case 'dataEntry':
                this.setState({ showItems: true });
                break;
            case 'fromFile':
                this.setState({ showItems: false });
        }

        this.setState({ op: value });
    }

    render() {
        let items = [];
        for (let i = 0; i < this.state.numItems; i++) {
            items.push(<ActionKeyValueItem index={i} keys={this.insertKeys} vals={this.insertVals} textChange={this.handleChange} removeItem={this.removeItem} />);
        }

        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <RadioButtonGroup style={{width: 125, height: 40, display: "flex"}} name="operations" defaultSelected="dataEntry" onChange={this.opChange} value={this.state.op}>
                        <RadioButton value="dataEntry" label="Data Entry" />
                        <RadioButton value="fromFile" label="From File" />
                    </RadioButtonGroup>
                    { this.state.showItems ? <div>
                        {items}
                        <AddIcon onClick={this.addItem} />
                    </div> : null }
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