import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import AddIcon from 'material-ui-icons/AddCircle';
import ActionKeyValueItem from './actionKeyValueItem.jsx';
import ActionKeyValueComparison from './actionKeyValueComparison.jsx';
var classNames = require('classnames');
const SweetAlert = require('react-swal');

class ActionUpdate extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            numCriteria: 1,
            numUpdatedItem: 1,
            showCriteria: false,
            showUpdatedItem: false,
            selectedReplace: 'all'
        };
        this.multi = false;
        this.upsert = false;

        //Bind functions to this context 
        this.onSubmit = this.onSubmit.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.criteriaChange = this.criteriaChange.bind(this);
        this.updatedItemChange = this.updatedItemChange.bind(this);
        this.multiChanged = this.multiChanged.bind(this);
        this.replaceChanged = this.replaceChanged.bind(this);

        //Variables for storing user entered values 
        this.criteriaKeys = [];
        this.criteriaComparisons = [];
        this.criteriaVals = [];
        this.updatedItemKeys = [];
        this.updatedItemVals = [];

        //Initialize arrays 
        this.criteriaKeys[0] = '';
        this.criteriaComparisons[0] = ':';
        this.criteriaVals[0] = '';
        this.updatedItemKeys[0] = '';
        this.updatedItemVals[0] = '';
    }

    onSubmit(e) {
        e.preventDefault();

        let criteriaStr = '{',
            updatedItemStr = this.state.selectedReplace === 'specified' ? '{"$set": {' : '{',
            optionsStr = '{';

        //Criteria
        for(let x = 0; x < this.state.numCriteria; x++) {
            if(this.criteriaKeys[x] && this.criteriaVals[x]) {
                let criteriaValStr = encodeURIComponent(this.criteriaVals[x]);

                if(isNaN(criteriaValStr) && criteriaValStr[0] !== '"' && criteriaValStr[criteriaValStr.length - 1] !== '"') {
                    //If single quotes were used replace them with double quotes, else just add double quotes 
                    if(criteriaValStr[0] === "'" && criteriaValStr[criteriaValStr.length - 1] === "'") {
                        criteriaValStr = criteriaValStr.replace("'", '"');
                        criteriaValStr = criteriaValStr.replace("'", '"');
                    } else if(criteriaValStr.trim() !== 'true' && criteriaValStr.trim() !== 'false') { //Else, its a string and not a bool value 
                        criteriaValStr = `"${criteriaValStr}"`;
                    }
                }

                if(this.criteriaComparisons[x] === ':') {
                    criteriaStr += `"${encodeURIComponent(this.criteriaKeys[x])}"${this.criteriaComparisons[x]}${criteriaValStr},`;
                } else { 
                    criteriaStr += `"${encodeURIComponent(this.criteriaKeys[x])}":{"${this.criteriaComparisons[x]}":${criteriaValStr}},`;
                }
            }
        }

        criteriaStr += '}';
        criteriaStr = criteriaStr.replace(',}', '}');

        //Updated Item
        for(let x = 0; x < this.state.numUpdatedItem; x++) {
            if(this.updatedItemKeys[x] && this.updatedItemVals[x]) {
                let updatedItemValStr = encodeURIComponent(this.updatedItemVals[x]);

                if(isNaN(updatedItemValStr) && updatedItemValStr[0] !== '"' && updatedItemValStr[updatedItemValStr.length - 1] !== '"') {
                    //If single quotes were used replace them with double quotes, else just add double quotes 
                    if(updatedItemValStr[0] === "'" && updatedItemValStr[updatedItemValStr.length - 1] === "'") {
                        updatedItemValStr = updatedItemValStr.replace("'", '"');
                        updatedItemValStr = updatedItemValStr.replace("'", '"');
                    } else if(updatedItemValStr.trim() !== 'true' && updatedItemValStr.trim() !== 'false') { //Else, its a string and not a bool value 
                        updatedItemValStr = `"${updatedItemValStr}"`;
                    }
                }

                updatedItemStr += `"${encodeURIComponent(this.updatedItemKeys[x])}": ${updatedItemValStr},`;
            }
        }

        updatedItemStr += this.state.selectedReplace === 'specified' ? '}}' : '}';
        updatedItemStr = updatedItemStr.replace(',}', '}');

        //Multi
        optionsStr += `"multi": ${this.multi},`;

        //Upsert
        optionsStr += `"upsert": ${this.upsert}`;

        if(optionsStr[optionsStr.length - 1] === ',') {
            optionsStr[optionsStr.length - 1] = '';
        }
        
        optionsStr += '}';

        //If user doesn't enter criteria, confirm before updating
        if(criteriaStr === '{}') {
            let self = this;
            swal({title: "Are you sure you want to proceed?", text: "Not entering any criteria for the update will update the first item in the collection.", 
                  type: "warning", confirmButtonText: "Yes, update", showCancelButton: true, cancelButtonText: "No"}, 
                  (isConfirm) => { if(isConfirm) { self.props.onUpdate(criteriaStr, updatedItemStr, optionsStr); } });
        } else {
            this.props.onUpdate(criteriaStr, updatedItemStr, optionsStr);
        }
    }

    addItem(e, itemToAdd) {
        switch(itemToAdd) {
            case 'criteriaItem':
                //Initialize next index in array
                this.criteriaKeys[this.state.numCriteria] = '';
                this.criteriaComparisons[this.state.numCriteria] = ':';
                this.criteriaVals[this.state.numCriteria] = '';

                this.setState({ numCriteria: this.state.numCriteria + 1 });
                break;
            case 'updatedItem':
                //Initialize next index in array
                this.updatedItemKeys[this.state.numUpdatedItem] = '';
                this.updatedItemVals[this.state.numUpdatedItem] = '';

                this.setState({ numUpdatedItem: this.state.numUpdatedItem + 1});
        }
    }

    removeItem(idx, itemToRemove) {
        switch(itemToRemove) {
            case 'criteriaItem':
                //Remove specified item 
                this.criteriaKeys.splice(idx, 1);
                this.criteriaComparisons.splice(idx, 1);
                this.criteriaVals.splice(idx, 1);

                //Decrease count of Query items 
                this.setState({ numCriteria: this.state.numCriteria - 1 });
                
                break;
            case 'updatedItem':
                //Remove specified item
                this.updatedItemKeys.splice(idx, 1);
                this.updatedItemVals.splice(idx, 1);

                //Decrease count of Query items 
                this.setState({ numUpdatedItem: this.state.numUpdatedItem - 1 });
        }
    }

    criteriaChange(index, k, comp, v) {
        //Store keys and values for the criteria
        this.criteriaKeys[index] = k;
        this.criteriaComparisons[index] = comp;
        this.criteriaVals[index] = v;
    }

    updatedItemChange(index, k, v) {
        //Store keys and values for the updated item 
        this.updatedItemKeys[index] = k;
        this.updatedItemVals[index] = v;
    }

    multiChanged(event, isInputChecked) {
        this.multi = isInputChecked;
        if(isInputChecked) {
            this.setState({selectedReplace: 'specified'});
        }
    }

    replaceChanged(event, value) {
        this.setState({selectedReplace: value});
    }

    render() {
        let criteriaItems = [],
            updatedItems = [],
            criteriaClass = classNames({
                'fa': true,
                'fa-chevron-right': !this.state.showCriteria,
                'fa-chevron-down': this.state.showCriteria
            }),
            updatedItemClass = classNames({
                'fa': true,
                'fa-chevron-right': !this.state.showUpdatedItem,
                'fa-chevron-down': this.state.showUpdatedItem
            });

        for(let i = 0; i < this.state.numCriteria; i++) {
            criteriaItems.push(<ActionKeyValueComparison key={i} index={i} keys={this.criteriaKeys} comparisons={this.criteriaComparisons} vals={this.criteriaVals} valueChange={this.criteriaChange} removeItem={this.removeItem} type='criteriaItem' />);
        }

        for(let i = 0; i < this.state.numUpdatedItem; i++) {
            updatedItems.push(<ActionKeyValueItem key={i} index={i} keys={this.updatedItemKeys} vals={this.updatedItemVals} textChange={this.updatedItemChange} removeItem={this.removeItem} type='updatedItem' />);
        }

        return (
            <form onSubmit={this.onSubmit} >
                <div>
                    <div> 
                        <div onClick={() => this.setState({ showCriteria: !this.state.showCriteria }) }><i className={criteriaClass}></i>Criteria</div>
                        { this.state.showCriteria ? <div>{criteriaItems}</div> : null }
                        { this.state.showCriteria ? <AddIcon className="criteriaItem" onClick={ (e) => { this.addItem(e, 'criteriaItem'); } } /> : null }
                    </div>
                    <div> 
                        <div onClick={() => this.setState({ showUpdatedItem: !this.state.showUpdatedItem }) }><i className={updatedItemClass}></i>Updated Item</div>
                        { this.state.showUpdatedItem ? <div>{updatedItems}</div> : null }
                        { this.state.showUpdatedItem ? <AddIcon className="updatedItem" onClick={ (e) => { this.addItem(e, 'updatedItem'); } } /> : null }
                    </div>
                    <div>
                        <RadioButtonGroup name="replace" className="materialUIComponents updateRadioGroup" onChange={this.replaceChanged} defaultSelected="all">
                            <RadioButton label="Replace entire document" value="all" />
                            <RadioButton label="Update only specified fields" value="specified" />
                        </RadioButtonGroup>
                    </div>
                    <div>
                       <Checkbox label="Multi" className="materialUIComponents" value="multi" onCheck={this.multiChanged} />
                    </div>
                    <div>
                        <Checkbox label="Upsert" className="materialUIComponents" value="upsert" onCheck={ (event, isInputChecked) => { this.upsert = isInputChecked; } } />
                    </div>
                    <RaisedButton style={{width: 75, height: 30 }} type="submit" label="Update" />
                </div>
            </form>
        );
    }
}

//Type checking for props
ActionUpdate.propTypes = {
    onUpdate: React.PropTypes.func
};

export default ActionUpdate;
