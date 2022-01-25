import {workspace, WorkspaceConfiguration} from 'vscode';

export interface IDescriptionConfiguration {
    showInComment: boolean;
    showInWebview: boolean;
}

export class WorkspaceUtil {
    config: WorkspaceConfiguration;
    constructor(path?: string) {
        this.config = workspace.getConfiguration(path ?? 'feProblem');
    }
    get = <T>(key: string, defaultValue?: T) => this.config.get<T>(key, defaultValue);
    set = <T>(key: string, value: T) => this.config.update(key, value);
}
