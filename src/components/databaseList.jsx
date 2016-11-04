import React from 'react';
import Database from './database.jsx';

var DatabaseList = React.createClass({
    getInitialState: function() {
        return {
            dbNames: ''
        };
    },
    componentDidMount: function() {
        $.get(this.props.source, function(result) {
            for(let x = 0; x < result.length; x++) {
                this.setState({
                    dbNames: this.state.dbNames.concat("," + result[x].name)
                });
            }
        }.bind(this));
    },
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },
    render: function() {
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
});

export default DatabaseList;