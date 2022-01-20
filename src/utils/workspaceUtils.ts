import {workspace, WorkspaceConfiguration} from 'vscode';

export interface IDescriptionConfiguration {
    showInComment: boolean;
    showInWebview: boolean;
}

export class WorkspaceUtil {
    config: WorkspaceConfiguration;
    constructor() {
        this.config = workspace.getConfiguration('feProblem');
    }
    shouldHideSolvedProblem = () => this.config.get<boolean>('hideSolved', false);
    getWorkspaceFolder = () => this.config.get<string>('workspaceFolder', '');
}
