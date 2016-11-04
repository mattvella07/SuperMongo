import React from 'react';

var Database = React.createClass({
    handleClick: function(event) {
        $('.database').removeClass('clicked');
        $('.collection').removeClass('clicked');
        $(event.target).addClass('clicked');
        
        this.props.onDBClick(event.target.innerHTML);
    },
    render: function() {
        return (
            <div className="database" onClick={this.handleClick}>
                {this.props.db}
            </div>
        );
    }
});

export default Database;