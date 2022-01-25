import {ConfigurationTarget, workspace, WorkspaceConfiguration} from 'vscode';

export interface IDescriptionConfiguration {
    showInComment: boolean;
    showInWebview: boolean;
}

export class WorkspaceUtil {
    path: string;
    constructor(path?: string) {
        this.path = path ?? 'feProblem';
    }
    get = <T>(key: string, defaultValue?: T) => workspace.getConfiguration(this.path).get<T>(key, defaultValue);
    set = <T>(key: string, value: T, configurationTarget?: boolean | ConfigurationTarget) =>
        workspace.getConfiguration(this.path).update(key, value, configurationTarget);
    has = (key: string) => workspace.getConfiguration(this.path).has(key);
}
