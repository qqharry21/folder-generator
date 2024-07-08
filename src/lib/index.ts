import * as fs from 'fs';
import * as path from 'path';
import { showMessage } from './utils';

export async function createFoldersAndFiles(basePath: string, structure: any) {
  for (const key in structure) {
    const itemPath = path.join(basePath, key);
    const target = structure[key];

    if (typeof target === 'object' && target !== null) {
      if (fs.existsSync(itemPath)) {
        const itemStats = fs.statSync(itemPath);
        if (itemStats.isDirectory()) {
          await createFoldersAndFiles(itemPath, target);
        } else {
          const ans = await showMessage(
            'warning',
            `File ${itemPath} already exists and is a file. Do you want to overwrite it?`,
            'Overwrite',
            'Ignore'
          );
          if (ans === 'Overwrite') {
            fs.writeFileSync(itemPath, '');
            await createFoldersAndFiles(itemPath, target);
          }
        }
      } else {
        fs.mkdirSync(itemPath);
        await createFoldersAndFiles(itemPath, target);
      }
    } else if (typeof target === 'string') {
      if (fs.existsSync(itemPath)) {
        const ans = await showMessage(
          'warning',
          `File ${itemPath} already exists. Do you want to overwrite it?`,
          'Yes',
          'No'
        );
        if (ans === 'Yes') fs.writeFileSync(itemPath, target);
      } else {
        fs.writeFileSync(itemPath, target);
      }
    }
  }
}

export function getAllFolders(rootPath: string): { label: string; description?: string }[] {
  const folders: { label: string; description?: string }[] = [];
  function findFolders(folderPath: string, relativePath: string) {
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const fileRelativePath = path.join(relativePath, file);
      if (fs.statSync(filePath).isDirectory()) {
        folders.push({ label: `/${fileRelativePath}` });
        findFolders(filePath, fileRelativePath);
      }
    }
  }
  findFolders(rootPath, '');
  return folders;
}
