import * as vscode from 'vscode';
import axios from 'axios';
import {apiMap, defalutParams, prefix} from '../constant';
import {ApiType} from '../type';

class Api {
    fetch = async (type: ApiType, params: any = {}) => {
        try {
            const {data} = await axios.get(prefix + apiMap[type], {
                params: {
                    ...defalutParams[type],
                    ...params,
                },
            });
            return data;
        }
        catch (error) {
            vscode.window.showErrorMessage('请求出错，请查看网络');
        }
    };
}

export const api = new Api();
