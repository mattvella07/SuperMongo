import React from 'react';
import DatabaseList from './databaseList.jsx';
import CollectionList from './collectionList.jsx';
import ActionArea from './actionArea.jsx';
import ResultArea from './resultArea.jsx';
import Pagination from './pagination.jsx';

class PageContainer extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            selectedDB: '',
            selectedCol: '',
            showCollections: false,
            showActionArea: false,
            showResultArea: false,
            showPaginationArea: false
        };

        //Bind functions to this context 
        this.handleDBClick = this.handleDBClick.bind(this);
        this.handleColClick = this.handleColClick.bind(this);
        this.handleRun = this.handleRun.bind(this);
        this.moreClick = this.moreClick.bind(this);
    }

    handleDBClick(selectedDB) {
        this.setState({
            selectedDB: selectedDB,
            showCollections: true,
            showActionArea: false,
            showResultArea: false
        });
    }

    handleColClick(selectedCol) {
        this.setState({
            selectedCol: selectedCol,
            showActionArea: true,
            showResultArea: false
        });  
    }

    handleRun(query, projection, options, userEnteredLimit) {
        this.query = query;
        this.projection = projection;
        this.options = options;
        this.userEnteredLimit = userEnteredLimit;
        this.setState({
            showResultArea: true 
        });
    }

    moreClick(options) {
        this.options = options;
        this.setState({
            showResultArea: true
        });
    }

    render() {
        return (
            <div className="pageContainer">  
                <div className="column sideBar">
                    <DatabaseList source={this.props.allDBsApi} onDBClick={this.handleDBClick} />
                    { this.state.showCollections ? <CollectionList db={this.state.selectedDB} onColClick={this.handleColClick} /> : null }
                </div>
                <div className="column">
                    { this.state.showActionArea ? <ActionArea db={this.state.selectedDB} col={this.state.selectedCol} onRun={this.handleRun} /> : null }
                    { this.state.showResultArea ? <ResultArea db={this.state.selectedDB} col={this.state.selectedCol} query={this.query} projection={this.projection} options={this.options} /> : null }
                    { this.state.showResultArea ? <Pagination db={this.state.selectedDB} col={this.state.selectedCol} query={this.query} options={this.options} userEnteredLimit={this.userEnteredLimit} totalCount={this.totalCount} onMoreClick={this.moreClick} /> : null }
                </div>
            </div>
        );
    }
}

export default PageContainer;