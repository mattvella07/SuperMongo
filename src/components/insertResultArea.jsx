import React from 'react';

class InsertResultArea extends React.Component {
    constructor(props) {
        super(props);

        //Bind functions to this context 
        this.insertData = this.insertData.bind(this);
    }

    insertData(nextProps) {
        let currProps = nextProps || this.props,
            insertStr = '/api/insert/' + currProps.db + '/' + currProps.col; 

        /*if(currProps.objToInsert) {
            insertStr += '/' + currProps.objToInsert;
        } else {
            insertStr += '/{}';
        }*/

        insertStr += '/{"hello": "one"}';

        $.post(insertStr, function(result) {
            console.log('insert result: ' + JSON.stringify(result));
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
            <div>INSERT RESULTS
            </div>
        );
    }
}

export default InsertResultArea;