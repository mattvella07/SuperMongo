import React from 'react';
import DatabaseList from './databaseList.jsx';
import CollectionList from './collectionList.jsx';
import ActionArea from './actionArea.jsx';
import ResultGet from './resultGet.jsx';
import Pagination from './pagination.jsx';
import ResultPost from './resultPost.jsx';

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
        this.handleColDrop = this.handleColDrop.bind(this);
        this.handleFind = this.handleFind.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.moreClick = this.moreClick.bind(this);
    }

    handleDBClick(selectedDB) {
        this.selectedDB = selectedDB;
        this.setState({
            showCollections: true,
            showActionArea: false,
            showFindResultArea: false,
            showInsertResultArea: false,
            showRemoveResultArea: false,
            showUpdateResultArea: false
        });
    }

    handleColClick(selectedCol) {
        this.selectedCol = selectedCol;
        this.setState({
            showActionArea: true,
            showFindResultArea: false,
            showInsertResultArea: false,
            showRemoveResultArea: false,
            showUpdateResultArea: false
        });  
    }

    handleColDrop() {
        this.setState({
            showActionArea: false,
            showFindResultArea: false,
            showInsertResultArea: false,
            showRemoveResultArea: false,
            showUpdateResultArea: false
        });
    }

    handleFind(query, projection, options, userEnteredLimit) {
        this.query = query;
        this.projection = projection;
        this.options = options;
        this.userEnteredLimit = userEnteredLimit;
        this.setState({
            showFindResultArea: true,
            showInsertResultArea: false,
            showRemoveResultArea: false,
            showUpdateResultArea: false
        });
    }

    handleInsert(objToInsert) {
        this.objToInsert = objToInsert;
        this.setState({
            showInsertResultArea: true,
            showFindResultArea: false,
            showRemoveResultArea: false,
            showUpdateResultArea: false
        });
    }

    handleRemove(objToRemove, justOne) {
        this.objToRemove = objToRemove;
        this.justOne = justOne;
        this.setState({
            showRemoveResultArea: true,
            showInsertResultArea: false,
            showFindResultArea: false,
            showUpdateResultArea: false
        });
    }

    handleUpdate(criteria, objToUpdate, options) {
        this.criteria = criteria;
        this.objToUpdate = objToUpdate;
        this.updateOptions = options;
        this.setState({
            showUpdateResultArea: true,
            showRemoveResultArea: false,
            showInsertResultArea: false,
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
                    { this.state.showCollections ? <CollectionList db={this.selectedDB} onColClick={this.handleColClick} onColDrop={this.handleColDrop} /> : null }
                </div>
                <div className="column mainContainer">
                    { this.state.showActionArea ? <ActionArea onFind={this.handleFind} onInsert={this.handleInsert} onRemove={this.handleRemove} onUpdate={this.handleUpdate} /> : null }
                    { this.state.showFindResultArea ? <ResultGet db={this.selectedDB} col={this.selectedCol} query={this.query} projection={this.projection} options={this.options} /> : null }
                    { this.state.showFindResultArea ? <Pagination db={this.selectedDB} col={this.selectedCol} query={this.query} options={this.options} userEnteredLimit={this.userEnteredLimit} totalCount={this.totalCount} onMoreClick={this.moreClick} /> : null }
                    { this.state.showInsertResultArea ? <ResultPost db={this.selectedDB} col={this.selectedCol} dataObj={this.objToInsert} op='insert' /> : null }
                    { this.state.showRemoveResultArea ? <ResultPost db={this.selectedDB} col={this.selectedCol} dataObj={this.objToRemove} justOne={this.justOne} op='remove' /> : null }
                    { this.state.showUpdateResultArea ? <ResultPost db={this.selectedDB} col={this.selectedCol} criteria={this.criteria} dataObj={this.objToUpdate} options={this.updateOptions} op='update' /> : null }
                </div>
            </div>
        );
    }
}

export default PageContainer;