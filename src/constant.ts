const vid = 7;
const defaultListParams = {
    vid,
    pageNum: 1,
    pageSize: 9999,
    orderBy: 'updateTime',
    order: 'desc',
};

const defaultDetailParams = {
    vid,
    order: 'desc',
    orderBy: 'updateTime',
};

export const prefix = 'https://fe.ecool.fun/api/';
export const defalutParams = {
    tag: {vid},
    list: defaultListParams,
    detail: defaultDetailParams,
};
export const apiMap = {
    list: 'exercise/list',
    tag: 'tag/list',
    detail: 'exercise/practice/detail',
};
