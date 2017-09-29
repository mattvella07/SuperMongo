import React from 'react';
import config from './../../lib/config.js';
var fetch = require('node-fetch');

class ResultPost extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            result: '',
            isLoading: true
        };

        //Bind functions to this context 
        this.insertOrRemoveData = this.insertOrRemoveData.bind(this);
    }

    insertOrRemoveData(nextProps) {
        let currProps = nextProps || this.props,
            apiStr = `http://localhost:${config.express.port}/api/${currProps.op}/${currProps.db}/${currProps.col}`,
            res = ''; 

        if(currProps.op === 'update') {
            if(currProps.criteria) {
                 apiStr += `/${currProps.criteria}`;
            } else {
                 apiStr += '/{}';
            }
        }

        if(currProps.dataObj) {
            apiStr += `/${currProps.dataObj}`;
        } else {
            apiStr += '/{}';
        }

        if(currProps.op === 'remove') {
            if(currProps.justOne) {
                apiStr += `/${currProps.justOne}`;
            } else {
                apiStr += '/{}';
            }
        }

        if(currProps.op === 'update') {
            if(currProps.options) {
                 apiStr += `/${currProps.options}`;
            } else {
                apiStr += '/{}';
            }
        }

        fetch(apiStr, { method: 'POST' })
            .then(function(res) {
                return res.json();
            }).then(function(result) {
                if(result && JSON.stringify(result).indexOf('ok') !== -1 && (currProps.op === 'insert' || result.n > 0)) {
                    if(currProps.op === 'insert') {
                        res = `Item ${currProps.op}ed successfully!`;
                    } else {
                        res = `Item ${currProps.op}d successfully!`;
                    }
                } else if(result && JSON.stringify(result).indexOf('ok') !== -1) {
                    res = `Unable to find item that you wanted to ${currProps.op}.`;
                } else {
                    res = `Failed to ${currProps.op} item.`;
                }

                //Using state, set data and hide loading message 
                this.setState({ result: res });
                this.setState({ isLoading: false });
            }.bind(this));
    }

    componentWillReceiveProps(nextProps) {
        //Show loading message using state and insert data 
        this.setState({ isLoading: true });
        this.insertOrRemoveData(nextProps);
    }

    componentDidMount() {
        this.insertOrRemoveData();
    }

    componentWillUnmount() {
        if(this.serverRequest) {
            this.serverRequest.abort();
        }
    }

    render() {
        return (
            <div className="resultArea">
                { this.state.isLoading ? <p id="resultsLoading">Loading...</p> : null }
                <div>
                    {this.state.result}
                </div>
            </div>
        );
    }
}

//Type checking for props
ResultPost.propTypes = {
    db: React.PropTypes.string,
    col: React.PropTypes.string, 
    dataObj: React.PropTypes.string,
    op: React.PropTypes.string,
    criteria: React.PropTypes.string,
    justOne: React.PropTypes.string,
    options: React.PropTypes.string
};

export default ResultPost;
