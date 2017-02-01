import React from 'react';
import ActionKeyValueComparison from './actionKeyValueComparison.jsx';
const SweetAlert = require('react-swal');

class ActionRemove extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            numItems: 1
        };

        //Bind functions to this context 
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);

        this.removeKeys = [];
        this.removeComparisons = [];
        this.removeVals = [];
    }

    onSubmit(e) {
        e.preventDefault();

        let completeStr = '{',
            justOneStr = '{}';
        
        //Item to remove
        for(let x = 0; x < this.state.numItems; x++) {
            if(this.removeKeys[x] && this.removeVals[x]) {
                let valStr = encodeURIComponent(this.removeVals[x]);
        
                //If the insert value is a string, make sure it satrts and end with double quotes
                if(isNaN(valStr) && valStr[0] !== '"' && valStr[valStr.length - 1] !== '"') {
                    //If single quotes were used replace them with double quotes, else just add double quotes 
                    if(valStr[0] === "'" && valStr[valStr.length - 1] === "'") {
                        valStr = valStr.replace("'" , '"');
                        valStr = valStr.replace("'" , '"');
                    } else if(valStr.trim() !== 'true' && valStr.trim() !== 'false') { //Else, its a string and not a bool value
                        valStr = '"' + valStr + '"';
                    }
                }

                if(this.removeComparisons[x] === ':') {
                    completeStr += '"' + encodeURIComponent(this.removeKeys[x]) + '"' + this.removeComparisons[x] + valStr + ',';
                } else {
                    completeStr += '"' + encodeURIComponent(this.removeKeys[x]) + '":{"' + this.removeComparisons[x] + '":' + valStr + '},';
                }
            }
        }
        completeStr += '}';
        completeStr = completeStr.replace(',}', '}');

        //Just One
        if(this.justOne) {
            justOneStr = `{"single": ${this.justOne.checked}}`;
        } 
            
        if(completeStr === '{}') {
            let self = this;
            swal({title: "Are you sure you want to proceed?", text: "Not entering a key and value will delete the entire collection.", 
                  type: "warning", confirmButtonText: "Yes, delete", showCancelButton: true, cancelButtonText: "No"}, 
                  (isConfirm) => { if(isConfirm) { self.props.onRemove(completeStr, justOneStr); } }); 
        } else {
            this.props.onRemove(completeStr, justOneStr);
        }
    }

    handleChange(index, k, comp, v) {
        //Store keys and values to be removed on form submit 
        this.removeKeys[index] = k.value;
        this.removeComparisons[index] = comp.value;
        this.removeVals[index] = v.value;
    }

    addItem() {
        this.setState({ numItems: this.state.numItems + 1 });
    }

    removeItem(e, idx) {
        //Remove specified item 
        this.removeKeys.splice(idx, 1);
        this.removeComparisons.splice(idx, 1);
        this.removeVals.splice(idx, 1);

        //Decrease count of Query items 
        this.setState({ numItems: this.state.numItems - 1 });
    }

    render() {
        let items = [];
        for (let i = 0; i < this.state.numItems; i++) {
            items.push(<ActionKeyValueComparison index={i} keys={this.removeKeys} comparisons={this.removeComparisons} vals={this.removeVals} valueChange={this.handleChange} removeItem={this.removeItem} type='criteriaItem' />);
        }

        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <div>
                        {items}
                        <button type="button" className="fa fa-plus-circle" onClick={this.addItem}></button>
                    </div>
                    <div>
                        <label><input type="checkbox" value="justOne" ref={(ref) => this.justOne = ref} />Just One</label>
                    </div>
                    <input type="submit" value="Remove" />
                </div>
            </form>
        );
    }
}

export default ActionRemove;