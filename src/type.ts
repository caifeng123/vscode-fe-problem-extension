import * as vscode from 'vscode';
import {apiMap} from './constant';

export interface IQuickItemEx<T> extends vscode.QuickPickItem {
    value: T;
}

export type ValueOf<T> = T[keyof T];

export type IProblem = {
    createAt: string;
    exerciseKey: string;
    explanation: string;
    id: number;
    level: number;
    title: string;
    updateAt: string;
    tagName: string;
    options?: string;
    desc?: string;
};

export type ApiType = keyof typeof apiMap;

export type ListItemType = {
    exerciseCount: number;
    tagName: string;
};

export type TreeListType = 'todo' | 'solved';
