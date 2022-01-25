import * as vscode from 'vscode';
import {SolveProvider} from './solve';
import {noteProvider} from './note/index';
import {previewProvider} from './markdown/previewProvider';

export async function activate(context: vscode.ExtensionContext) {

    const solveProvider = await SolveProvider.builder();

    context.subscriptions.push(
        vscode.window.registerTreeDataProvider('todoTreeview', solveProvider.todoTreeview),
        vscode.window.registerTreeDataProvider('solvedTreeview', solveProvider.solvedTreeview),
        vscode.commands.registerCommand(
            'feProblem.previewProblem',
            props => previewProvider.getDetail(props)
        ),
        vscode.commands.registerCommand(
            'feProblem.codeNow',
            props => noteProvider.openNote(props)
        ),
        vscode.commands.registerCommand('leetcode.addSolved', props => solveProvider.addSolved(props)),
        vscode.commands.registerCommand('leetcode.removeSolved', props => solveProvider.removeSolved(props)),
    );
}
