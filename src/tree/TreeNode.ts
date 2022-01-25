import * as _ from 'lodash';
import * as vscode from 'vscode';
import {api} from '../api';
import {ValueOf, ApiType, ListItemType, TreeListType} from '../type';
import {getLevel, sub} from '../utils/utils';
import {treeNodeApi, TreeNodeApi} from './TreeNodeData';


export class TagItem extends vscode.TreeItem {
    constructor(
        readonly props: Record<string, any>,
        readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(props.tagName, collapsibleState);
        const {tagName, exerciseCount} = props;

        this.tooltip = `${tagName}-${exerciseCount}题`;
        this.description = `${tagName}-${exerciseCount}题`;
    }
}

export class ListItem extends vscode.TreeItem {
    contextValue = 'problem';
    constructor(
        readonly props: Record<string, any>,
        readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(sub(props.title, 15), collapsibleState);
        const {title, exerciseKey, tagName, level} = props;
        this.tooltip = title;
        this.description = getLevel(level);

        this.command = {
            title: 'Preview Problem',
            command: 'feProblem.previewProblem',
            arguments: [{exerciseKey, tagName}],
        };
    }
}

export const ItemMap = {
    tag: TagItem,
    list: ListItem,
    // detail: undefined,
};

export type Provider = ValueOf<typeof ItemMap>;

export class TreeNode
implements vscode.TreeDataProvider<Provider> {
    treeNodeApi: TreeNodeApi;
    treeType: TreeListType;
    private readonly _onDidChangeTreeData: vscode.EventEmitter<
    Provider | undefined | void
    > = new vscode.EventEmitter<Provider | undefined | void>();
    readonly onDidChangeTreeData: vscode.Event<Provider | undefined | void> = this._onDidChangeTreeData.event;

    constructor(treeType: TreeListType) {
        this.treeType = treeType;
    }

    static builder = async (treeType: TreeListType) => {
        const treeNode = new TreeNode(treeType);
        treeNode.treeNodeApi = treeNodeApi;
        if (!treeNodeApi.isInit) {
            await treeNode.treeNodeApi.init();
        }
        return treeNode;
    };

    async refresh(): Promise<void> {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: Provider): vscode.TreeItem {
        return element as vscode.TreeItem;
    }

    getChildren(element?): vscode.ProviderResult<Provider[]> {
        if (element) {
            return this.createTreeItem(
                this.treeNodeApi.getSubTreeList(this.treeType, element.id, element.label),
                'list',
                vscode.TreeItemCollapsibleState.None
            );
        }
        return this.createTreeItem(
            this.treeNodeApi.getTreeList(this.treeType),
            'tag',
            vscode.TreeItemCollapsibleState.Collapsed
        );
    }

    private readonly createTreeItem = async (
        data: ListItemType[] | Promise<ListItemType[]>,
        type: ApiType,
        collapsibleState: vscode.TreeItemCollapsibleState
    ): Promise<Provider[]> => {
        const temp = Promise.resolve(data) === data ? await data : data;
        return (temp as ListItemType[]).map(props => new ItemMap[type](props, collapsibleState));
    };
}
