import React from 'react';
import RemoveIcon from 'material-ui-icons/RemoveCircle';
const SweetAlert = require('react-swal');

class Collection extends React.Component {
    constructor(props) {
        super(props);

        //Bind functions to this context 
        this.handleClick = this.handleClick.bind(this);
        this.confirmDropCollection = this.confirmDropCollection.bind(this);
    }

    handleClick(event) {
        $('.collection').removeClass('clicked');
        $(event.target).addClass('clicked');

        this.props.onColClick(event.target.outerText);
    }

    confirmDropCollection(event) {
        event.stopPropagation();

        let self = this;
        swal({title: "Are you sure you want to drop this collection?", text: `Clicking Yes will completely remove the collection ${self.props.col}.`, 
              type: "warning", confirmButtonText: "Yes", showCancelButton: true, cancelButtonText: "No"}, 
              (isConfirm) => { if(isConfirm) { self.props.onColDrop('drop', self.props.col); } });         
    }

    render() {
        return (
            <div className="collection" onClick={this.handleClick} >
                {this.props.col}
                <RemoveIcon className="collectionIcon collectionRemove" onClick={this.confirmDropCollection} />
            </div>
        );
    }
}

//Type checking for props
Collection.propTypes = {
    db: React.PropTypes.string,
    col: React.PropTypes.string,
    onColClick: React.PropTypes.func,
    onColDrop: React.PropTypes.func
};

export default Collection; 