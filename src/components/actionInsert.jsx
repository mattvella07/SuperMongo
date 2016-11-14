import React from 'react';

class ActionInsert extends React.Component {
    constructor(props) {
        super(props);

        //Bind functions to this context 
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        
        this.props.onInsert({});
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