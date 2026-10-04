const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  openFolder: () => ipcRenderer.invoke("dialog:openFolder"),
  readDirectory: (folderPath) =>
    ipcRenderer.invoke("fs:readDirectory", folderPath),
  readFile: (filePath) =>
    ipcRenderer.invoke("fs:readFile", filePath),
});