import React from 'react';
const PAGE_LIMIT = 20;

var Pagination = React.createClass({
    componentWillReceiveProps: function(nextProps) {
        this.hasMoreItems(nextProps);
    },
    componentDidMount: function() {
        this.hasMoreItems();
    },
    hasMoreItems: function(nextProps) {
        //Get count 
        let currProps = nextProps || this.props,
            countStr = '/api/count/' + currProps.db + '/' + currProps.col;
        
        if(currProps.query) {
            countStr += '/' + currProps.query;
        } else {
            countStr += '/{}';
        }

        //If user didn't enter a limit, remove the default limit of 20
        //to get the total number of items 
        if(currProps.userEnteredLimit === -1) {
            countStr += '/' + currProps.options.replace('"limit":' + PAGE_LIMIT, '');
        } else if(currProps.userEnteredLimit > PAGE_LIMIT) {
            countStr += '/' + currProps.options.replace('"limit":' + PAGE_LIMIT, '"limit": ' + currProps.userEnteredLimit);
        } else {
            countStr += '/' + currProps.options;
        }

        //If default limit of 20 is removed make sure no commas are left over 
        countStr = countStr.replace(',}', '}');
        countStr = countStr.replace('{,', '{');

        $.get(countStr, function(result) {
            if(result) {
                let optionsObj = JSON.parse(currProps.options);

                //If more items exist, make sure button is enabled
                if(result - (optionsObj.skip + PAGE_LIMIT) > 0 && (currProps.userEnteredLimit === -1 || currProps.userEnteredLimit - (optionsObj.skip + PAGE_LIMIT) > 0)) {
                    $('.moreButton').removeClass('disabled');
                } else { //If no more items exist, make sure button is disabled 
                    $('.moreButton').addClass('disabled');
                }
            } 
        }.bind(this));
    },
    moreClick: function() {
        let optionsObj = JSON.parse(this.props.options);
        optionsObj.skip += PAGE_LIMIT;

        //If there is a full page of items to display
        if(this.props.userEnteredLimit === -1 || (this.props.userEnteredLimit > -1 && optionsObj.skip + PAGE_LIMIT <= this.props.userEnteredLimit)) {
            //Scroll to top of result area
            $('.resultArea').animate({scrollTop: 0}, 400);

            //Get the next results 
            this.props.onMoreClick(JSON.stringify(optionsObj));
        } else if(this.props.userEnteredLimit - optionsObj.skip > 0) { //Else if there is less than a full page of items to display 
            //Scroll to top of result area
            $('.resultArea').animate({scrollTop: 0}, 400);

            //Update the limit and get the next results 
            optionsObj.limit = this.props.userEnteredLimit - optionsObj.skip;
            this.props.onMoreClick(JSON.stringify(optionsObj));
        }
    },
    render: function() {
        return (
            <div className="pagination">
                <button className="moreButton" onClick={this.moreClick}>More</button>
            </div>
        );
    }
});

export default Pagination;