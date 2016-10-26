const PAGE_LIMIT = 20;

var PageContainer = React.createClass({
    getInitialState: function() {
        return {
            selectedDB: '',
            selectedCol: '',
            showCollections: false,
            showActionArea: false,
            showResultArea: false,
            showPaginationArea: false
        };
    },
    handleDBClick: function(selectedDB) {
        this.setState({
            selectedDB: selectedDB,
            showCollections: true,
            showActionArea: false,
            showResultArea: false
        });
    },
    handleColClick: function(selectedCol) {
        this.setState({
            selectedCol: selectedCol,
            showActionArea: true,
            showResultArea: false
        });  
    },
    handleRun: function(query, projection, options, userEnteredLimit) {
        this.query = query;
        this.projection = projection;
        this.options = options;
        this.userEnteredLimit = userEnteredLimit;
        this.setState({
            showResultArea: true 
        });
    },
    moreClick: function(options) {
        this.options = options;
        this.setState({
            showResultArea: true
        });
    },
    render: function() {
        return (
            <div>  
                <div className="column sideBar">
                    <DatabaseList source={this.props.allDBsApi} onDBClick={this.handleDBClick} />
                    { this.state.showCollections ? <CollectionList db={this.state.selectedDB} onColClick={this.handleColClick} /> : null }
                </div>
                <div className="column">
                    { this.state.showActionArea ? <ActionArea db={this.state.selectedDB} col={this.state.selectedCol} onRun={this.handleRun} /> : null }
                    { this.state.showResultArea ? <ResultArea db={this.state.selectedDB} col={this.state.selectedCol} query={this.query} projection={this.projection} options={this.options} /> : null }
                    { this.state.showResultArea ? <Pagination db={this.state.selectedDB} col={this.state.selectedCol} query={this.query} options={this.options} userEnteredLimit={this.userEnteredLimit} totalCount={this.totalCount} onMoreClick={this.moreClick} /> : null }
                </div>
            </div>
        );
    }
});

var DatabaseList = React.createClass({
    getInitialState: function() {
        return {
            dbNames: ''
        };
    },
    componentDidMount: function() {
        $.get(this.props.source, function(result) {
            for(let x = 0; x < result.length; x++) {
                this.setState({
                    dbNames: this.state.dbNames.concat("," + result[x].name)
                });
            }
        }.bind(this));
    },
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },
    render: function() {
        var self = this;
        var dbs = this.state.dbNames.split(',').map(function(db) {
            if(db !== '') {
                return (
                    <Database db={db} onDBClick={self.props.onDBClick}>
                    </Database>
                );
            }
        });  
        return (
            <div className="databaseList">
                <h3>Databases</h3>
                {dbs}            
            </div>
        );
    }
});

var Database = React.createClass({
    handleClick: function(event) {
        $('.database').removeClass('clicked');
        $('.collection').removeClass('clicked');
        $(event.target).addClass('clicked');
        
        this.props.onDBClick(event.target.innerHTML);
    },
    render: function() {
        return (
            <div className="database" onClick={this.handleClick}>
                {this.props.db}
            </div>
        );
    }
});

var CollectionList = React.createClass({
    getInitialState: function() {
        return {
            collectionNames: ''
        };
    },
    componentWillReceiveProps: function(nextProps) {
        $.get('/api/collections/' + nextProps.db, function(result) {
            var newData = '';
            for(let x = 0; x < result.length; x++) {
                if(result[x].name.indexOf('system.') !== 0) {
                    newData += ',' + result[x].name;
                }
            }
            
            this.replaceState({ collectionNames: newData});
        }.bind(this));
    },
    componentDidMount: function() {
        $.get('/api/collections/' + this.props.db, function(result) {
            for(let x = 0; x < result.length; x++) {
                if(result[x].name.indexOf('system.') !== 0) {
                    this.setState({
                        collectionNames: this.state.collectionNames.concat(",", result[x].name) 
                    }); 
                }
            }
        }.bind(this));
    },
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },
    render: function() {
        var self = this;
        var collections = this.state.collectionNames.split(',').map(function(col) {
            if(col !== '') {
                return (
                    <Collection col={col} onColClick={self.props.onColClick} >
                    </Collection>
                );
            }
        });
        return (
            <div className="collectionList">
                <h3>Collections in <i>{this.props.db}</i></h3>
                {collections}
            </div>  
        );
    }
});

var Collection = React.createClass({
    handleClick: function(event) {
        $('.collection').removeClass('clicked');
        $(event.target).addClass('clicked');
        
        this.props.onColClick(event.target.innerHTML);
    },
    render: function() {
        return (
            <div className="collection" onClick={this.handleClick}>
                {this.props.col}
            </div>
        );
    }
});

