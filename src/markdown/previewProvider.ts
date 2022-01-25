import {IProblem} from './../type';
// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import {commands, ViewColumn} from 'vscode';
import {IWebviewOption, Webview} from './webview';
import {markdownEngine} from './engine';
import {api} from '../api';
import {markdownCss} from './css';

const codeButton: {element: string, script: string, style: string} = {
    element: '<button id="solve">Code Now</button>',
    script: `const codeButton = document.getElementById('solve');
            codeButton.onclick = () => vscode.postMessage({
                command: 'feProblem.codeNow'
            });`,
    style: `<style>
        #solve {
            position: fixed;
            bottom: 1rem;
            right: 1rem;
            border: 0;
            margin: 1rem 0;
            padding: 0.2rem 1rem;
            color: white;
            background-color: var(--vscode-button-background);
        }
        #solve:hover {
            background-color: var(--vscode-button-hoverBackground);
        }
        #solve:active {
            border: 0;
        }
        </style>`,
};

const ansButton: {element: string, script: string, style: string} = {
    element: '<button id="showAns">查看答案</button>',
    script: `const ansButton = document.querySelector('#showAns')
            ansButton.onclick = () => {
                document.querySelector('#answer').style.display = "block"
                ansButton.style.display = "none"
            };
            `,
    style: `<style>
        #showAns {
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
        #showAns:hover {
            background-color: var(--vscode-button-hoverBackground);
        }
        #showAns:active {
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
                    ${ansButton.style}
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
                ${ansButton.element}
                <div id="answer">
                    <h1>答案</h1>
                    ${markdownEngine.render(this.problem.explanation)}
                <hr />
                </div>
                ${codeButton.element}
                <script>
                    const vscode = acquireVsCodeApi();
                    ${codeButton.script}
                    ${ansButton.script}
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
