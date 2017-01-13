import React from 'react';

class InsertResultArea extends React.Component {
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
            apiStr = '/api/' + currProps.op + '/' + currProps.db + '/' + currProps.col,
            res = ''; 

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

        $.post(apiStr, function(result) {
            if(result && JSON.stringify(result).indexOf('ok') !== -1) {
                res = currProps.op === 'insert' ? 'Item inserted successfully!' : 'Item removed successfully!';
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

export default InsertResultArea;