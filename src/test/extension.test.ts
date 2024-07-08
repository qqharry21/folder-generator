import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { createFoldersAndFiles } from '../lib';
import { getRootPath } from '../lib/utils';

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

  test('Folder and file creation with variables', async () => {
    const rootPath = getRootPath();
    assert.ok(rootPath, 'Workspace folder is open');

    const folderStructure = {
      src: {
        components: {
          Button: {
            'Button.ts':
              "import React from 'react';\n\nconst Button = ({ children }) => (\n  <button>{children}</button>\n);\n\nexport default Button;",
          },
        },
        utils: {},
      },
    };

    if (rootPath) {
      createFoldersAndFiles(rootPath, folderStructure);
      const buttonComponentPath = path.join(rootPath, 'src', 'components', 'Button', 'Button.ts');
      assert.ok(fs.existsSync(buttonComponentPath), 'Button.ts file exists');

      const content = fs.readFileSync(buttonComponentPath, 'utf8');
      assert.strictEqual(
        content,
        "import React from 'react';\n\nconst Button = ({ children }) => (\n  <button>{children}</button>\n);\n\nexport default Button;"
      );
    }
  });
});
