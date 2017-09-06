import React from 'react';
import JSONPretty from 'react-json-pretty';
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
            getStr = `http://localhost:${config.express.port}/api/${currProps.findOp}/${currProps.db}/${currProps.col}`,
            data = '';

        if(currProps.findOp.indexOf('distinct') !== -1) {
            if(currProps.distinctKey) {
                getStr += `/${currProps.distinctKey}`;
            } else {
                getStr += '/{}';
            }
        }

        if(currProps.query) {
            getStr += `/${currProps.query}`;
        } else {
            getStr += '/{}';
        }
        
        if(currProps.findOp.indexOf('find') !== -1) {
            if(currProps.projection) {
                getStr += `/${currProps.projection}`;
            } else {
                getStr += '/{}';
            }
        }

        if(currProps.findOp.indexOf('distinct') === -1) {
            if(currProps.options) {
                getStr += `/${currProps.options}`;
            } else {
                getStr += '/{}';
            }
        }
        
        fetch(getStr)
            .then(function(res) {
                return res.json();
            }).then(function(result) {
                if(result.length) {
                    for(let x = 0; x < result.length; x++) {
                        if(JSON.stringify(result[x]).indexOf(':') !== -1) {
                            data += JSON.stringify(result[x]).split(':').join(' : ').split(',').join(', ');
                        } else {
                            data += JSON.stringify(result[x]) + ', ';
                        }
                    }
                } else if(result) {
                    data += JSON.stringify(result).split(':').join(' : ').split(',').join(', ');
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
        let results = (this.state.result.indexOf('{') !== -1) ? this.state.result.split('}').map(function(r) {
            if(r !== '') {
                return (
                    <JSONPretty json={r + '}'}></JSONPretty>
                );
            } 
        }) : this.state.result;

        return (
            <div className="resultArea" id="resultArea">
                { this.state.isLoading ? <p id="resultsLoading">Loading...</p> : <div> { (this.props.findOp === 'count') ? results.toLocaleString('en-US') : results } </div> }
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
    options: React.PropTypes.string,
    findOp: React.PropTypes.string,
    distinctKey: React.PropTypes.string
};

export default ResultGet; 