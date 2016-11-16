import React from 'react';
import ActionFindQuery from './actionFindQuery.jsx';
const PAGE_LIMIT = 20;

class ActionFind extends React.Component {
    constructor(props) {
        super(props);

        //Bind functions to this context 
        this.onSubmit = this.onSubmit.bind(this);
        this.addItem = this.addItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        let queryValStr = this.queryVal.value,
            queryStr = '',
            projectionStr = '',
            optionsStr = '{',
            userEnteredLimit = this.limitNum.value ? this.limitNum.value : -1;
        
        if(this.queryKey.value) {
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
            if(this.queryComparison.value === ':') {
                queryStr += '{"' + this.queryKey.value + '"' + this.queryComparison.value + queryValStr + '}';
            } else {
                queryStr += '{"' + this.queryKey.value + '":{"' + this.queryComparison.value + '":' + queryValStr + '} }';
            }
        }
        
        if(this.projectionField.value) {
            projectionStr += '{"' + this.projectionField.value + '":' + this.projectionValue.value + '}';
        }
        
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
        console.log(e.target.className);
    }
    
    handleChange(index, queryKey, queryComparison, queryVal) {
        console.log('handleChange: ' + index + ' ' + queryKey + ' ' + queryComparison + ' ' + queryVal);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} >
                <div>
                    <div>
                        Query:&nbsp; 
                        <ActionFindQuery index={0} valueChange={this.handleChange} />
                        <button type="button" className="queryItem" onClick={this.addItem}>+</button>
                    </div>
                    <div>
                        Projection:&nbsp; <select name="hideOrShow" ref={(ref) => this.projectionValue = ref} >
                            <option value="1">Show</option>
                            <option value="0">Hide</option>
                        </select>
                        <input type="text" placeholder="Field" ref={(ref) => this.projectionField = ref} />
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
