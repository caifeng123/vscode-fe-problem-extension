import * as vscode from 'vscode';
import * as os from 'os';
import * as path from 'path';
import {IQuickItemEx} from '../type';
import {WorkspaceUtil} from './workspaceUtils';


// export const selectWorkspaceFolder = async (): Promise<string> => {
//     let workspaceFolderSetting: string = getWorkspaceFolder();
//     if (workspaceFolderSetting.trim() === '') {
//         workspaceFolderSetting = await determineLeetCodeFolder();
//         if (workspaceFolderSetting === '') {
//             // User cancelled
//             return workspaceFolderSetting;
//         }
//     }
// let needAsk: boolean = true;
// await fse.ensureDir(workspaceFolderSetting);
// for (const folder of vscode.workspace.workspaceFolders || []) {
//     if (isSubFolder(folder.uri.fsPath, workspaceFolderSetting)) {
//         needAsk = false;
//     }
// }

// if (needAsk) {
//     const choice: string | undefined = await vscode.window.showQuickPick(
//         [
//             OpenOption.justOpenFile,
//             OpenOption.openInCurrentWindow,
//             OpenOption.openInNewWindow,
//             OpenOption.addToWorkspace,
//         ],
//         {placeHolder: 'The LeetCode workspace folder is not opened in VS Code, would you like to open it?'},
//     );

//     // Todo: generate file first
//     switch (choice) {
//         case OpenOption.justOpenFile:
//             return workspaceFolderSetting;
//         case OpenOption.openInCurrentWindow:
//             await vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(workspaceFolderSetting), false);
//             return '';
//         case OpenOption.openInNewWindow:
//             await vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(workspaceFolderSetting), true);
//             return '';
//         case OpenOption.addToWorkspace:
//             vscode.workspace.updateWorkspaceFolders(vscode.workspace.workspaceFolders?.length ?? 0, 0, {uri: vscode.Uri.file(workspaceFolderSetting)});
//             break;
//         default:
//             return '';
//     }
// }

// return wsl.useWsl() ? wsl.toWslPath(workspaceFolderSetting) : workspaceFolderSetting;
// };


export class WorkspaceFolderSelect {
    workspaceUtil: WorkspaceUtil;
    constructor() {
        this.workspaceUtil = new WorkspaceUtil();
    }

    /**
     * 选择工作区文件夹，假如已有则直接返回
     */
    selectWorkspaceFolder = async (): Promise<string> => {
        let workspaceFolderSetting: string = this.workspaceUtil.getWorkspaceFolder();
        if (workspaceFolderSetting.trim() === '') {
            workspaceFolderSetting = await this.determineLeetCodeFolder();
        }
        return workspaceFolderSetting;
    };

    private readonly showDirectorySelectDialog = async (fsPath?: string): Promise<vscode.Uri[] | undefined> => {
        const defaultUri: vscode.Uri | undefined = this.getBelongingWorkspaceFolderUri(fsPath);
        const options: vscode.OpenDialogOptions = {
            defaultUri,
            canSelectFiles: false,
            canSelectFolders: true,
            canSelectMany: false,
            openLabel: 'Select',
        };
        return await vscode.window.showOpenDialog(options);
    };

    private readonly getBelongingWorkspaceFolderUri = (fsPath: string | undefined): vscode.Uri | undefined => {
        let defaultUri: vscode.Uri | undefined = null;
        if (fsPath) {
            const workspaceFolder: vscode.WorkspaceFolder | undefined
            = vscode.workspace.getWorkspaceFolder(vscode.Uri.file(fsPath));
            if (workspaceFolder) {
                defaultUri = workspaceFolder.uri;
            }
        }
        return defaultUri;
    };

    private readonly determineLeetCodeFolder = async (): Promise<string> => {
        let result = '';
        const picks: Array<IQuickItemEx<string>> = [];
        picks.push(
            {
                label: 'Default location',
                detail: `${path.join(os.homedir(), 'feProblem')}`,
                value: `${path.join(os.homedir(), 'feProblem')}`,
            },
            {
                label: '$(file-directory) Browse...',
                value: ':browse',
            },
        );
        const choice: IQuickItemEx<string> | undefined = await vscode.window.showQuickPick(
            picks,
            {placeHolder: 'Select where you would like to save your LeetCode files'},
        );
        if (!choice) {
            result = '';
        }
        else if (choice.value === ':browse') {
            const directory: vscode.Uri[] | undefined = await this.showDirectorySelectDialog();
            if (!directory || directory.length < 1) {
                result = '';
            }
            else {
                result = directory[0].fsPath;
            }
        }
        else {
            result = choice.value;
        }

        this.workspaceUtil.config.update('workspaceFolder', result, vscode.ConfigurationTarget.Global);

        return result;
    };
}
