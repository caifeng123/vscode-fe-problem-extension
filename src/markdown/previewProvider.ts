// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import {commands, ViewColumn} from "vscode";
import {IWebviewOption, Webview} from "./webview";
import {markdownEngine} from "./engine";
import {api} from "../api";
import {markdownCss} from "./css";

type ResponseType = {
	title: string;
	desc: string;
	options: string;
	explanation: string;
	level: number;
	createAt: string;
	updateAt: string;
};

const codeButton: {element: string; script: string; style: string} = {
	element: `<button id="solve">Code Now</button>`,
	script: `const codeButton = document.getElementById('solve');
			codeButton.onclick = () => vscode.postMessage({
				command: 'ShowProblem',
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

const ansButton: {element: string; script: string; style: string} = {
	element: `<button id="showAns">查看答案</button>`,
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
	protected readonly viewType: string = "preview";
	private sideMode = false;
	private info: ResponseType;

	public isSideMode(): boolean {
		return this.sideMode;
	}

	public async getDetail(exerciseKey: string): Promise<void> {
		const data = await api.fetch("detail", {exerciseKey});
		this.show(data.data);
	}

	public show(data: ResponseType, isSideMode = false): void {
		this.info = data;
		this.sideMode = isSideMode;
		this.showWebviewInternal();
		// Comment out this operation since it sometimes may cause the webview become empty.
		// Waiting for the progress of the VS Code side issue: https://github.com/microsoft/vscode/issues/3742
		// if (this.sideMode) {
		//     this.hideSideBar(); // For better view area
		// }
	}

	protected getWebviewOption(): IWebviewOption {
		if (!this.sideMode) {
			return {
				title: `${this.info.title}: Preview`,
				viewColumn: ViewColumn.One,
			};
		} else {
			return {
				title: "Description",
				viewColumn: ViewColumn.Two,
				preserveFocus: true,
			};
		}
	}

	protected getWebviewContent(): string {
		return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src https:; script-src vscode-resource: 'unsafe-inline'; style-src vscode-resource: 'unsafe-inline';"/>
                ${!this.sideMode ? codeButton.style : ""}
				${ansButton.style}
                <style>
					${markdownCss}
                    code { white-space: pre-wrap; }
					#answer {display: none;}
                </style>
            </head>
            <body>
                <h1>问题</h1>
				<h2>${this.info.title}</h2>
                ${markdownEngine.render(this.info.desc)}
				${ansButton.element}
				<div id="answer">
					<h1>答案</h1>
					${markdownEngine.render(this.info.explanation)}
                <hr />
				</div>
                ${!this.sideMode ? codeButton.element : ""}
                <script>
                    const vscode = acquireVsCodeApi();
                    ${!this.sideMode ? codeButton.script : ""}
					${ansButton.script}
                </script>
            </body>
            </html>
        `;
	}

	protected onDidDisposeWebview(): void {
		super.onDidDisposeWebview();
		this.sideMode = false;
	}

	protected async onDidReceiveMessage(message: IWebViewMessage): Promise<void> {
		switch (message.command) {
			case "ShowProblem": {
				await commands.executeCommand("problem.previewProblem", this.info);
				break;
			}
		}
	}
}

interface IWebViewMessage {
	command: string;
}

export const previewProvider: PreviewProvider = new PreviewProvider();
