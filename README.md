# folder-generator

Inspired by advanced-new-file plugin, this plugin allows users to create folder and file structures based on a JSON input. This extension provides an interactive way to quickly scaffold projects.

## Features

- **Generate Nested Folder Structures**: Create complex folder structures from a simple JSON input.
- **Create Files with Specified Content**: Automatically generate files with predefined content.
- **Handle Existing Files and Folders**: Prompt users to overwrite or ignore existing files and folders.

## Usage

1. Open the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac).

2. Type `Generate Folders and Files` and select the command.

3. Select the folder from the quick pick list. You can choose the current file path, the workspace root, or any subfolder within the workspace.

4. Enter the folder structure in JSON format when prompted. For example:

   ```json
   {
     "src": {
       "components": {
         "Button": {
           "button.ts": "import React from 'react';\n\nconst Button = () => <button>Click me</button>;\n\nexport default Button;"
         }
       },
       "styles": {},
       "utils": {}
     },
     "public": {
       "images": {},
       "fonts": {}
     },
     "test": {
       "unit": {},
       "integration": {}
     },
     "docs": {}
   }
   ```

5. The extension will create the specified folder structure and files in the selected root folder.

## Keybindings

This extension can also be activated using the following keybindings:

- **macOS**: `Cmd+K Cmd+G`
- **Windows/Linux**: `Ctrl+K Ctrl+G`

To add these keybindings, update your `package.json` file in the extension project:

```json
"contributes": {
  "commands": [
    {
      "command": "folder-generator.generateFolders",
      "title": "Generate Folders and Files"
    }
  ],
  "keybindings": [
    {
      "command": "folder-generator.generateFolders",
      "key": "cmd+k cmd+g",
      "mac": "cmd+k cmd+g",
      "win": "ctrl+k ctrl+g"
    },
    {
      "key": "escape",
      "command": "workbench.action.closePanel",
      "when": "panelFocus"
    }
  ]
}
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

1. Clone the repo, install the dependencies. Running the following command `pnpm install`

2. Add your feature or fix (in src/) with test coverage (in test/)

3. Launch the extension and do some manual QA (via Debug > Launch Extension)

4. Run the tests (via Debug > Launch Tests)

5. Run the linter: `pnpm run lint`

6. Open a PR

**Enjoy!**
