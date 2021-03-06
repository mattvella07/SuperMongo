import React from 'react';
import AddIcon from 'material-ui-icons/AddCircle';
import Collection from './collection.jsx';
import config from './../../lib/config.js';
const fetch = require('node-fetch');

class CollectionList extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            collectionNames: []
        };

        //Bind functions to this context
        this.getCollections = this.getCollections.bind(this);
        this.addOrDropCollection = this.addOrDropCollection.bind(this);
        this.addCollectionClick = this.addCollectionClick.bind(this);
    }

    addOrDropCollection(action, colToDrop) {
        let apiStr = `http://localhost:${config.express.port}/api/${action}Collection/${this.props.db}/${colToDrop}`;

        fetch(apiStr, { method: 'POST' })
        .then(res => res.text())
        .then(result => this.props.onColAddOrDrop());

        //Get new list of collections 
        this.getCollections();
    }

    addCollectionClick() {
        swal({title: "Add Collection", text: "What is the name of the collection you want to add?", 
              type: "input", closeOnConfirm: false, showCancelButton: true, inputPlaceholder: "Collection name" }, 
              inputValue => { if(inputValue === false) { return false; } else if(inputValue.trim() === "") { swal.showInputError("Please type a collection name."); return false; } this.addOrDropCollection('add', inputValue); swal.close(); });
    }

    getCollections(nextProps) {
        let currProps = nextProps || this.props,
            apiStr = `http://localhost:${config.express.port}/api/collections/${currProps.db}`;

        fetch(apiStr)
        .then(res => res.json())
        .then(result => {
            let tempArr = result.map(item => item.name).filter(col => col.indexOf('system.') !== 0);
            this.setState({ collectionNames: tempArr });
        });
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
        let collections = this.state.collectionNames.map((col, index) => <Collection key={index} db={this.props.db} col={col} onColClick={this.props.onColClick} onColDrop={this.addOrDropCollection} />);
        return (
            <div className="collectionList">
                <div className="collectionListHeader">
                    <h3>COLLECTIONS in <i>{this.props.db}</i> ({collections.length})</h3><AddIcon className="collectionIcon addCollection" onClick={this.addCollectionClick} />
                </div>
                { (collections.length === 0) ? 'NONE' : collections }
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
