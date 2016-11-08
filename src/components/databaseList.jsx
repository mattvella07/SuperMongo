import React from 'react';
import Database from './database.jsx';

class DatabaseList extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            dbNames: ''
        };
    }

    componentDidMount() {
        $.get(this.props.source, function(result) {
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
        var dbs = this.state.dbNames.split(',').map(function(db) {
            if(db !== '') {
                return (
                    <Database db={db} onDBClick={self.props.onDBClick}>
                    </Database>
                );
            }
        });  
        return (
            <div className="databaseList">
                <h3>Databases</h3>
                { (dbs.length <= 1) ? 'NONE' : dbs }            
            </div>
        );
    }
}

export default DatabaseList;