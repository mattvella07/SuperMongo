import React from 'react'; 
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey900 } from 'material-ui/styles/colors';
import PageContainer from './components/pageContainer.jsx';
import config from './../lib/config.js';

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: 'rgba(139, 175, 223, 1)',
        borderColor: grey900
    },
    selectField: {
        customWidth: {
            width: 150
        }
    }
});

ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <PageContainer allDBsApi={`http://localhost:${config.express.port}/api/databases`} />
    </MuiThemeProvider>,
    document.getElementById('content')
);