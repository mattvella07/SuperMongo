import React from 'react';
import DatabaseList from './databaseList.jsx';
import CollectionList from './collectionList.jsx';
import ActionArea from './actionArea.jsx';
import ResultGet from './resultGet.jsx';
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
            showInsertFromFileResultArea: false
        };

        //Bind functions to this context 
        this.handleDBClick = this.handleDBClick.bind(this);
        this.handleColClick = this.handleColClick.bind(this);
        this.handleColAddOrDrop = this.handleColAddOrDrop.bind(this);
        this.handleFind = this.handleFind.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.handleInsertFromFile = this.handleInsertFromFile.bind(this);
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
            showInsertFromFileResultArea: false,
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
            showInsertFromFileResultArea: false,
            showRemoveResultArea: false,
            showUpdateResultArea: false
        });  
    }

    handleColAddOrDrop() {
        this.setState({
            showActionArea: false,
            showFindResultArea: false,
            showInsertResultArea: false,
            showInsertFromFileResultArea: false,
            showRemoveResultArea: false,
            showUpdateResultArea: false
        });
    }

    handleFind(findOp, query, projection, options, userEnteredLimit, distinctKey) {
        this.findOp = findOp;
        this.query = query;
        this.projection = projection;
        this.options = options;
        this.userEnteredLimit = userEnteredLimit;
        this.distinctKey = distinctKey;
        this.setState({
            showFindResultArea: true,
            showInsertResultArea: false,
            showInsertFromFileResultArea: false,
            showRemoveResultArea: false,
            showUpdateResultArea: false
        });
    }

    handleInsert(objToInsert) {
        this.objToInsert = objToInsert;
        this.setState({
            showInsertResultArea: true,
            showInsertFromFileResultArea: false,
            showFindResultArea: false,
            showRemoveResultArea: false,
            showUpdateResultArea: false
        });
    }

    handleInsertFromFile(file) {
        this.fileToInsert = file;
        console.log('f: ' + this.fileToInsert);
        this.setState({
            showInsertFromFileResultArea: true,
            showInsertResultArea: false,
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
            showInsertFromFileResultArea: false,
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
            showInsertFromFileResultArea: false,
            showFindResultArea: false
        });
    }

    moreClick(options) {
        this.options = options;
        this.setState({
            showFindResultArea: true,
            showInsertResultArea: false,
            showInsertFromFileResultArea: false
        });
    }

    render() {
        return (
            <div className="pageContainer">  
                <div className="column sideBar">
                    <DatabaseList source={this.props.allDBsApi} onDBClick={this.handleDBClick} />
                    { this.state.showCollections ? <CollectionList db={this.selectedDB} onColClick={this.handleColClick} onColAddOrDrop={this.handleColAddOrDrop} /> : null }
                </div>
                <div className="column mainContainer">
                    { this.state.showActionArea ? <ActionArea onFind={this.handleFind} onInsert={this.handleInsert} onInsertFromFile={this.handleInsertFromFile} onRemove={this.handleRemove} onUpdate={this.handleUpdate} /> : null }
                    { this.state.showFindResultArea ? <ResultGet db={this.selectedDB} col={this.selectedCol} findOp={this.findOp} query={this.query} projection={this.projection} options={this.options} distinctKey={this.distinctKey} userEnteredLimit={this.userEnteredLimit} onMoreClick={this.moreClick} /> : null }
                    { this.state.showInsertResultArea ? <ResultPost db={this.selectedDB} col={this.selectedCol} dataObj={this.objToInsert} op='insert' /> : null }
                    { this.state.showInsertFromFileResultArea ? <ResultPost db={this.selectedDB} col={this.selectedCol} dataObj={this.fileToInsert} op='insertFromFile' /> : null }
                    { this.state.showRemoveResultArea ? <ResultPost db={this.selectedDB} col={this.selectedCol} dataObj={this.objToRemove} justOne={this.justOne} op='remove' /> : null }
                    { this.state.showUpdateResultArea ? <ResultPost db={this.selectedDB} col={this.selectedCol} criteria={this.criteria} dataObj={this.objToUpdate} options={this.updateOptions} op='update' /> : null }
                </div>
            </div>
        );
    }
}

//Type checking for props
PageContainer.propTypes = {
    allDBsApi: React.PropTypes.string
};

export default PageContainer;
