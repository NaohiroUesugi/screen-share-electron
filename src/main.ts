import { app, BrowserWindow, ipcMain, session, screen } from 'electron';
// import path from 'path';

const createWindow = (): void => {
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: false,
      // contextIsolation: true,
    },
  });

  win.loadFile('./index.html');

  win.webContents.openDevTools();
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
