import React from 'react';

var ResultArea = React.createClass({
    getInitialState: function() {
        //Set initial state
        return {
            result: '',
            isLoading: true
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
                data += JSON.stringify(result[x]).split(':').join(' : ').split(',').join(', ');
            }

            if(!data) {
                data = '{ No results found ';
            }
            
            //Using state, set data and hide loading message 
            this.replaceState({result: data});
            this.setState({ isLoading: false });
        }.bind(this));
    },
    componentWillReceiveProps: function(nextProps) {
        //Show loading message using state and get data 
        this.setState({ isLoading: true });
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
            <div className="resultArea" id="resultArea">
                { this.state.isLoading ? <p id="resultsLoading">Loading...</p> : null }
                <div>
                    {results}
                </div>
            </div>
        );
    }
});

export default ResultArea; 