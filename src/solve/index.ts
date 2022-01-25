import * as vscode from 'vscode';
import * as _ from 'lodash';
import {TreeNode} from '../tree/TreeNode';
import {WorkspaceUtil} from '../utils/workspaceUtils';
import {getFilePath} from '../utils/utils';
import {treeNodeApi} from '../tree/TreeNodeData';

export class SolveProvider {
    todoTreeview: TreeNode;
    solvedTreeview: TreeNode;
    private workspaceUtil: WorkspaceUtil;

    static builder = async () => {
        const [
            todoTreeview,
            solvedTreeview
        ] = await Promise.all([TreeNode.builder('todo'), TreeNode.builder('solved')]);
        const solveProvider = new SolveProvider();
        solveProvider.workspaceUtil = new WorkspaceUtil();
        solveProvider.todoTreeview = todoTreeview;
        solveProvider.solvedTreeview = solvedTreeview;
        return solveProvider;
    };

    addSolved = problem => {
        const {exerciseKey, tagName, title} = problem.props;
        const workspaceFoldPath = this.workspaceUtil.get('workspaceFolder', '');
        const finalPath = getFilePath(workspaceFoldPath, {tagName, title});
        const fileMap = this.workspaceUtil.get('fileMap', {});

        if (fileMap[tagName]) {
            fileMap[tagName][exerciseKey] = finalPath;
        }
        else {
            fileMap[tagName] = {[exerciseKey]: finalPath};
        }
        this.workspaceUtil.set('fileMap', fileMap, vscode.ConfigurationTarget.Global);

        this.refreash();
    };

    removeSolved = problem => {
        const {tagName, exerciseKey} = problem.props;
        const fileMap = this.workspaceUtil.get('fileMap', {});
        const temp = _.clone(fileMap[tagName]);
        delete temp[exerciseKey];
        fileMap[tagName] = temp;
        this.workspaceUtil.set('fileMap', fileMap, vscode.ConfigurationTarget.Global);
        this.refreash();
    };

    refreash = async () => {
        await treeNodeApi.init();
        this.todoTreeview.refresh();
        this.solvedTreeview.refresh();
    };
}
