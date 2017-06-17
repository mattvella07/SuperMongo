import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ActionKeyValueComparison from './actionKeyValueComparison.jsx';
import ActionFindProjection from './actionFindProjection.jsx';
import ActionFindSort from './actionFindSort.jsx';
import AddIcon from 'material-ui-icons/AddCircle';
var classNames = require('classnames'),
    moment = require('moment');
const PAGE_LIMIT = 20;

class ActionFind extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            numQuery: 1,
            numProjection: 1,
            numSort: 1,
            showQuery: false,
            showProjection: false,
            showSort: false,
            showLimit: false,
            showSkip: false,
            skipVal: '',
            limitVal: ''
        };

        //Bind functions to this context 
        this.onSubmit = this.onSubmit.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.queryChange = this.queryChange.bind(this);
        this.projectionChange = this.projectionChange.bind(this);
        this.sortChange = this.sortChange.bind(this);

        //Variables for storing user entered values 
        this.queryKeys = [];
        this.queryComparisons = [];
        this.queryVals = [];
        this.projectionVals = [];
        this.projectionFields = [];
        this.sortFields = [];
        this.sortDirections = [];
    }

    onSubmit(e) {
        e.preventDefault();

        let queryStr = '{',
            projectionStr = '{',
            optionsStr = '{',
            userEnteredLimit = (this.state.limitVal) ? this.state.limitVal : -1;

        //Query
        for(let x = 0; x < this.state.numQuery; x++) {
            if(this.queryKeys[x] && this.queryVals[x]) {
                let queryValStr = encodeURIComponent(this.queryVals[x]);

                //If the query value is a date, then convert it to an ISO Date
                /*if(moment(queryValStr, moment.ISO_8601).isValid()) {
                    queryValStr = new Date(queryValStr).toISOString();
                    queryValStr = `"new Date("${queryValStr}")"`;
                } //Else if the query value is a string, make sure it satrts and end with double quotes
                else*/ if(isNaN(queryValStr) && queryValStr[0] !== '"' && queryValStr[queryValStr.length - 1] !== '"') {
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
        if(this.state.limitVal && this.state.limitVal < 20) {
            optionsStr += `"limit":${this.state.limitVal},`;
        } else { //If not entered by user, set to default of 20
            optionsStr += `"limit":${PAGE_LIMIT},`;
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

        this.props.onFind(queryStr, projectionStr, optionsStr, userEnteredLimit);
    }

    addItem(e, itemToAdd) {
        switch(itemToAdd) {
            case 'queryItem':
                this.setState({ numQuery: this.state.numQuery + 1 });
                break;
            case 'projectionItem': 
                this.setState({ numProjection: this.state.numProjection + 1 });
                break;
            case 'sortItem': 
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

    render() {
        let queryItems = [],
            projectionItems = [],
            sortItems = [],
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
            queryItems.push(<ActionKeyValueComparison index={i} keys={this.queryKeys} comparisons={this.queryComparisons} vals={this.queryVals} valueChange={this.queryChange} removeItem={this.removeItem} type='queryItem' />);
        }

        for (let i = 0; i < this.state.numProjection; i++) {
            projectionItems.push(<ActionFindProjection index={i} projectionVals={this.projectionVals} projectionFields={this.projectionFields} valueChange={this.projectionChange} removeItem={this.removeItem} type='projectionItem' />);
        }

        for (let i = 0; i < this.state.numSort; i++) {
            sortItems.push(<ActionFindSort index={i} sortFields={this.sortFields} sortDirections={this.sortDirections} valueChange={this.sortChange} removeItem={this.removeItem} type='sortItem' />);
        }

        return (
            <form onSubmit={this.onSubmit} >
                <div>
                    <div>
                        <div onClick={ () => this.setState({ showQuery: !this.state.showQuery }) }><i className={queryClass}></i>Query</div>
                        { this.state.showQuery ? <div>{queryItems}</div> : null }
                        { this.state.showQuery ? <AddIcon className="queryItem" onClick={ (e) => { this.addItem(e, 'queryItem'); } } /> : null }
                    </div>
                    <div>
                        <div onClick={ () => this.setState({ showProjection: !this.state.showProjection }) }><i className={projectionClass}></i>Projection</div>
                        { this.state.showProjection ? <div>{projectionItems}</div> : null }
                        { this.state.showProjection ? <AddIcon className="projectionItem" onClick={ (e) => { this.addItem(e, 'projectionItem'); } } /> : null }

                    </div>
                    <div>
                        <div onClick={ () => this.setState({ showSort: !this.state.showSort }) }><i className={sortClass}></i>Sort</div>
                        { this.state.showSort ? <div>{sortItems}</div> : null }
                        { this.state.showSort ? <AddIcon className="sortItem" onClick={ (e) => { this.addItem(e, 'sortItem'); } } /> : null }
                    </div>
                    <div>
                        <div onClick={ () => this.setState({ showLimit: !this.state.showLimit }) }><i className={limitClass}></i>Limit</div>
                        { this.state.showLimit ? <TextField className="materialUIComponents" style={{width: 125}} hintText="# to Show" value={this.state.limitVal} onChange={ e => this.setState({limitVal: e.target.value}) } /> : null }    
                    </div>
                    <div>
                        <div onClick={ () => this.setState({ showSkip: !this.state.showSkip }) }><i className={skipClass}></i>Skip</div>
                        { this.state.showSkip ? <TextField className="materialUIComponents" style={{width: 125}} hintText="# to Skip" value={this.state.skipVal} onChange={ e => this.setState({skipVal: e.target.value}) } /> : null }
                    </div>
                    <RaisedButton style={{width: 75, height: 30 }} type="submit" label="Run" />
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
