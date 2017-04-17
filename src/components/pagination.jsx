import React from 'react';
import config from './../../lib/config.js';
var scroll = require('react-scroll').animateScroll;
var fetch = require('node-fetch');
const PAGE_LIMIT = 20;

class Pagination extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            isDisabled: false,
            numRecords: 0
        };

        //Bind functions to this context 
        this.hasMoreItems = this.hasMoreItems.bind(this);
        this.moreClick = this.moreClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.hasMoreItems(nextProps);
    }

    componentDidMount() {
        this.hasMoreItems();
    }

    hasMoreItems(nextProps) {
        //Get count 
        let currProps = nextProps || this.props,
            countStr = `http://localhost:${config.express.port}/api/count/${currProps.db}/${currProps.col}`;
        
        if(currProps.query) {
            countStr += `/${currProps.query}`;
        } else {
            countStr += '/{}';
        }

        //If user didn't enter a limit, remove the default limit of 20
        //to get the total number of items 
        if(currProps.userEnteredLimit === -1) {
            countStr += `/${currProps.options.replace(`"limit":${PAGE_LIMIT},`, '')}`;
        } else if(currProps.userEnteredLimit > PAGE_LIMIT) {
            countStr += `/${currProps.options.replace(`"limit":${PAGE_LIMIT}`, `"limit": ${currProps.userEnteredLimit}`)}`;
        } else {
            countStr += `/${currProps.options}`;
        }

        //If default limit of 20 is removed make sure no commas are left over 
        countStr = countStr.replace(',}', '}');
        countStr = countStr.replace('{,', '{');

        fetch(countStr)
            .then(function(res) {
                return res.json();
            }).then(function(result) {
                if(result) {
                    this.setState({ numRecords: (typeof(result) === 'number') ? result : 0 });

                    let optionsObj = JSON.parse(currProps.options);

                    //If more items exist, make sure button is enabled
                    if(result - (optionsObj.skip + PAGE_LIMIT) > 0 && (currProps.userEnteredLimit === -1 || currProps.userEnteredLimit - (optionsObj.skip + PAGE_LIMIT) > 0)) {
                        this.setState({ isDisabled: false });
                    } else { //If no more items exist, make sure button is disabled 
                        this.setState({ isDisabled: true });
                    }
                } else {
                    this.setState({ isDisabled: true });
                }
            }.bind(this));
    } 

    moreClick(e) {
        let optionsObj = JSON.parse(this.props.options);
            optionsObj.skip += PAGE_LIMIT;

        //If there is a full page of items to display
        if(this.props.userEnteredLimit === -1 || (this.props.userEnteredLimit > -1 && optionsObj.skip + PAGE_LIMIT <= this.props.userEnteredLimit)) {
            //Scroll to top of result area
            scroll.scrollToTop({containerId: 'resultArea'});

            //Get the next results 
            this.props.onMoreClick(JSON.stringify(optionsObj));
        } else if(this.props.userEnteredLimit - optionsObj.skip > 0) { //Else if there is less than a full page of items to display 
            //Scroll to top of result area
            scroll.scrollToTop({containerId: 'resultArea'});

            //Update the limit and get the next results 
            optionsObj.limit = this.props.userEnteredLimit - optionsObj.skip;
            this.props.onMoreClick(JSON.stringify(optionsObj));
        }
    }

    render() {
        return (
            <div className="pagination">
                <p>{this.state.numRecords.toLocaleString('en-US')} record(s) found</p>
                <button className="moreButton" onClick={this.moreClick} disabled={this.state.isDisabled} >More</button>
            </div>
        );
    }
}

//Type checking for props
Pagination.propTypes = {
    db: React.PropTypes.string,
    col: React.PropTypes.string,
    query: React.PropTypes.string,
    options: React.PropTypes.string,
    userEnteredLimit: React.PropTypes.number,
    totalCount: React.PropTypes.number,
    onMoreClick: React.PropTypes.func
};

export default Pagination;