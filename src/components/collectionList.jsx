import React from 'react';
import Collection from './collection.jsx';

class CollectionList extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            collectionNames: ''
        };

        //Bind functions to this context
        this.getCollections = this.getCollections.bind(this);
        this.dropCollection = this.dropCollection.bind(this);
    }

    dropCollection(colToDrop) {
        let apiStr = `/api/dropCollection/${this.props.db}/${colToDrop}`;

        $.post(apiStr, function(result) {
            //Delete successful 
            this.props.onColDrop();
        }.bind(this));

        //After col deleted, get new list of collections 
        this.getCollections();
    }

    getCollections(nextProps) {
        let currProps = nextProps || this.props;

        $.get(`/api/collections/${currProps.db}`, function(result) {
            var newData = '';
            for(let x = 0; x < result.length; x++) {
                if(result[x].name.indexOf('system.') !== 0) {
                    newData += ',' + result[x].name;
                }
            }
            
            this.setState({ collectionNames: newData});
        }.bind(this));
    }

    componentWillReceiveProps(nextProps) {
        this.getCollections(nextProps);
    }

    componentDidMount() {
        this.getCollections();
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
                    <Collection db={self.props.db} col={col} onColClick={self.props.onColClick} onColDrop={self.dropCollection} >
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