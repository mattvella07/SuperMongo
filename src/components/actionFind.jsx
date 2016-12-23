import React from 'react';
import ActionFindQuery from './actionFindQuery.jsx';
import ActionFindProjection from './actionFindProjection.jsx';
import ActionFindSort from './actionFindSort.jsx';
var classNames = require('classnames');
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
            showSkip: false
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
            userEnteredLimit = (this.limitNum && this.limitNum.value) ? this.limitNum.value : -1;

        //Query
        for(let x = 0; x < this.state.numQuery; x++) {
            if(this.queryKeys[x] && this.queryVals[x]) {
                let queryValStr = this.queryVals[x].value;

                if(this.queryKeys[x].value) {
                    //If the query value is a string, make sure it satrts and end with double quotes
                    if(isNaN(queryValStr) && queryValStr[0] !== '"' && queryValStr[queryValStr.length - 1] !== '"') {
                        //If single quotes were used replace them with double quotes, else just add double quotes 
                        if(queryValStr[0] === "'" && queryValStr[queryValStr.length - 1] === "'") {
                            queryValStr = queryValStr.replace("'" , '"');
                            queryValStr = queryValStr.replace("'" , '"');
                        } else if(queryValStr.trim() !== 'true' && queryValStr.trim() !== 'false') { //Else, its a string and not a bool value 
                            queryValStr = '"' + queryValStr + '"';
                        } 
                    }
                    if(this.queryComparisons[x].value === ':') {
                        queryStr += '"' + this.queryKeys[x].value + '"' + this.queryComparisons[x].value + queryValStr + ',';
                    } else {
                        queryStr += '"' + this.queryKeys[x].value + '":{"' + this.queryComparisons[x].value + '":' + queryValStr + '},';
                    }
                }
            }
        }
        queryStr += '}';
        queryStr = queryStr.replace(',}', '}');

        //Projection
        for(let x = 0; x < this.state.numProjection; x++) {
            if(this.projectionFields[x] && this.projectionFields[x].value) {
                projectionStr += '"' + this.projectionFields[x].value + '":' + this.projectionVals[x].value + ',';
            }
        }
        projectionStr += '}';
        projectionStr = projectionStr.replace(',}', '}');

        //Sort 
        optionsStr += '"sort":[';
        for(let x = 0; x < this.state.numSort; x++) {
            if(this.sortFields[x] && this.sortFields[x].value) {
                optionsStr += '["' + this.sortFields[x].value + '","' + this.sortDirections[x].value + '"],';
            }
        }
        optionsStr += '],';
        optionsStr = optionsStr.replace(',]', ']');

        //Limit
        if(this.limitNum && this.limitNum.value && this.limitNum.value < 20) {
            optionsStr += '"limit":' + this.limitNum.value + ',';
        } else { //If not entered by user, set to default of 20
            optionsStr += '"limit":' + PAGE_LIMIT + ',';
        }

        //Skip
        if(this.skipNum && this.skipNum.value) {
            optionsStr += '"skip":' + this.skipNum.value + ',';
        } else { //If not entered by user, set to default of 0
            optionsStr += '"skip":0,';
        }

        //Format options 
        optionsStr += '}';
        optionsStr = optionsStr.replace(',}', '}');

        this.props.onFind(queryStr, projectionStr, optionsStr, userEnteredLimit);
    }

    addItem(e) {
        let itemToAdd = e.target.className.toString().replace('fa fa-plus-circle', '').trim();

        switch(itemToAdd) {
            case 'queryItem':
                this.setState({ numQuery: this.state.numQuery + 1 });
                break;
            case 'projectionItem': 
                this.setState({ numProjection: this.state.numProjection + 1 });
                break;
            case 'sortItem': 
                this.setState({ numSort: this.state.numSort + 1 });
                break;
        }
    }

    removeItem(e) {
        let itemToAdd = e.target.className.toString().replace('fa fa-times-circle', '').trim();

        switch (itemToAdd) {
            case 'queryItem': 
                this.setState({ numQuery: this.state.numQuery - 1 });
                break;
            case 'projectionItem': 
                this.setState({ numProjection: this.state.numProjection - 1 });
                break;
            case 'sortItem': 
                this.setState({ numSort: this.state.numSort - 1 });
                break;
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
                'fa-caret-right': !this.state.showQuery,
                'fa-caret-down': this.state.showQuery
            }),
            projectionClass = classNames({
                'fa': true,
                'fa-caret-right': !this.state.showProjection,
                'fa-caret-down': this.state.showProjection
            }),
            sortClass = classNames({
                'fa': true,
                'fa-caret-right': !this.state.showSort,
                'fa-caret-down': this.state.showSort
            }),
            limitClass = classNames({
                'fa': true,
                'fa-caret-right': !this.state.showLimit,
                'fa-caret-down': this.state.showLimit
            }),
            skipClass = classNames({
                'fa': true,
                'fa-caret-right': !this.state.showSkip,
                'fa-caret-down': this.state.showSkip
            });

        for(let i = 0; i < this.state.numQuery; i++) {
            queryItems.push(<ActionFindQuery index={i} valueChange={this.queryChange} removeItem={this.removeItem} />);
        }

        for (let i = 0; i < this.state.numProjection; i++) {
            projectionItems.push(<ActionFindProjection index={i} valueChange={this.projectionChange} removeItem={this.removeItem} />);
        }

        for (let i = 0; i < this.state.numSort; i++) {
            sortItems.push(<ActionFindSort index={i} valueChange={this.sortChange} removeItem={this.removeItem} />);
        }

        return (
            <form onSubmit={this.onSubmit} >
                <div>
                    <div>
                        <div onClick={ () => this.setState({ showQuery: !this.state.showQuery }) }><i className={queryClass}></i>Query</div>
                        { this.state.showQuery ? <div>{queryItems}</div> : null }
                        { this.state.showQuery ? <button type="button" className="queryItem fa fa-plus-circle" onClick={this.addItem}></button> : null }
                    </div>
                    <div>
                        <div onClick={ () => this.setState({ showProjection: !this.state.showProjection }) }><i className={projectionClass}></i>Projection</div>
                        { this.state.showProjection ? <div>{projectionItems}</div> : null }
                        { this.state.showProjection ? <button type="button" className="projectionItem fa fa-plus-circle" onClick={this.addItem}></button> : null }
                    </div>
                    <div>
                        <div onClick={ () => this.setState({ showSort: !this.state.showSort }) }><i className={sortClass}></i>Sort</div>
                        { this.state.showSort ? <div>{sortItems}</div> : null }
                        { this.state.showSort ? <button type="button" className="sortItem fa fa-plus-circle" onClick={this.addItem}></button> : null }
                    </div>
                    <div>
                        <div onClick={ () => this.setState({ showLimit: !this.state.showLimit }) }><i className={limitClass}></i>Limit</div>
                        { this.state.showLimit ? <input type="text" placeholder="Number to show" ref={(ref) => this.limitNum = ref} /> : null }    
                    </div>
                    <div>
                        <div onClick={ () => this.setState({ showSkip: !this.state.showSkip }) }><i className={skipClass}></i>Skip</div>
                        { this.state.showSkip ? <input type="text" placeholder="Number to skip" ref={(ref) => this.skipNum = ref} /> : null }
                    </div>
                    <input type="submit" value="Run" />
                </div>
            </form>
        );
    }
}

export default ActionFind;
