import { app, BrowserWindow, ipcMain, session, screen } from 'electron';

const createWindow = (): void => {
  let win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: false,
    },
  });

  const path = require('path');
  win.loadFile(path.join(__dirname, './index.html'));
  // win.loadFile('./index.html');

  // if --debug option open dev tool
  if (process.argv.find((arg) => arg === '--debug')) {
    win.webContents.openDevTools();
  }

  win.on('closed', () => {
    win = null;
  });
};

app.whenReady().then(createWindow);

ipcMain.handle('get-windows-size', () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  return { width, height };
});

app.on('ready', (_) => {
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['Origin'] = 'electron://localhost';
    callback({
      cancel: false,
      requestHeaders: details.requestHeaders,
    });
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
