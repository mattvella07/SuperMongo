import React from 'react';
import Database from './database.jsx';
const fetch = require('node-fetch');

class DatabaseList extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            dbNames: []
        };
    }

    componentDidMount() {
        fetch(this.props.source)
        .then(res => res.json())
        .then(result => {
            let tempArr = result.map(item => item.name);
            this.setState({ dbNames: tempArr })
        });
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    render() {
        let dbs = this.state.dbNames.map((db, index) => <Database key={index} db={db} onDBClick={this.props.onDBClick} />);  
        return (
            <div className="databaseList">
                <h3>DATABASES ({dbs.length})</h3>
                { (dbs.length === 0) ? 'NONE' : dbs }            
            </div>
        );
    }
}

//Type checking for props
DatabaseList.propTypes = {
    source: React.PropTypes.string,
    onDBClick: React.PropTypes.func
};

export default DatabaseList;
