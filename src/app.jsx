import React from 'react'; 
import ReactDOM from 'react-dom';
import PageContainer from './components/pageContainer.jsx';

ReactDOM.render(
    <PageContainer allDBsApi="/api/databases" />,
    document.getElementById('content')
);