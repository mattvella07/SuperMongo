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
        this.addOrDropCollection = this.addOrDropCollection.bind(this);
        this.addCollectionClick = this.addCollectionClick.bind(this);
        //this.addCollection = this.addCollection.bind(this);
    }

    addOrDropCollection(action, colToDrop) {
        let apiStr = `/api/${action}Collection/${this.props.db}/${colToDrop}`;

        $.post(apiStr, function(result) {
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

    /*addCollection(colName) {
         //console.log("add Collection: " + colName);
         let apiStr = `/api/addCollection/${this.props.db}/${colName}`;

         //API call to add collection 
         $.post(apiStr, function(result) {
             //Add successful 
            this.props.onColAddOrDrop();
         }.bind(this));

         //After col added, get new list of collections 
        this.getCollections();
    }*/

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
                    <Collection db={self.props.db} col={col} onColClick={self.props.onColClick} onColDrop={self.addOrDropCollection} >
                    </Collection>
                );
            }
        });

        return (
            <div className="collectionList">
                <h3>Collections in <i>{this.props.db}</i></h3> <button type="button"className="fa fa-plus-circle" onClick={this.addCollectionClick}></button>
                { (collections.length <= 1) ? 'NONE' : collections }
            </div>  
        );
    }
}

export default CollectionList;