import path from 'path';
import * as vscode from 'vscode';
import { createFoldersAndFiles, getAllFolders } from './lib';
import { showMessage } from './lib/utils';

const IGNORE_LIST = [
  '.git',
  'node_modules',
  '.vscode',
  'dist',
  'build',
  'out',
  'coverage',
  'tmp',
  'temp',
  '.idea',
  'logs',
  '.DS_Store',
  '__pycache__',
  '.venv',
  '.history',
  '.cache',
  '.next',
  '.nuxt',
];

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('folder-generator.generateFolders', async () => {
    const rootPath = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
    if (!rootPath) {
      vscode.window.showErrorMessage('No workspace folder is open');
      return;
    }

    const editor = vscode.window.activeTextEditor;
    const currentFilePath = editor ? path.dirname(editor.document.uri.fsPath) : rootPath;
    const relativeCurrentPath = path.relative(rootPath, currentFilePath) || '.';

    const folderOptions = getAllFolders(rootPath, IGNORE_LIST);
    folderOptions.unshift({
      label: '/',
      description: 'workspace root',
    });
    if (relativeCurrentPath !== '.') {
      folderOptions.unshift({
        label: `/${relativeCurrentPath}`,
        description: 'current file',
      });
    }

    const selected = await vscode.window.showQuickPick(folderOptions, {
      placeHolder: 'Select a folder or use current/root folder',
    });
    if (!selected) {
      return; // User dismissed the selection
    }
    const selectedFolder =
      selected.label === `/${relativeCurrentPath}`
        ? currentFilePath
        : selected.label === '/'
        ? rootPath
        : path.join(rootPath, selected.label);

    const folderStructure = await vscode.window.showInputBox({
      prompt: 'Enter folder structure (JSON format)',
    });
    if (!folderStructure) {
      return; // User dismissed the input box
    }

    try {
      const structure = JSON.parse(folderStructure);

      await createFoldersAndFiles(selectedFolder, structure);
      showMessage('info', 'Folders and files created successfully!');
    } catch (error) {
      showMessage('error', 'Invalid JSON structure');
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
