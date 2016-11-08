import React from 'react';
import Collection from './collection.jsx';

class CollectionList extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            collectionNames: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        $.get('/api/collections/' + nextProps.db, function(result) {
            var newData = '';
            for(let x = 0; x < result.length; x++) {
                if(result[x].name.indexOf('system.') !== 0) {
                    newData += ',' + result[x].name;
                }
            }
            
            this.setState({ collectionNames: newData});
        }.bind(this));
    }

    componentDidMount() {
        $.get('/api/collections/' + this.props.db, function(result) {
            for(let x = 0; x < result.length; x++) {
                if(result[x].name.indexOf('system.') !== 0) {
                    this.setState({
                        collectionNames: this.state.collectionNames.concat(",", result[x].name) 
                    }); 
                }
            }
        }.bind(this));
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    render() {
        let self = this,
            collections = '';
        
        collections = this.state.collectionNames.split(',').map(function(col) {
            if(col !== '') {
                return (
                    <Collection col={col} onColClick={self.props.onColClick} >
                    </Collection>
                );
            }
        });

        return (
            <div className="collectionList">
                <h3>Collections in <i>{this.props.db}</i></h3>
                { (collections.length <= 1) ? 'NONE' : collections }
            </div>  
        );
    }
}

export default CollectionList;