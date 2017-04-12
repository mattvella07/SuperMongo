import React from 'react';
import config from './../../lib/config.js';
var fetch = require('node-fetch');

class ResultGet extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            result: '',
            isLoading: true
        };

        //Bind functions to this context 
        this.getData = this.getData.bind(this);
    }

    getData(nextProps) {
        let currProps = nextProps || this.props,
            getStr = `http://localhost:${config.express.port}/api/find/${currProps.db}/${currProps.col}`,
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
        
        fetch(getStr)
            .then(function(res) {
                return res.json();
            }).then(function(result) {
                for(let x = 0; x < result.length; x++) {
                    data += JSON.stringify(result[x]).split(':').join(' : ').split(',').join(', ');
                }

                if(!data) {
                    data = '{ No results found ';
                }
            
                //Using state, set data and hide loading message 
                this.setState({ result: data });
                this.setState({ isLoading: false });
            }.bind(this));
    }

    componentWillReceiveProps(nextProps) {
        //Show loading message using state and get data 
        this.setState({ isLoading: true });
        this.getData(nextProps);
    }

    componentDidMount() {
        this.getData();
    }

    componentWillUnmount() {
        if(this.serverRequest) {
            this.serverRequest.abort();   
        }
    }

    render() {
        var results = this.state.result.split('}').map(function(r) {
            if(r !== '') {
                return (
                    <p>{r + '}'}</p>
                );
            } 
        });
        
        return (
            <div className="resultArea" id="resultArea">
                { this.state.isLoading ? <p id="resultsLoading">Loading...</p> : <div> {results} </div> }
            </div>
        );
    }
}

//Type checking for props
ResultGet.propTypes = {
    db: React.PropTypes.string,
    col: React.PropTypes.string,
    query: React.PropTypes.string,
    projection: React.PropTypes.string,
    options: React.PropTypes.string
};

export default ResultGet; 