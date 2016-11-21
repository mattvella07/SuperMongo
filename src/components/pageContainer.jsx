import React from 'react';
import DatabaseList from './databaseList.jsx';
import CollectionList from './collectionList.jsx';
import ActionArea from './actionArea.jsx';
import FindResultArea from './findResultArea.jsx';
import Pagination from './pagination.jsx';
import InsertResultArea from './insertResultArea.jsx';

class PageContainer extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            showCollections: false,
            showActionArea: false,
            showFindResultArea: false,
            showInsertResultArea: false,
            showPaginationArea: false
        };

        //Bind functions to this context 
        this.handleDBClick = this.handleDBClick.bind(this);
        this.handleColClick = this.handleColClick.bind(this);
        this.handleFind = this.handleFind.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.moreClick = this.moreClick.bind(this);
    }

    handleDBClick(selectedDB) {
        this.selectedDB = selectedDB;
        this.setState({
            showCollections: true,
            showActionArea: false,
            showFindResultArea: false,
            showInsertResultArea: false
        });
    }

    handleColClick(selectedCol) {
        this.selectedCol = selectedCol;
        this.setState({
            showActionArea: true,
            showFindResultArea: false,
            showInsertResultArea: false
        });  
    }

    handleFind(query, projection, options, userEnteredLimit) {
        this.query = query;
        this.projection = projection;
        this.options = options;
        this.userEnteredLimit = userEnteredLimit;
        this.setState({
            showFindResultArea: true,
            showInsertResultArea: false
        });
    }

    handleInsert(objToInsert) {
        this.objToInsert = objToInsert;
        this.setState({
            showInsertResultArea: true,
            showFindResultArea: false
        });
    }

    moreClick(options) {
        this.options = options;
        this.setState({
            showFindResultArea: true,
            showInsertResultArea: false
        });
    }

    render() {
        return (
            <div className="pageContainer">  
                <div className="column sideBar">
                    <DatabaseList source={this.props.allDBsApi} onDBClick={this.handleDBClick} />
                    { this.state.showCollections ? <CollectionList db={this.selectedDB} onColClick={this.handleColClick} /> : null }
                </div>
                <div className="column mainContainer">
                    { this.state.showActionArea ? <ActionArea db={this.selectedDB} col={this.selectedCol} onFind={this.handleFind} onInsert={this.handleInsert} /> : null }
                    { this.state.showFindResultArea ? <FindResultArea db={this.selectedDB} col={this.selectedCol} query={this.query} projection={this.projection} options={this.options} /> : null }
                    { this.state.showFindResultArea ? <Pagination db={this.selectedDB} col={this.selectedCol} query={this.query} options={this.options} userEnteredLimit={this.userEnteredLimit} totalCount={this.totalCount} onMoreClick={this.moreClick} /> : null }
                    { this.state.showInsertResultArea ? <InsertResultArea db={this.selectedDB} col={this.selectedCol} objToInsert={this.objToInsert} /> : null }
                </div>
            </div>
        );
    }
}

export default PageContainer;