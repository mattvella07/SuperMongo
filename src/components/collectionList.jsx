import React from 'react';
import AddIcon from 'material-ui-icons/AddCircle';
import Collection from './collection.jsx';
import config from './../../lib/config.js';
var fetch = require('node-fetch');

class CollectionList extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            collectionNames: ''
        };

        //Bind functions to this context
        this.getCollections = this.getCollections.bind(this);
        this.addOrDropCollection = this.addOrDropCollection.bind(this);
        this.addCollectionClick = this.addCollectionClick.bind(this);
    }

    addOrDropCollection(action, colToDrop) {
        let apiStr = `http://localhost:${config.express.port}/api/${action}Collection/${this.props.db}/${colToDrop}`;

        fetch(apiStr, { method: 'POST' })
            .then(function(res) {
                return res.text();
            }).then(function(result) {
                this.props.onColAddOrDrop();
            }.bind(this));

        //Get new list of collections 
        this.getCollections();
    }

    addCollectionClick() {
        let self = this;
        swal({title: "Add Collection", text: "What is the name of the collection you want to add?", 
              type: "input", closeOnConfirm: false, showCancelButton: true, inputPlaceholder: "Collection name" }, 
              (inputValue) => { if(inputValue === false) { return false; } else if(inputValue.trim() === "") { swal.showInputError("Please type a collection name."); return false; } self.addOrDropCollection('add', inputValue); swal.close(); });
    }

    getCollections(nextProps) {
        let currProps = nextProps || this.props,
            apiStr = `http://localhost:${config.express.port}/api/collections/${currProps.db}`;

        fetch(apiStr)
            .then(function(res) {
                return res.json();
            }).then(function(result) {
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
        
        collections = this.state.collectionNames.split(',').map(function(col, index) {
            if(col !== '') {
                return (
                    <Collection key={index} db={self.props.db} col={col} onColClick={self.props.onColClick} onColDrop={self.addOrDropCollection} >
                    </Collection>
                );
            }
        });

        return (
            <div className="collectionList">
                <div className="collectionListHeader">
                    <h3>COLLECTIONS in <i>{this.props.db}</i></h3><AddIcon className="collectionIcon addCollection" onClick={this.addCollectionClick} />
                </div>
                { (collections.length <= 1) ? <p>NONE</p> : collections }
            </div>
        );
    }
}

//Type checking for props
CollectionList.propTypes = {
     db: React.PropTypes.string,
     onColClick: React.PropTypes.func,
     onColAddOrDrop: React.PropTypes.func
};

export default CollectionList;
