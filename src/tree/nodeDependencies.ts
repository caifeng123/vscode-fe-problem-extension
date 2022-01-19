import * as vscode from "vscode";
import * as path from "path";
import * as dayjs from "dayjs";
import {api} from "../api";
import {ApiType, defalutParams} from "../constant";

const getLevel = (level: number) => {
	let res = "";
	while (level-- > 0) {
		res += "★";
	}
	return res.padEnd(5, "☆");
};

const getDescription = ({title = "", level = 0, updateAt = undefined}) =>
	`${title.slice(0, 10)}${title.length > 10 ? "..." : ""} ${dayjs(
		updateAt
	).format("YYYY-MM-DD")} ${getLevel(level)}`;

export class TagItem extends vscode.TreeItem {
	id: string;
	constructor(
		public readonly props: Record<string, any>,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState
	) {
		super(props.tagName, collapsibleState);
		const {id, tagName, exerciseCount} = props;

		this.tooltip = `${tagName}-${exerciseCount}题`;
		this.description = `${tagName}-${exerciseCount}题`;
		this.id = id;
	}
	iconPath = {
		light: path.join(
			__filename,
			"..",
			"..",
			"resources",
			"light",
			"dependency.svg"
		),
		dark: path.join(
			__filename,
			"..",
			"..",
			"resources",
			"dark",
			"dependency.svg"
		),
	};

	contextValue = "dependency";
}

export class ListItem extends vscode.TreeItem {
	constructor(
		public readonly props: Record<string, any>,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState
	) {
		super(props.tagName, collapsibleState);
		this.tooltip = props.title;
		this.description = getDescription(props);
		this.command = {
			title: "Preview Problem",
			command: "fe-problem.previewProblem",
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

export class DepNodeProvider
	implements vscode.TreeDataProvider<ValueOf<typeof ItemMap>>
{
	private _onDidChangeTreeData: vscode.EventEmitter<
		ValueOf<typeof ItemMap> | undefined | void
	> = new vscode.EventEmitter<ValueOf<typeof ItemMap> | undefined | void>();
	readonly onDidChangeTreeData: vscode.Event<
		ValueOf<typeof ItemMap> | undefined | void
	> = this._onDidChangeTreeData.event;

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: ValueOf<typeof ItemMap>): vscode.TreeItem {
		return element as vscode.TreeItem;
	}
	// resolveTreeItem(
	// 	item: vscode.TreeItem,
	// 	element: ValueOf<typeof ItemMap>,
	// 	token: vscode.CancellationToken
	// ): vscode.ProviderResult<vscode.TreeItem & any> {
	// 	console.log(item);
	// }
	getChildren(element?): Thenable<ValueOf<typeof ItemMap>[]> {
		if (element) {
			return Promise.resolve(
				this.mockdata(
					"list",
					{tagId: element.id},
					vscode.TreeItemCollapsibleState.None
				)
			);
		} else {
			return Promise.resolve(
				this.mockdata("tag", {}, vscode.TreeItemCollapsibleState.Collapsed)
			);
		}
	}

	private mockdata = async (
		type: ApiType,
		params,
		collapsibleState: vscode.TreeItemCollapsibleState
	) => {
		const {data} = await api.fetch(type, params);
		return data.list.map((props) => new ItemMap[type](props, collapsibleState));
	};
}

export const depNodeProvider = new DepNodeProvider();
