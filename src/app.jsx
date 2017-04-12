import React from 'react'; 
import ReactDOM from 'react-dom';
import PageContainer from './components/pageContainer.jsx';
import config from './../lib/config.js';

ReactDOM.render(
    <PageContainer allDBsApi={`http://localhost:${config.express.port}/api/databases`} />,
    document.getElementById('content')
);