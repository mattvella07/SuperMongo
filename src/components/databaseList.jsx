import React from 'react';
import Database from './database.jsx';
var fetch = require('node-fetch');

class DatabaseList extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            dbNames: ''
        };
    }

    componentDidMount() {
        fetch(this.props.source)
            .then(function(res) {
                return res.json();
            }).then(function(result) {
                for(let x = 0; x < result.length; x++) {
                    this.setState({
                        dbNames: this.state.dbNames.concat("," + result[x].name)
                    });
                }
            }.bind(this));
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    render() {
        var self = this;
        var dbs = this.state.dbNames.split(',').map(function(db, index) {
            if(db !== '') {
                return (
                    <Database key={index} db={db} onDBClick={self.props.onDBClick}>
                    </Database>
                );
            }
        });  
        return (
            <div className="databaseList">
                <h3>DATABASES</h3>
                { (dbs.length <= 1) ? 'NONE' : dbs }            
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