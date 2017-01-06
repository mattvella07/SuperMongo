import React from 'react';
import ActionInsertItem from './actionInsertItem.jsx';

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

        let insertStr = '{';
        
        for(let x = 0; x < this.state.numItems; x++) {
            let insertValStr = encodeURIComponent(this.insertVals[x].value);
        
            if(this.insertKeys[x].value) {
                //If the insert value is a string, make sure it satrts and end with double quotes
                if(isNaN(insertValStr) && insertValStr[0] !== '"' && insertValStr[insertValStr.length - 1] !== '"') {
                    //If single quotes were used replace them with double quotes, else just add double quotes 
                    if(insertValStr[0] === "'" && insertValStr[insertValStr.length - 1] === "'") {
                        insertValStr = insertValStr.replace("'" , '"');
                        insertValStr = insertValStr.replace("'" , '"');
                    } else {
                        insertValStr = '"' + insertValStr + '"';
                    }
                }

                insertStr += '"' + encodeURIComponent(this.insertKeys[x].value) + '": ' + insertValStr + ','; 
            }
        }
        insertStr += '}';
        insertStr = insertStr.replace(',}', '}');

        this.props.onInsert(insertStr);
    }

    handleChange(index, insertKey, insertVal) {
        //Store keys and values to be insertted on form submit 
        this.insertKeys[index] = insertKey;
        this.insertVals[index] = insertVal;

        //Determine whether to enable button or not 
        if(insertKey && insertVal && insertKey.value.toString().trim() !== '' && insertVal.value.toString().trim() !== '') {
            this.setState({ isDisabled: false });
        } else {
            this.setState({ isDisabled: true });
        }
    }

    addItem() {
        this.setState({ numItems: this.state.numItems + 1 });
    }

    removeItem() {
        this.setState({ numItems: this.state.numItems - 1 });
    }

    render() {
        let items = [];
        for (let i = 0; i < this.state.numItems; i++) {
            items.push(<ActionInsertItem index={i} textChange={this.handleChange} removeItem={this.removeItem} />);
        }

        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <div>
                        {items}
                        <button type="button" className="fa fa-plus-circle" onClick={this.addItem}></button>
                    </div>
                    <input type="submit" value="Insert" disabled={this.state.isDisabled} />
                </div>
            </form>
        );
    }
}

export default ActionInsert;