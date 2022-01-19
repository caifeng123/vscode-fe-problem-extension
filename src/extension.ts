'use strict';

import * as vscode from 'vscode';

import {treeViewProvider} from './tree/TreeNode';
import {JsonOutlineProvider} from './jsonOutline';
import {FtpExplorer} from './ftpExplorer';
import {FileExplorer} from './fileExplorer';
import {TestViewDragAndDrop} from './testViewDragAndDrop';
import {TestView} from './testView';
import {previewProvider} from './markdown/previewProvider';

export function activate(context: vscode.ExtensionContext) {
    // Samples of `window.registerTreeDataProvider`

    context.subscriptions.push(
        previewProvider,
        vscode.window.registerTreeDataProvider('todoTreeview', treeViewProvider),
        vscode.commands.registerCommand(
            'fe-problem.previewProblem',
            exerciseKey => previewProvider.getDetail(exerciseKey)
        )
    );
    // vscode.commands.registerCommand("nodeDependencies.refreshEntry", () =>
    //     nodeDependenciesProvider.refresh()
    // );
    // vscode.commands.registerCommand("extension.openPackageOnNpm", (moduleName) =>
    //     vscode.commands.executeCommand(
    //         "vscode.open",
    //         vscode.Uri.parse(`https://www.npmjs.com/package/${moduleName}`)
    //     )
    // );
    // vscode.commands.registerCommand("nodeDependencies.addEntry", () =>
    //     vscode.window.showInformationMessage(`Successfully called add entry.`)
    // );
    // vscode.commands.registerCommand(
    //     "nodeDependencies.editEntry",
    //     (node: Dependency) =>
    //         vscode.window.showInformationMessage(
    //             `Successfully called edit entry on ${node.label}.`
    //         )
    // );
    // vscode.commands.registerCommand(
    //     "nodeDependencies.deleteEntry",
    //     (node: Dependency) =>
    //         vscode.window.showInformationMessage(
    //             `Successfully called delete entry on ${node.label}.`
    //         )
    // );

    // const jsonOutlineProvider = new JsonOutlineProvider(context);
    // vscode.window.registerTreeDataProvider("jsonOutline", jsonOutlineProvider);
    // vscode.commands.registerCommand("jsonOutline.refresh", () =>
    //     jsonOutlineProvider.refresh()
    // );
    // vscode.commands.registerCommand("jsonOutline.refreshNode", (offset) =>
    //     jsonOutlineProvider.refresh(offset)
    // );
    // vscode.commands.registerCommand("jsonOutline.renameNode", (offset) =>
    //     jsonOutlineProvider.rename(offset)
    // );
    // vscode.commands.registerCommand("extension.openJsonSelection", (range) =>
    //     jsonOutlineProvider.select(range)
    // );

    // Samples of `window.createView`
    // new FtpExplorer(context);
    // new FileExplorer(context);

    // Test View
    // new TestView(context);

    // // Drag and Drop proposed API sample
    // // This check is for older versions of VS Code that don't have the most up-to-date tree drag and drop API proposal.
    // if (typeof vscode.TreeDataTransferItem === "function") {
    //     new TestViewDragAndDrop(context);
    // }
}
