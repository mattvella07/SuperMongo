import React from 'react';
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

        //Bind functions to this context 
        this.onSubmit = this.onSubmit.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.criteriaChange = this.criteriaChange.bind(this);
        this.updatedItemChange = this.updatedItemChange.bind(this);
        this.multiChanged = this.multiChanged.bind(this);
        this.replaceChanged = this.replaceChanged.bind(this);

        this.criteriaKeys = [];
        this.criteriaComparisons = [];
        this.criteriaVals = [];
        this.updatedItemKeys = [];
        this.updatedItemVals = [];
    }

    onSubmit(e) {
        e.preventDefault();

        let criteriaStr = '{',
            updatedItemStr = (this.multi && this.multi.checked) || (this.state.selectedReplace === 'specified') ? '{"$set": {' : '{',
            optionsStr = '{';

        //Criteria
        for(let x = 0; x < this.state.numCriteria; x++) {
            if(this.criteriaKeys[x] && this.criteriaVals[x]) {
                let criteriaValStr = encodeURIComponent(this.criteriaVals[x].value);

                if(this.criteriaKeys[x].value) {
                    if(isNaN(criteriaValStr) && criteriaValStr[0] !== '"' && criteriaValStr[criteriaValStr.length - 1] !== '"') {
                        //If single quotes were used replace them with double quotes, else just add double quotes 
                        if(criteriaValStr[0] === "'" && criteriaValStr[criteriaValStr.length - 1] === "'") {
                            criteriaValStr = criteriaValStr.replace("'", '"');
                            criteriaValStr = criteriaValStr.replace("'", '"');
                        } else if(criteriaValStr.trim() !== 'true' && criteriaValStr.trim() !== 'false') { //Else, its a string and not a bool value 
                            criteriaValStr = '"' + criteriaValStr + '"';
                        }
                    }

                    if(this.criteriaComparisons[x].value === ':') {
                        criteriaStr += '"' + encodeURIComponent(this.criteriaKeys[x].value) + '"' + this.criteriaComparisons[x].value + criteriaValStr + ',';
                    } else {
                        criteriaStr += '"' + encodeURIComponent(this.criteriaKeys[x].value) + '":{"' + this.criteriaComparisons[x].value + '":' + criteriaValStr + '},';
                    }
                }
            }
        }

        criteriaStr += '}';
        criteriaStr = criteriaStr.replace(',}', '}');

        //Updated Item
        for(let x = 0; x < this.state.numUpdatedItem; x++) {
            if(this.updatedItemKeys[x] && this.updatedItemVals[x]) {
                let updatedItemValStr = encodeURIComponent(this.updatedItemVals[x].value);

                if(this.updatedItemKeys[x].value) {
                    if(isNaN(updatedItemValStr) && updatedItemValStr[0] !== '"' && updatedItemValStr[updatedItemValStr.length - 1] !== '"') {
                        //If single quotes were used replace them with double quotes, else just add double quotes 
                        if(updatedItemValStr[0] === "'" && updatedItemValStr[updatedItemValStr.length - 1] === "'") {
                            updatedItemValStr = updatedItemValStr.replace("'", '"');
                            updatedItemValStr = updatedItemValStr.replace("'", '"');
                        } else if(updatedItemValStr.trim() !== 'true' && updatedItemValStr.trim() !== 'false') { //Else, its a string and not a bool value 
                            updatedItemValStr = '"' + updatedItemValStr + '"';
                        }
                    }

                    updatedItemStr += '"' + encodeURIComponent(this.updatedItemKeys[x].value) + '": ' + updatedItemValStr + ',';
                }
            }
        }

        updatedItemStr += (this.multi && this.multi.checked) || (this.state.selectedReplace === 'specified') ? '}}' : '}';
        updatedItemStr = updatedItemStr.replace(',}', '}');

        //Multi
        if(this.multi) {
            optionsStr += `"multi": ${this.multi.checked},`;
        }

        //Upsert
        if(this.upsert) {
            optionsStr += `"upsert": ${this.upsert.checked}`;
        }

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

    addItem(e) {
        let itemToAdd = e.target.className.toString().replace('fa fa-plus-circle', '').trim();

        switch(itemToAdd) {
            case 'criteriaItem':
                this.setState({ numCriteria: this.state.numCriteria + 1 });
                break;
            case 'updatedItem':
                this.setState({ numUpdatedItem: this.state.numUpdatedItem + 1});
        }
    }

    removeItem(e) {
        let itemToRemove = e.target.className.toString().replace('fa fa-times-circle', '').trim();

        switch(itemToRemove) {
            case 'criteriaItem':
                this.setState({ numCriteria: this.state.numCriteria - 1 });
                break;
            case 'updatedItem':
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

    multiChanged(e) {
        if(this.multi && this.multi.checked) {
            this.setState({selectedReplace: 'specified'});
        }
    }

    replaceChanged(e) {
        this.setState({selectedReplace: e.target.value});
    }

    render() {
        let criteriaItems = [],
            updatedItems = [],
            criteriaClass = classNames({
                'fa': true,
                'fa-caret-right': !this.state.showCriteria,
                'fa-caret-down': this.state.showCriteria
            }),
            updatedItemClass = classNames({
                'fa': true,
                'fa-caret-right': !this.state.showUpdatedItem,
                'fa-caret-down': this.state.showUpdatedItem
            });

        for(let i = 0; i < this.state.numCriteria; i++) {
            criteriaItems.push(<ActionKeyValueComparison index={i} keys={this.criteriaKeys} comparisons={this.criteriaComparisons} vals={this.criteriaVals} valueChange={this.criteriaChange} removeItem={this.removeItem} type='criteriaItem' />);
        }

        for(let i = 0; i < this.state.numUpdatedItem; i++) {
            updatedItems.push(<ActionKeyValueItem index={i} keys={this.updatedItemKeys} vals={this.updatedItemVals} textChange={this.updatedItemChange} removeItem={this.removeItem} type='updatedItem' />);
        }

        return (
            <form onSubmit={this.onSubmit} >
                <div>
                    <div> 
                        <div onClick={() => this.setState({ showCriteria: !this.state.showCriteria }) }><i className={criteriaClass}></i>Criteria</div>
                        { this.state.showCriteria ? <div>{criteriaItems}</div> : null }
                        { this.state.showCriteria ? <button type="button" className="criteriaItem fa fa-plus-circle" onClick={this.addItem}></button> : null }
                    </div>
                    <div> 
                        <div onClick={() => this.setState({ showUpdatedItem: !this.state.showUpdatedItem }) }><i className={updatedItemClass}></i>Updated Item</div>
                        { this.state.showUpdatedItem ? <div>{updatedItems}</div> : null }
                        { this.state.showUpdatedItem ? <button type="button" className="updatedItem fa fa-plus-circle" onClick={this.addItem}></button> : null }
                    </div>

                    <div>
                        <input type="radio" name="replace" value="all" checked={this.state.selectedReplace === 'all'} onChange={this.replaceChanged} />Replace entire document<br/>
                        <input type="radio" name="replace" value="specified" checked={this.state.selectedReplace === 'specified'} onChange={this.replaceChanged} />Update only specified fields<br/>
                    </div>

                    <div>
                        <label><input type="checkbox" value="multi" ref={(ref) => this.multi = ref} onChange={this.multiChanged} />Multi</label>
                    </div>

                    <div>
                        <label><input type="checkbox" value="upsert" ref={(ref) => this.upsert = ref} />Upsert</label>
                    </div>
                    <input type="submit" value="Update" />
                </div>
            </form>
        );
    }
}

export default ActionUpdate;