var ActionArea = React.createClass({
    onSubmit: function(e) {
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

        this.props.onRun(queryStr, projectionStr, optionsStr, userEnteredLimit);
    },
    render: function() {
        return (
            <div className="actionArea">
                <form onSubmit={this.onSubmit} >
                    <select name="operations"> 
                        <option value="find">Find</option>
                    </select>
                    <div>
                        <div>
                            Query:&nbsp; <input type="text" placeholder="Key" ref={(ref) => this.queryKey = ref} /> 
                            <select name="comparison" ref={(ref) => this.queryComparison = ref} > 
                                <option value=":">Equals</option>
                                <option value="$lt">Less than</option>
                                <option value="$lte">Less than or equal to</option>
                                <option value="$gt">Greater than</option>
                                <option value="$gte">Greater than or equal to</option>
                                <option value="$ne">Not equal</option>
                            </select>
                            <input type="text" placeholder="Value" ref={(ref) => this.queryVal = ref} />&nbsp;
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
            </div>
        );
    }
});

var ResultArea = React.createClass({
    getInitialState: function() {
        return {
            result: ''
        };
    },
    getData: function(nextProps) {
        let currProps = nextProps || this.props,
            getStr = '/api/find/' + currProps.db + '/' + currProps.col,
            data = '';
        
        if(currProps.query) {
            getStr += '/' + currProps.query;
        } else {
            getStr += '/{}';
        }
        
        if(currProps.projection) {
            getStr += '/' + currProps.projection;
        } else {
            getStr += '/{}';
        }

        if(currProps.options) {
            getStr += '/' + currProps.options;
        } else {
            getStr += '/{}';
        }
        
        $.get(getStr, function(result) {
            for(let x = 0; x < result.length; x++) {
                var item = result[x];
                
                data += '{';
                
                for(var propname in item) {
                    if(item.hasOwnProperty(propname)) {
                        data += propname + ': ' + item[propname] + ', ';
                    }
                }
                
                data += '}';
            }

            if(!data) {
                data = '{ No results found ';
            }
            
            this.replaceState({result: data});
            
            $('#resultsLoading').hide();
            
        }.bind(this));
    },
    componentWillReceiveProps: function(nextProps) {
        this.getData(nextProps);
    },
    componentDidMount: function() {
        this.getData();
    },    
    componentWillUnmount: function() {
        if(this.serverRequest) {
            this.serverRequest.abort();   
        }
    },   
    render: function() {
        var results = this.state.result.split('}').map(function(r) {
            if(r !== '') {
                return (
                    <p>{r + '}'}</p>
                );
            } 
        });
        
        return (
            <div className="resultArea">
                <p id="resultsLoading">Loading...</p>
                <div>
                    {results}
                </div>
            </div>
        );
    }
});

var Pagination = React.createClass({
    componentWillReceiveProps: function(nextProps) {
        this.hasMoreItems(nextProps);
    },
    componentDidMount: function() {
        this.hasMoreItems();
    },
    hasMoreItems: function(nextProps) {
        //Get count 
        let currProps = nextProps || this.props,
            countStr = '/api/count/' + currProps.db + '/' + currProps.col;
        
        if(currProps.query) {
            countStr += '/' + currProps.query;
        } else {
            countStr += '/{}';
        }

        //If user didn't enter a limit, remove the default limit of 20
        //to get the total number of items 
        if(currProps.userEnteredLimit === -1) {
            countStr += '/' + currProps.options.replace('"limit":' + PAGE_LIMIT, '');
        } else if(currProps.userEnteredLimit > PAGE_LIMIT) {
            countStr += '/' + currProps.options.replace('"limit":' + PAGE_LIMIT, '"limit": ' + currProps.userEnteredLimit);
        } else {
            countStr += '/' + currProps.options;
        }

        //If default limit of 20 is removed make sure no commas are left over 
        countStr = countStr.replace(',}', '}');
        countStr = countStr.replace('{,', '{');

        $.get(countStr, function(result) {
            if(result) {
                let optionsObj = JSON.parse(currProps.options);

                if(result - (optionsObj.skip + PAGE_LIMIT) > 0 && (currProps.userEnteredLimit === -1 || currProps.userEnteredLimit - (optionsObj.skip + PAGE_LIMIT) > 0)) {
                    //console.log('more exist');
                    $('.moreButton').removeClass('disabled');
                } else {
                    //console.log('no more');
                    $('.moreButton').addClass('disabled');
                }
            } 
        }.bind(this));
    },
    moreClick: function() {
        let optionsObj = JSON.parse(this.props.options);
        optionsObj.skip += PAGE_LIMIT;

        //If there is a full page of items to display
        if(this.props.userEnteredLimit === -1 || (this.props.userEnteredLimit > -1 && optionsObj.skip + PAGE_LIMIT <= this.props.userEnteredLimit)) {
            //Scroll to top of result area
            $('.resultArea').animate({scrollTop: 0}, 400);

            //Get the next results 
            this.props.onMoreClick(JSON.stringify(optionsObj));
        } else if(this.props.userEnteredLimit - optionsObj.skip > 0) { //Else if there is less than a full page of items to display 
            //Scroll to top of result area
            $('.resultArea').animate({scrollTop: 0}, 400);

            //Update the limit and get the next results 
            optionsObj.limit = this.props.userEnteredLimit - optionsObj.skip;
            this.props.onMoreClick(JSON.stringify(optionsObj));
        }
    },
    render: function() {
        return (
            <div className="pagination">
                <button className="moreButton" onClick={this.moreClick}>More</button>
            </div>
        );
    }
});

ReactDOM.render(
    <PageContainer allDBsApi="/api/databases" />,
    document.getElementById('content')
);