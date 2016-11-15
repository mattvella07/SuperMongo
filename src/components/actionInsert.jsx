import React from 'react';

class ActionInsert extends React.Component {
    constructor(props) {
        super(props);

        //Bind functions to this context 
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        let insertValStr = this.insertVal.value,
            insertStr = '';
        
        if(this.insertKey.value) {
            //If the insert value is a string, make sure it satrts and end with double quotes
            if(isNaN(insertValStr) && insertValStr[0] !== '"' && insertValStr[insertValStr.length - 1] !== '"') {
                //If single quotes were used replace them with double quotes, else just add double quotes 
                if(insertValStr[0] === "'" && insertValStr[insertValStr.length - 1] === "'") {
                    insertValStr = insertValStr.replace("'" , '"');
                    insertValStr = insertValStr.replace("'" , '"');
                } else {
                    insertValStr = '"' + insertValStr + '"';
                }
            }

            insertStr += '{"' + this.insertKey.value + '": ' + insertValStr + '}'; 
        }
        
        this.props.onInsert(insertStr);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <input type="text" placeholder="Key" ref={(ref) => this.insertKey = ref} /> 
                    <input type="text" placeholder="Value" ref={(ref) => this.insertVal = ref} />&nbsp;
                </div>
                <input type="submit" value="Insert" />
            </form>
        );
    }
}

export default ActionInsert;