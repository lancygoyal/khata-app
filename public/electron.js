const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 960,
    height: 720,
    webPreferences: {
      nodeIntegration: true, // <--- flag
      nodeIntegrationInWorker: true // <---  for web workers
    }
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS
    } = require("electron-devtools-installer");
    // Open the DevTools.
    // BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');

    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log("An error occurred: ", err));

    installExtension(REDUX_DEVTOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log("An error occurred: ", err));

    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", () => (mainWindow = null));
}

function generateMenu() {
  const template = [
    {
      label: "App",
      submenu: [
        { role: "about", label: "Info" },
        { role: "quit", label: "Exit" }
      ]
    },
    {
      label: "Dev",
      submenu: [
        { role: "reload" },
        { role: "forcereload" },
        { role: "toggledevtools" }
      ]
    },
    {
      role: "window",
      submenu: [{ role: "minimize" }, { role: "close" }]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.on("ready", () => {
  createWindow();
  generateMenu();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
