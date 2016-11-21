import React from 'react';
import ActionFindQuery from './actionFindQuery.jsx';
import ActionFindProjection from './actionFindProjection.jsx';
const PAGE_LIMIT = 20;

class ActionFind extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            numQuery: 1,
            numProjection: 1
        };

        //Bind functions to this context 
        this.onSubmit = this.onSubmit.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.queryChange = this.queryChange.bind(this);
        this.projectionChange = this.projectionChange.bind(this);

        //Variables for storing user entered values 
        this.queryKeys = [];
        this.queryComparisons = [];
        this.queryVals = [];
        this.projectionVals = [];
        this.projectionFields = [];
    }

    onSubmit(e) {
        e.preventDefault();

        let queryStr = '{',
            projectionStr = '{',
            optionsStr = '{',
            userEnteredLimit = this.limitNum.value ? this.limitNum.value : -1;
        
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
                        } else {
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
        console.log('Projection str: ' + projectionStr);

        if(this.sortField.value) {
            optionsStr += '"sort":[["' + this.sortField.value + '","' + this.sortDirection.value + '"]],';
        }

        if(this.limitNum.value && this.limitNum.value < 20) {
            optionsStr += '"limit":' + this.limitNum.value + ',';
        } else { //If not entered by user, set to default of 20
            optionsStr += '"limit":' + PAGE_LIMIT + ',';
        }
        
        if(this.skipNum.value) {
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
        let itemToAdd = e.target.className;

        switch(itemToAdd) {
            case 'queryItem':
                this.setState({ numQuery: this.state.numQuery + 1 });
                break;
            case 'projectionItem': 
                this.setState({ numProjection: this.state.numProjection + 1 });
                break;
        }
    }

    removeItem(e) {
        let itemToAdd = e.target.className;

        switch (itemToAdd) {
            case 'queryItem': 
                this.setState({ numQuery: this.state.numQuery - 1 });
                break;
            case 'projectionItem': 
                this.setState({ numProjection: this.state.numProjection - 1 });
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

    render() {
        let queryItems = [],
            projectionItems = [];

        for(let i = 0; i < this.state.numQuery; i++) {
            queryItems.push(<ActionFindQuery index={i} valueChange={this.queryChange} removeItem={this.removeItem} />);
        }

        for (let i = 0; i < this.state.numProjection; i++) {
            projectionItems.push(<ActionFindProjection index={i} valueChange={this.projectionChange} removeItem={this.removeItem} />);
        }

        return (
            <form onSubmit={this.onSubmit} >
                <div>
                    <div>
                        Query:&nbsp; 
                        {queryItems}
                        <button type="button" className="queryItem" onClick={this.addItem}>+</button>
                    </div>
                    <div>
                        Projection:&nbsp; 
                        {projectionItems}
                        <button type="button" className="projectionItem" onClick={this.addItem}>+</button>
                    </div>
                    <div>
                        Sort:&nbsp; <input type="text" placeholder="Field" ref={(ref) => this.sortField = ref} />
                        <select name="ascOrDesc" ref={(ref) => this.sortDirection = ref} >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                    <div>
                        Limit:&nbsp; <input type="text" placeholder="Number to show" ref={(ref) => this.limitNum = ref} />        
                    </div>
                    <div>
                        Skip:&nbsp; <input type="text" placeholder="Number to skip" ref={(ref) => this.skipNum = ref} />
                    </div>
                    <input type="submit" value="Run" />
                </div>
            </form>
        );
    }
}

export default ActionFind;
