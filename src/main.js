const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const logger = require('./utils/logger');

let win; 

function createWindow() {
    win = new BrowserWindow({ width: 1000, height: 900 });

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    logger.info('Window created');
    
    win.on('closed', () => {
        win = null;
        logger.info('Window closed');
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        logger.info('Exit');
        app.quit();
    }
});

app.on('activate', () => {
    if(win === null) {
        createWindow();
    }
});