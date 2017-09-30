import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AddIcon from 'material-ui-icons/AddCircle';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ActionKeyValueComparison from './actionKeyValueComparison.jsx';
import ActionFindProjection from './actionFindProjection.jsx';
import ActionFindSort from './actionFindSort.jsx';
const classNames = require('classnames');
const PAGE_LIMIT = 20;

class ActionFind extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            numQuery: 1,
            numProjection: 1,
            numSort: 1,
            keyVisible: false,
            queryVisible: true,
            projectionVisible: true,
            sortVisible: true,
            limitVisible: true,
            skipVisible: true,
            showKey: false,
            showQuery: false,
            showProjection: false,
            showSort: false,
            showLimit: false,
            showSkip: false,
            keyVal: '',
            skipVal: '',
            limitVal: '',
            op: 'find',
            isDisabled: true
        };

        //Bind functions to this context 
        this.onSubmit = this.onSubmit.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.queryChange = this.queryChange.bind(this);
        this.projectionChange = this.projectionChange.bind(this);
        this.sortChange = this.sortChange.bind(this);
        this.opChange = this.opChange.bind(this);
        this.keyChange = this.keyChange.bind(this);

        //Variables for storing user entered values 
        this.queryKeys = [];
        this.queryComparisons = [];
        this.queryVals = [];
        this.projectionVals = [];
        this.projectionFields = [];
        this.sortFields = [];
        this.sortDirections = [];

        //Initialize arrays 
        this.queryKeys[0] = '';
        this.queryComparisons[0] = ':';
        this.queryVals[0] = '';
        this.projectionVals[0] = '1';
        this.projectionFields[0] = '';
        this.sortFields[0] = '';
        this.sortDirections[0] = 'asc';
    }

    onSubmit(e) {
        e.preventDefault();
        
        let queryStr = '{',
            projectionStr = '{',
            optionsStr = '{',
            userEnteredLimit = (this.state.limitVal) ? parseInt(this.state.limitVal) : -1,
            distinctKeyStr = '';

        //Query
        for(let x = 0; x < this.state.numQuery; x++) {
            if(this.queryKeys[x] && this.queryVals[x]) {
                //Remove whitespace 
                this.queryKeys[x] = this.queryKeys[x].trim();
                this.queryVals[x] = this.queryVals[x].trim();

                let queryValStr = encodeURIComponent(this.queryVals[x]);

                //If the query value is a string, make sure it satrts and end with double quotes
                if(isNaN(queryValStr) && queryValStr[0] !== '"' && queryValStr[queryValStr.length - 1] !== '"') {
                    //If single quotes were used replace them with double quotes, else just add double quotes 
                    if(queryValStr[0] === "'" && queryValStr[queryValStr.length - 1] === "'") {
                        queryValStr = queryValStr.replace("'" , '"');
                        queryValStr = queryValStr.replace("'" , '"');
                    } else if(queryValStr.trim() !== 'true' && queryValStr.trim() !== 'false') { //Else, its a string and not a bool value 
                        queryValStr = `"${queryValStr}"`;
                    } 
                }

                if(this.queryComparisons[x] === ':') {
                    queryStr += `"${encodeURIComponent(this.queryKeys[x])}"${this.queryComparisons[x]}${queryValStr},`;
                } else {
                    queryStr += `"${encodeURIComponent(this.queryKeys[x])}":{"${this.queryComparisons[x]}":${queryValStr}},`;
                }
            }
        }
        queryStr += '}';
        queryStr = queryStr.replace(',}', '}');

        //Projection
        for(let x = 0; x < this.state.numProjection; x++) {
            if(this.projectionFields[x]) {
                projectionStr += `"${encodeURIComponent(this.projectionFields[x])}":${this.projectionVals[x]},`;
            }
        }
        projectionStr += '}';
        projectionStr = projectionStr.replace(',}', '}');

        //Sort 
        optionsStr += '"sort":[';
        for(let x = 0; x < this.state.numSort; x++) {
            if(this.sortFields[x]) {
                optionsStr += `["${encodeURIComponent(this.sortFields[x])}","${this.sortDirections[x]}"],`;
            }
        }
        optionsStr += '],';
        optionsStr = optionsStr.replace(',]', ']');

        //Limit
        if(this.state.op === 'find') {
            if(this.state.limitVal && this.state.limitVal < 20) {
                optionsStr += `"limit":${this.state.limitVal},`;
            } else { //If not entered by user, set to default of 20
                optionsStr += `"limit":${PAGE_LIMIT},`;
            }
        } else if(this.state.op === 'findOne') {
            optionsStr += `"limit":1,`;
        }

        //Skip
        if(this.state.skipVal) {
            optionsStr += `"skip":${this.state.skipVal},`;
        } else { //If not entered by user, set to default of 0
            optionsStr += '"skip":0,';
        }

        //Format options 
        optionsStr += '}';
        optionsStr = optionsStr.replace(',}', '}');

        //Key (Distinct only)
        if(this.state.op === 'distinct' && this.state.keyVal) {
            distinctKeyStr = this.state.keyVal;
        }

        this.props.onFind(this.state.op, queryStr, projectionStr, optionsStr, userEnteredLimit, distinctKeyStr);
    }

    addItem(e, itemToAdd) {
        switch(itemToAdd) {
            case 'queryItem':
                //Initialize next index in array
                this.queryKeys[this.state.numQuery] = '';
                this.queryComparisons[this.state.numQuery] = ':';
                this.queryVals[this.state.numQuery] = '';

                this.setState({ numQuery: this.state.numQuery + 1 });
                break;
            case 'projectionItem': 
                //Initialize next index in array
                this.projectionVals[this.state.numProjection] = '1';
                this.projectionFields[this.state.numProjection] = '';

                this.setState({ numProjection: this.state.numProjection + 1 });
                break;
            case 'sortItem': 
                //Initialize next index in array
                this.sortFields[this.state.numSort] = '';
                this.sortDirections[this.state.numSort] = 'asc';

                this.setState({ numSort: this.state.numSort + 1 });
        }
    }

    removeItem(idx, itemToRemove) {
        switch (itemToRemove) {
            case 'queryItem': 
                //Remove specified item
                this.queryKeys.splice(idx, 1);
                this.queryComparisons.splice(idx, 1);
                this.queryVals.splice(idx, 1);

                //Decrease count of Query items 
                this.setState({ numQuery: this.state.numQuery - 1 });
                break;
            case 'projectionItem': 
                //Remove specified item
                this.projectionVals.splice(idx, 1);
                this.projectionFields.splice(idx, 1);

                //Decrease count of Query items 
                this.setState({ numProjection: this.state.numProjection - 1 });
                break;
            case 'sortItem': 
                //Remove specified item
                this.sortFields.splice(idx, 1);
                this.sortDirections.splice(idx, 1);

                //Decrease count of Query items 
                this.setState({ numSort: this.state.numSort - 1 });
        }
    }
    
    queryChange(index, queryKey, queryComparison, queryVal) {
        //Store query 
        this.queryKeys[index] = queryKey;
        this.queryComparisons[index] = queryComparison;
        this.queryVals[index] = queryVal;
    }

    projectionChange(index, projectionVal, projectionField) {
        //Store projection
        this.projectionVals[index] = projectionVal;
        this.projectionFields[index] = projectionField;
    }

    sortChange(index, sortField, sortDirection) {
        //Store sort 
        this.sortFields[index] = sortField;
        this.sortDirections[index] = sortDirection;
    }

    opChange(event, value) {
        switch(value) {
            case 'find':
                this.setState({ keyVisible: false });
                this.setState({ queryVisible: true });
                this.setState({ projectionVisible: true });
                this.setState({ sortVisible: true });
                this.setState({ limitVisible: true });
                this.setState({ skipVisible: true });
                break;
            case 'findOne':
                this.setState({ keyVisible: false });
                this.setState({ queryVisible: true });
                this.setState({ projectionVisible: true });
                this.setState({ sortVisible: false });
                this.setState({ limitVisible: false });
                this.setState({ skipVisible: true });
                break;
            case 'count':
                this.setState({ keyVisible: false });
                this.setState({ queryVisible: true });
                this.setState({ projectionVisible: false });
                this.setState({ sortVisible: false });
                this.setState({ limitVisible: false });
                this.setState({ skipVisible: true });
                break;
            case 'distinct':
                this.setState({ keyVisible: true });
                this.setState({ queryVisible: true });
                this.setState({ projectionVisible: false });
                this.setState({ sortVisible: false });
                this.setState({ limitVisible: false });
                this.setState({ skipVisible: false });
        }

        this.setState({ op: value });
    }

    keyChange(event, value) {
        this.setState({ keyVal: value });

        //Determine whether to enable button or not - for Distinct only
        if(value && value.toString().trim() !== '') {
            this.setState({ isDisabled: false });
        } else {
            this.setState({ isDisabled: true });
        }
    }

    render() {
        let queryItems = [],
            projectionItems = [],
            sortItems = [],
            keyClass = classNames({
                'fa': true,
                'fa-chevron-right': !this.state.showKey,
                'fa-chevron-down': this.state.showKey
            }),
            queryClass = classNames({
                'fa': true,
                'fa-chevron-right': !this.state.showQuery,
                'fa-chevron-down': this.state.showQuery
            }),
            projectionClass = classNames({
                'fa': true,
                'fa-chevron-right': !this.state.showProjection,
                'fa-chevron-down': this.state.showProjection
            }),
            sortClass = classNames({
                'fa': true,
                'fa-chevron-right': !this.state.showSort,
                'fa-chevron-down': this.state.showSort
            }),
            limitClass = classNames({
                'fa': true,
                'fa-chevron-right': !this.state.showLimit,
                'fa-chevron-down': this.state.showLimit
            }),
            skipClass = classNames({
                'fa': true,
                'fa-chevron-right': !this.state.showSkip,
                'fa-chevron-down': this.state.showSkip
            });

        for(let i = 0; i < this.state.numQuery; i++) {
            queryItems.push(<ActionKeyValueComparison key={i} index={i} keys={this.queryKeys} comparisons={this.queryComparisons} vals={this.queryVals} valueChange={this.queryChange} removeItem={this.removeItem} type='queryItem' />);
        }

        for (let i = 0; i < this.state.numProjection; i++) {
            projectionItems.push(<ActionFindProjection key={i} index={i} projectionVals={this.projectionVals} projectionFields={this.projectionFields} valueChange={this.projectionChange} removeItem={this.removeItem} type='projectionItem' />);
        }

        for (let i = 0; i < this.state.numSort; i++) {
            sortItems.push(<ActionFindSort key={i} index={i} sortFields={this.sortFields} sortDirections={this.sortDirections} valueChange={this.sortChange} removeItem={this.removeItem} type='sortItem' />);
        }

        return (
            <form onSubmit={this.onSubmit} >
                <div>
                    <RadioButtonGroup style={{width: 125, height: 40, display: "flex"}} floatingLabelText="Operation" name="operations" defaultSelected="find" onChange={this.opChange} value={this.state.operation}>
                        <RadioButton value="find" label="Find" />
                        <RadioButton value="findOne" label="FindOne" />
                        <RadioButton value="count" label="Count" />
                        <RadioButton value="distinct" label="Distinct" />
                    </RadioButtonGroup>
                    { this.state.keyVisible ? <div> 
                        <div onClick={ () => this.setState({ showKey: !this.state.showKey }) }><i className={keyClass}></i>Key</div>
                        { this.state.showKey ? <TextField className="materialUIComponents" style={{width: 125}} hintText="Key Name" value={this.state.keyVal} onChange={this.keyChange} /> : null } 
                    </div> : null }
                    { this.state.queryVisible ? <div>
                        <div onClick={ () => this.setState({ showQuery: !this.state.showQuery }) }><i className={queryClass}></i>Query</div>
                        { this.state.showQuery ? <div>{queryItems}</div> : null }
                        { this.state.showQuery ? <AddIcon className="queryItem" onClick={ (e) => { this.addItem(e, 'queryItem'); } } /> : null }
                    </div> : null }
                    { this.state.projectionVisible ? <div>
                        <div onClick={ () => this.setState({ showProjection: !this.state.showProjection }) }><i className={projectionClass}></i>Projection</div>
                        { this.state.showProjection ? <div>{projectionItems}</div> : null }
                        { this.state.showProjection ? <AddIcon className="projectionItem" onClick={ (e) => { this.addItem(e, 'projectionItem'); } } /> : null }
                    </div> : null }
                    { this.state.sortVisible ? <div>
                        <div onClick={ () => this.setState({ showSort: !this.state.showSort }) }><i className={sortClass}></i>Sort</div>
                        { this.state.showSort ? <div>{sortItems}</div> : null }
                        { this.state.showSort ? <AddIcon className="sortItem" onClick={ (e) => { this.addItem(e, 'sortItem'); } } /> : null }
                    </div> : null }
                    { this.state.limitVisible ? <div>
                        <div onClick={ () => this.setState({ showLimit: !this.state.showLimit }) }><i className={limitClass}></i>Limit</div>
                        { this.state.showLimit ? <TextField className="materialUIComponents" style={{width: 125}} hintText="# to Show" value={this.state.limitVal} onChange={ e => this.setState({limitVal: e.target.value.trim()}) } /> : null }    
                    </div> : null }
                    { this.state.skipVisible ? <div>
                        <div onClick={ () => this.setState({ showSkip: !this.state.showSkip }) }><i className={skipClass}></i>Skip</div>
                        { this.state.showSkip ? <TextField className="materialUIComponents" style={{width: 125}} hintText="# to Skip" value={this.state.skipVal} onChange={ e => this.setState({skipVal: e.target.value.trim()}) } /> : null }
                    </div> : null }
                    <RaisedButton style={{width: 75, height: 30 }} type="submit" label="Run" disabled={this.state.op === 'distinct' && this.state.isDisabled} />
                </div>
            </form>
        );
    }
}

//Type checking for props
ActionFind.propTypes = {
    onFind: React.PropTypes.func
};

export default ActionFind;
