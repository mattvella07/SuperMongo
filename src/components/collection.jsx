import React from 'react';

class Collection extends React.Component {
    constructor(props) {
        super(props);

        //Bind functions to this context 
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        $('.collection').removeClass('clicked');
        $(event.target).addClass('clicked');
        
        this.props.onColClick(event.target.innerHTML);
    }

    render() {
        return (
            <div className="collection" onClick={this.handleClick}>
                {this.props.col}
            </div>
        );
    }
}

export default Collection; 