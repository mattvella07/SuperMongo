import React from 'react';

var Collection = React.createClass({
    handleClick: function(event) {
        $('.collection').removeClass('clicked');
        $(event.target).addClass('clicked');
        
        this.props.onColClick(event.target.innerHTML);
    },
    render: function() {
        return (
            <div className="collection" onClick={this.handleClick}>
                {this.props.col}
            </div>
        );
    }
});

export default Collection; 