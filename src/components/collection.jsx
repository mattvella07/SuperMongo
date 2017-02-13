import React from 'react';
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
                <button type="button" className="collectionRemove fa fa-times-circle" onClick={this.confirmDropCollection}></button>
            </div>
        );
    }
}

export default Collection; 