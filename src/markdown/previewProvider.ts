// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import {commands, ViewColumn} from 'vscode';
import {IWebviewOption, Webview} from './webview';
import {markdownEngine} from './engine';
import {IProblem} from './../type';
import {api} from '../api';
import {markdownCss} from './css';
import {noteProvider} from '../note';

const codeButton: {element: string, script: string, style: string} = {
    element: '<button id="solve">note now</button>',
    script: `const codeButton = document.getElementById('solve');
            codeButton.onclick = () => vscode.postMessage({
                command: 'feProblem.codeNow'
            });`,
    style: `<style>
        #solve {
            width: 200px;
            margin: 40px auto 20px;
            display: block;
            color: #fff;
            border-color: #1890ff;
            height: 40px;
            padding: 6.4px 15px;
            font-size: 16px;
            border-radius: 2px;
            border: 1px solid #d9d9d9;
            background: #1890ff;
            text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
            box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
        }
        #solve:hover {
            background-color: var(--vscode-button-hoverBackground);
        }
        #solve:active {
            border: 0;
        }
        </style>`,
};

class PreviewProvider extends Webview {
    private problem: IProblem;

    async getDetail({exerciseKey, tagName}: Record<string, string>): Promise<void> {
        const {data} = await api.fetch('detail', {exerciseKey});
        this.problem = {...data, tagName};
        this.showWebviewInternal();
        noteProvider.showInitNote(this.problem);
    }

    protected getWebviewOption = (): IWebviewOption => ({
        title: `${this.problem.title}: Preview`,
        viewColumn: ViewColumn.One,
    });

    protected getWebviewContent(): string {
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta 
                    http-equiv="Content-Security-Policy" 
                    content="default-src 'none'; img-src https:; 
                    script-src vscode-resource: 'unsafe-inline'; style-src vscode-resource: 'unsafe-inline';"/>
                    ${codeButton.style}
                <style>
                    ${markdownCss}
                    code { white-space: pre-wrap; }
                    #answer {display: none;}
                </style>
            </head>
            <body>
                <h1>问题</h1>
                <h2>${this.problem.title}</h2>
                ${markdownEngine.render(this.problem.desc)}
                <hr />
                </div>
                ${codeButton.element}
                <script>
                    const vscode = acquireVsCodeApi();
                    ${codeButton.script}
                </script>
            </body>
            </html>
        `;
    }

    protected onDidDisposeWebview(): void {
        super.onDidDisposeWebview();
    }

    protected async onDidReceiveMessage(message: IWebViewMessage): Promise<void> {
        switch (message.command) {
            case 'feProblem.codeNow': {
                await commands.executeCommand('feProblem.codeNow', this.problem);
                break;
            }
        }
    }
}

interface IWebViewMessage {
    command: string;
}

export const previewProvider: PreviewProvider = new PreviewProvider();
