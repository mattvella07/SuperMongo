import React from 'react';

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

export default ResultArea; 