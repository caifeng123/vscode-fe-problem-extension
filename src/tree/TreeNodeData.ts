import * as _ from 'lodash';
import {api} from '../api';
import {ApiType, ListItemType, TreeListType} from '../type';
import {WorkspaceUtil} from '../utils/workspaceUtils';

export class TreeNodeApi {
    isInit: boolean = false;
    private treeList: {
        todo: ListItemType[];
        solved: ListItemType[];
    } = {todo: [], solved: []};

    getTreeList = (status: TreeListType) => this.treeList[status];

    getSubTreeList = async (tagId: number, tagName: string) => {
        const list = await this.mockdata('list', {tagId});
        return list.map(item => ({...item, tagName}));
    };

    init = async () => {
        const list = await this.mockdata('tag', {});

        const fileMap = new WorkspaceUtil().get<Record<string, any>>('fileMap', {});
        this.treeList.solved = _.map(fileMap, (value, tagName) => ({
            tagName,
            exerciseCount: Object.keys(value ?? {}).length
        }));
        this.treeList.todo = list.map(item => ({
            ...item,
            exerciseCount: item.exerciseCount - Object.keys(fileMap?.[item.id] ?? {}).length
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

// {
//     fileMap: {
//         [tagName]: {
//             [id]: path
//         }

//     }
// }