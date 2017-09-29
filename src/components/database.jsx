import React from 'react';

class Database extends React.Component {
    constructor(props) {
        super(props);

        //Bind functions to this context 
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        $('.database').removeClass('clicked');
        $('.collection').removeClass('clicked');
        $(event.target).addClass('clicked');
        
        this.props.onDBClick(event.target.innerHTML);
    } 

    render() {
        return (
            <div className="database" onClick={this.handleClick}>
                {this.props.db}
            </div>
        );
    }
}

//Type checking for props
Database.propTypes = {
    db: React.PropTypes.string,
    onDBClick: React.PropTypes.func
};

export default Database;
