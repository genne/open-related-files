'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from "path";
import * as fs from "fs";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "open-related-files" is now active!');

    context.subscriptions.push(vscode.commands.registerCommand("extension.findComponent", async () => {
        let result = await vscode.commands.executeCommand("workbench.action.quickOpen");
        await vscode.commands.executeCommand("extension.openRelatedFiles");
    }));

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.openRelatedFiles', async () => {
        // The code you place here will be executed every time your command is executed

        var editor = vscode.window.activeTextEditor;
        let currentFilename = editor.document.fileName;
        let filenameBase = currentFilename.slice(0, -path.extname(currentFilename).length + 1);

        let column = 1;

        async function openFile(extension: string) {
            let filename = filenameBase + extension;
            if (fs.existsSync(filename)) {
                let doc = await vscode.workspace.openTextDocument(filename);
                vscode.window.showTextDocument(doc, column, true);
                column++;
            }
        }

        await openFile("ts");
        await openFile("html");
        await openFile("scss");

    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}