var PageContainer = React.createClass({
    getInitialState: function() {
        return {
            selectedDB: '',
            selectedCol: '',
            showCollections: false,
            showActionArea: false,
            showResultArea: false
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
    handleRun: function(query, projection, options) {
        this.query = query;
        this.projection = projection;
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
        
        let queryStr = '',
            projectionStr = '',
            optionsStr = '';
        
        if(this.queryKey.value) {
            if(this.queryComparison.value === ':') {
                queryStr += '{"' + this.queryKey.value + '"' + this.queryComparison.value + ' ' + this.queryVal.value + '}';
            } else {
                queryStr += '{"' + this.queryKey.value + '": {"' + this.queryComparison.value + '": ' + this.queryVal.value + '} }';
            }
        }
        
        if(this.projectionField.value) {
            projectionStr += '{"' + this.projectionField.value + '": ' + this.projectionValue.value + '}';
        }
        
        if(this.sortField.value) {
            optionsStr += '{"sort": [["' + this.sortField.value + '", "' + this.sortDirection.value + '"]]}';
        }

        this.props.onRun(queryStr, projectionStr, optionsStr);
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

ReactDOM.render(
    <PageContainer allDBsApi="/api/databases" />,
    document.getElementById('content')
);