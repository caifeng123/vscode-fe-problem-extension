import * as vscode from 'vscode';
import {api} from '../api';
import {ApiType} from '../constant';
import {getDescription} from '../utils/utils';

export class TagItem extends vscode.TreeItem {
    constructor(
        readonly props: Record<string, any>,
        readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(props.tagName, collapsibleState);
        const {id, tagName, exerciseCount} = props;

        this.tooltip = `${tagName}-${exerciseCount}题`;
        this.description = `${tagName}-${exerciseCount}题`;
        this.id = id;
    }

}

export class ListItem extends vscode.TreeItem {
    constructor(
        readonly props: Record<string, any>,
        readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(props.tagName, collapsibleState);
        this.tooltip = props.title;
        this.description = getDescription(props);
        this.command = {
            title: 'Preview Problem',
            command: 'feProblem.previewProblem',
            arguments: [props.exerciseKey],
        };
    }
}

const ItemMap = {
    tag: TagItem,
    list: ListItem,
    // detail: undefined,
};

type ValueOf<T> = T[keyof T];

type Provider = ValueOf<typeof ItemMap>;

export class TreeNode
implements vscode.TreeDataProvider<Provider> {
    private readonly _onDidChangeTreeData: vscode.EventEmitter<
	Provider | undefined | void
    > = new vscode.EventEmitter<ValueOf<typeof ItemMap> | undefined | void>();
    readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: ValueOf<typeof ItemMap>): vscode.TreeItem {
        return element as vscode.TreeItem;
    }
    // resolveTreeItem(
    //     item: vscode.TreeItem,
    //     element: ValueOf<typeof ItemMap>,
    //     token: vscode.CancellationToken
    // ): vscode.ProviderResult<vscode.TreeItem & any> {
    //     console.log(item);
    // }
    getChildren(element?): Thenable<Array<ValueOf<typeof ItemMap>>> {
        if (element) {
            return Promise.resolve(
                this.mockdata(
                    'list',
                    {tagId: element.id},
                    vscode.TreeItemCollapsibleState.None
                )
            );
        }
        return Promise.resolve(
            this.mockdata('tag', {}, vscode.TreeItemCollapsibleState.Collapsed)
        );

    }

    private readonly mockdata = async (
        type: ApiType,
        params,
        collapsibleState: vscode.TreeItemCollapsibleState
    ) => {
        const {data} = await api.fetch(type, params);
        return data.list.map(props => new ItemMap[type](props, collapsibleState));
    };
}

export const treeViewProvider = new TreeNode();
