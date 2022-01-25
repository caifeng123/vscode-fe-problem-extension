import * as _ from 'lodash';
import {api} from '../api';
import {ApiType, ListItemType, TreeListType, IProblem} from '../type';
import {WorkspaceUtil} from '../utils/workspaceUtils';

export class TreeNodeApi {
    isInit: boolean = false;
    private workspaceUtil: WorkspaceUtil;
    private treeList: {
        todo: ListItemType[];
        solved: ListItemType[];
    } = {todo: [], solved: []};

    getTreeList = (treeType: TreeListType) => this.treeList[treeType];

    getSubTreeList = async (treeType: TreeListType, tagId: number, tagName: string) => {
        const list: IProblem[] = await this.mockdata('list', {tagId});
        const tagMap = this.workspaceUtil.get<Record<string, any>>('fileMap', {});

        return list.reduce((all, item) => {
            // 同时为solved且在map中，或不为solved且不在map中，符合同或 =》^异或取反
            if (!(+(treeType === 'solved') ^ +!!(tagMap[tagName]?.[item.exerciseKey]))) {
                all.push({...item, tagName});
            }
            return all;
        }, []);
    };

    init = async () => {
        const list = await this.mockdata('tag', {});
        this.workspaceUtil = new WorkspaceUtil();
        const fileMap = this.workspaceUtil.get<Record<string, any>>('fileMap', {});
        this.treeList.solved = _.map(fileMap, (value, tagName) => ({
            tagName,
            exerciseCount: Object.keys(value ?? {}).length
        }));

        this.treeList.todo = list.map(item => ({
            ...item,
            exerciseCount: item.exerciseCount - Object.keys(fileMap?.[item.tagName] ?? {}).length
        }));
        this.isInit = true;
    };

    private readonly mockdata = async (
        type: ApiType,
        params
    ) => {
        const {data} = await api.fetch(type, params);
        return data.list;
    };
}

export const treeNodeApi = new TreeNodeApi();
