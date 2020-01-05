const { app, session, BrowserWindow } = require('electron');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            enableRemoteModule: false,
            nodeIntegration: false,
            nodeIntegrationInWorker: false,
            contextIsolation: true
        }
    });

    win.removeMenu();
    win.maximize();

    win.loadFile('index.html');

    win.on('closed', () => {
        win = null;
    });
}

app.on('web-contents-created', (event, contents) => {
    /* <webview>s disallowed */
    contents.on('will-attach-webview', (event, webPreferences, params) => {
        event.preventDefault();
    });

    /* navigation disallowed */
    contents.on('will-navigate', (event, navigationUrl) => {
        event.preventDefault();
    });

    /* new windows disallowed */
    contents.on('new-window', (event, navigationUrl) => {
        event.preventDefault();
    });
});

app.on('ready', createWindow);

app.on('windows-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
