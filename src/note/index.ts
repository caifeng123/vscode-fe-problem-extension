import {WorkspaceFolderSelect} from '../utils/selectPath';
import * as vscode from 'vscode';
import {getFileName} from '../utils/utils';


class NoteProvider {
    workspaceFolder: WorkspaceFolderSelect;
    config: vscode.WorkspaceConfiguration;
    constructor() {
        this.workspaceFolder = new WorkspaceFolderSelect();
        this.config = this.workspaceFolder.workspaceUtil.config;
    }
    async openNote(node) {
        const workspaceFoldPath = await this.workspaceFolder.selectWorkspaceFolder();
        if (!workspaceFoldPath) {
            return;
        }

        const fileFolder = this.config.get<string>('filePath.folder', '').trim();
        const fileName = getFileName(node);

    }

}

export const noteProvider = new NoteProvider();