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
        this.insertData = this.insertData.bind(this);
    }

    insertData(nextProps) {
        let currProps = nextProps || this.props,
            insertStr = '/api/insert/' + currProps.db + '/' + currProps.col,
            res = ''; 

        if(currProps.objToInsert) {
            insertStr += '/' + currProps.objToInsert;
        } else {
            insertStr += '/{}';
        }

        $.post(insertStr, function(result) {
            //console.log('insert result: ' + JSON.stringify(result));
            if(result && JSON.stringify(result).indexOf('ok') !== -1) {
                res = 'Item inserted successfully!';
            } else {
                res = 'Failed to insert item.';
            }

            //Using state, set data and hide loading message 
            this.setState({ result: res });
            this.setState({ isLoading: false });
        }.bind(this));
    }

    componentWillReceiveProps(nextProps) {
        //Show loading message using state and insert data 
        this.setState({ isLoading: true });
        this.insertData(nextProps);
    }

    componentDidMount() {
        this.insertData();
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