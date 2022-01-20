import * as dayjs from 'dayjs';

/**
 * 根据题目难度返回星级
 * @param level 题目难度
 * @returns string 星级
 */
export const getLevel = (level: number) => {
    let res = '';
    while (--level >= 0) {
        res += '●';
    }
    if (level === -0.5) {
        res += '◐';
    };
    return res.padEnd(5, '○').slice(0, 5);
};

/**
 * @param title 题目描述
 * @param level 难度星级
 * @param updateAt 更新时间
 * @returns 问题列表的 label显示
 */
export const getDescription = ({title = '', level = 0, updateAt = undefined}) =>
    `${title.slice(0, 10)}${title.length > 10 ? '...' : ''} ${dayjs(
        updateAt
    ).format('YYYY-MM-DD')} ${getLevel(level)}`;

export const getFileName = ({id, name}) => `${id}. ${name}`;