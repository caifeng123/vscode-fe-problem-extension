import * as path from 'path';
import * as dayjs from 'dayjs';
import {IProblem} from '../type';

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
 * @returns 问题列表的 label显示
 */
export const getDescription = ({level = 0, updateAt = undefined}) =>
    ` ${dayjs(
        updateAt
    ).format('YYYY-MM-DD')} ${getLevel(level)}`;

export const sub = (str: string, n: number) => {
    let r = /[^\x00-\xff]/g;
    if (str.replace(r, 'mm').length <= n) {
        return str;
    }
    let left = n >> 1;
    let right = str.length;
    while (left < right) {
        const mid = (left + right) >> 1;
        const temp = str.substring(0, mid).replace(r, 'mm').length;
        if (temp === n || temp === n - 1) {
            return str.substring(0, mid) + `${temp === n - 1 ? '  ' : ''}...`;
        }
        else if (temp < n) {
            left = mid + 1;
        }
        else if (temp > n) {
            right = mid;
        }
    }
};

/**
 * 获取绝对路径
 * @param workspaceFoldPath workspaceFold路径
 * @param problem 问题
 * @returns 文件绝对路径
 */
export const getFilePath = (workspaceFoldPath: string, {title, tagName}) => {
    return path.join(workspaceFoldPath, tagName, `${title}.md`);
};