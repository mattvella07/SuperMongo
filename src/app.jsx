import React from 'react'; 
import ReactDOM from 'react-dom';
import DatabaseList from './components/databaseList.jsx';
import CollectionList from './components/collectionList.jsx';
import ActionArea from './components/actionArea.jsx';
import ResultArea from './components/resultArea.jsx';
import Pagination from './components/pagination.jsx';

var PageContainer = React.createClass({
    getInitialState: function() {
        return {
            selectedDB: '',
            selectedCol: '',
            showCollections: false,
            showActionArea: false,
            showResultArea: false,
            showPaginationArea: false
        };
    },
    handleDBClick: function(selectedDB) {
        this.setState({
            selectedDB: selectedDB,
            showCollections: true,
            showActionArea: false,
            showResultArea: false
        });
    },
    handleColClick: function(selectedCol) {
        this.setState({
            selectedCol: selectedCol,
            showActionArea: true,
            showResultArea: false
        });  
    },
    handleRun: function(query, projection, options, userEnteredLimit) {
        this.query = query;
        this.projection = projection;
        this.options = options;
        this.userEnteredLimit = userEnteredLimit;
        this.setState({
            showResultArea: true 
        });
    },
    moreClick: function(options) {
        this.options = options;
        this.setState({
            showResultArea: true
        });
    },
    render: function() {
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
});

//DatabaseList

//Database

//CollectionList

//Collection

//ActionArea

//ResultArea

//Pagination

ReactDOM.render(
    <PageContainer allDBsApi="/api/databases" />,
    document.getElementById('content')
);