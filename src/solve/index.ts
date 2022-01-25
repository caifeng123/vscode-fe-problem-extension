import {IProblem} from './../type';
import {TreeNode} from '../tree/TreeNode';
import {WorkspaceUtil} from '../utils/workspaceUtils';
import {getFilePath} from '../utils/utils';

export class SolveProvider {
    todoTreeview: TreeNode;
    solvedTreeview: TreeNode;
    private workspaceUtil: WorkspaceUtil;

    static builder = async () => {
        const [
            todoTreeview,
            solvedTreeview
        ] = await Promise.all([TreeNode.builder('solved'), TreeNode.builder('todo')]);
        const solveProvider = new SolveProvider();
        solveProvider.workspaceUtil = new WorkspaceUtil();
        solveProvider.todoTreeview = todoTreeview;
        solveProvider.solvedTreeview = solvedTreeview;
        return solveProvider;
    };

    addSolved = (problem: IProblem) => {
        const {id, tagName} = problem;
        const workspaceFoldPath = this.workspaceUtil.get('workspaceFolder', '');
        const finalPath = getFilePath(workspaceFoldPath, problem);
        this.workspaceUtil.set(`fileMap.${tagName}.${id}`, finalPath);
        this.refreash();
    };

    removeSolved = (problem: IProblem) => {
        const {id, tagName} = problem;
        const tagMap = this.workspaceUtil.get(`fileMap.${tagName}`, {});
        delete tagMap[id];
        this.workspaceUtil.set(`fileMap.${tagName}`, tagMap);
        this.refreash();
    };

    private readonly refreash = () => {
        this.todoTreeview.refresh();
        this.solvedTreeview.refresh();
    };
}
