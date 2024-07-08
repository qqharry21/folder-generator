import * as vscode from 'vscode';

export const getRootPath = () => {
  return vscode.workspace.workspaceFolders?.[0].uri.fsPath;
};

type MessageType = 'info' | 'warning' | 'error';

export const showMessage = (type: MessageType, message: string, ...items: string[]) => {
  if (type === 'info') {
    return vscode.window.showInformationMessage(message, ...items);
  } else if (type === 'error') {
    return vscode.window.showErrorMessage(message, ...items);
  } else {
    return vscode.window.showWarningMessage(message, ...items);
  }
};
