import * as vscode from 'vscode';
import * as fse from 'fs-extra';
import {IProblem} from '../type';
import {WorkspaceFolderSelect} from '../utils/selectPath';
import {WorkspaceUtil} from '../utils/workspaceUtils';
import {getFilePath} from '../utils/utils';

export class NoteProvider {
    workspaceFolder: WorkspaceFolderSelect;
    workspaceUtil: WorkspaceUtil;
    constructor() {
        this.workspaceFolder = new WorkspaceFolderSelect();
        this.workspaceUtil = this.workspaceFolder.workspaceUtil;
    }
    /**
     * 点击记录笔记 - 创建文件+打开
     * @param problem 问题
     */
    async openNote(problem?: IProblem) {
        // 初次选择md存储位置，后期直接打开
        const workspaceFoldPath = await this.workspaceFolder.selectWorkspaceFolder();

        if (!workspaceFoldPath) {
            return;
        }

        const finalPath = getFilePath(workspaceFoldPath, problem);

        // 不用判断有没有 没有就创建，有则不动
        await fse.createFile(finalPath);

        vscode.window.showTextDocument(
            vscode.Uri.file(finalPath),
            {preview: true, viewColumn: vscode.ViewColumn.Two}
        );
    }

    /**
     * 选中后若之前存在笔记，则打开笔记文件
     * @param problem 问题
     */
    async showInitNote(problem?: IProblem) {
        const workspaceFoldPath = this.workspaceUtil.get('workspaceFolder', '');
        const finalPath = getFilePath(workspaceFoldPath, problem);

        const exists = await fse.pathExists(finalPath);
        if (exists) {
            vscode.window.showTextDocument(
                vscode.Uri.file(finalPath),
                {preview: true, viewColumn: vscode.ViewColumn.Two}
            );
        }
    }
}

export const noteProvider = new NoteProvider();
