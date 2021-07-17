const { app, BrowserWindow, ipcMain } = require('electron');

function createWindow(){
    const window = new BrowserWindow({
        width: 960, height: 580,
        resizable: false, maximizable: false,
        frame: false, autoHideMenuBar: true,
        icon: './icon.ico',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: false
        }
    });

    window.loadFile('./src/networkchoosing.html');

    // Minimize and close window
    ipcMain.on('minimize-window', () => {
        window.minimize();
    });

    ipcMain.on('close-window', () => {
        window.close();
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function(){
        if(BrowserWindow.getAllWindows().length === 0){
            createWindow();
        }
    });
});

app.on('window-all-closed', function(){
    if(process.platform !== 'darwin'){
        app.quit();
    }
});