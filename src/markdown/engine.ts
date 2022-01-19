// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import * as MarkdownIt from 'markdown-it';
import * as os from 'os';
import * as path from 'path';
import * as vscode from 'vscode';
import hljs from 'highlight.js';

class MarkdownEngine implements vscode.Disposable {
    private engine: MarkdownIt;
    private config: MarkdownConfiguration;
    private readonly listener: vscode.Disposable;

    constructor() {
        this.reload();
        this.listener = vscode.workspace.onDidChangeConfiguration(
            (event: vscode.ConfigurationChangeEvent) => {
                if (event.affectsConfiguration('markdown')) {
                    this.reload();
                }
            },
            this
        );
    }

    get localResourceRoots(): vscode.Uri[] {
        return [vscode.Uri.file(path.join(this.config.extRoot, 'media'))];
    }

    dispose(): void {
        this.listener.dispose();
    }

    reload(): void {
        this.engine = this.initEngine();
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        this.config = new MarkdownConfiguration();
    }

    render(md: string, env?: any): string {
        return md ? this.engine.render(md, env) : '';
    }

    getStyles(): string {
        return [this.getBuiltinStyles(), this.getSettingsStyles()].join(os.EOL);
    }

    private getBuiltinStyles(): string {
        let styles: vscode.Uri[] = [];
        try {
            const stylePaths: string[] = require(path.join(
                this.config.extRoot,
                'package.json'
            )).contributes['markdown.previewStyles'];
            styles = stylePaths.map((p: string) =>
                vscode.Uri.file(path.join(this.config.extRoot, p)).with({
                    scheme: 'vscode-resource',
                })
            );
        }
        catch (error) {
            vscode.window.showErrorMessage(error + '构建失败');
        }
        return styles
            .map(
                (style: vscode.Uri) =>
                    `<link rel="stylesheet" type="text/css" href="${style.toString()}">`
            )
            .join(os.EOL);
    }

    private getSettingsStyles(): string {
        return [
            '<style>',
            'body {',
            `    ${
                this.config.fontFamily ? `font-family: ${this.config.fontFamily};` : ''
            }`,
            `    ${
                isNaN(this.config.fontSize)
                    ? ''
                    : `font-size: ${this.config.fontSize}px;`
            }`,
            `    ${
                isNaN(this.config.lineHeight)
                    ? ''
                    : `line-height: ${this.config.lineHeight};`
            }`,
            '}',
            '</style>',
        ].join(os.EOL);
    }

    private initEngine(): MarkdownIt {
        const md: MarkdownIt = new MarkdownIt({
            linkify: true,
            typographer: true,
            highlight: function (str, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return (
                            '<pre class="hljs"><code>'
                            + hljs.highlight(str, {language: lang}).value
                            + '</code></pre>'
                        );
                    }
                    catch (__) {
                        return str;
                    }
                }

                return (
                    '<pre class="hljs"><code>'
                    + md.utils.escapeHtml(str)
                    + '</code></pre>'
                );
            },
        });

        this.addCodeBlockHighlight(md);
        this.addImageUrlCompletion(md);
        this.addLinkValidator(md);
        return md;
    }

    private addCodeBlockHighlight(md: MarkdownIt): void {
        const codeBlock: any = md.renderer.rules.code_block;
        // tslint:disable-next-line:typedef
        md.renderer.rules.code_block = (tokens, idx, options, env, self) => {
            // if any token uses lang-specified code fence, then do not highlight code block
            if (tokens.some((token: any) => token.type === 'fence')) {
                return codeBlock(tokens, idx, options, env, self);
            }
            // otherwise, highlight with default lang in env object.
            const highlighted: string = options.highlight(
                tokens[idx].content,
                env.lang,
                ''
            );
            return [
                `<pre><code ${self.renderAttrs(tokens[idx])} >`,
                highlighted || md.utils.escapeHtml(tokens[idx].content),
                '</code></pre>',
            ].join(os.EOL);
        };
    }

    private addImageUrlCompletion(md: MarkdownIt): void {
        const image: any = md.renderer.rules.image;
        // tslint:disable-next-line:typedef
        md.renderer.rules.image = (tokens, idx, options, env, self) => {
            const imageSrc: string[] | undefined = tokens[idx].attrs.find(
                (value: string[]) => value[0] === 'src'
            );
            if (env.host && imageSrc && imageSrc[1].startsWith('/')) {
                imageSrc[1] = `${env.host}${imageSrc[1]}`;
            }
            return image(tokens, idx, options, env, self);
        };
    }

    private addLinkValidator(md: MarkdownIt): void {
        const validateLink: (link: string) => boolean = md.validateLink;
        md.validateLink = (link: string): boolean => {
            // support file:// protocal link
            return validateLink(link) || link.startsWith('file:');
        };
    }
}

class MarkdownConfiguration {
    readonly extRoot: string; // root path of vscode built-in markdown extension
    readonly lineHeight: number;
    readonly fontSize: number;
    readonly fontFamily: string;

    constructor() {
        const markdownConfig: vscode.WorkspaceConfiguration
            = vscode.workspace.getConfiguration('markdown', null);
        this.extRoot = path.join(
            vscode.env.appRoot,
            'extensions',
            'markdown-language-features'
        );

        this.lineHeight = Math.max(
            0.6,
            +markdownConfig.get<number>('preview.lineHeight', NaN)
        );
        this.fontSize = Math.max(
            8,
            +markdownConfig.get<number>('preview.fontSize', NaN)
        );
        this.fontFamily = this.resolveFontFamily(markdownConfig);
    }

    private resolveFontFamily(config: vscode.WorkspaceConfiguration): string {
        let fontFamily: string = config.get<string>('preview.fontFamily', '');
        if (
            fontFamily === config.inspect<string>('preview.fontFamily')!.defaultValue
        ) {
            fontFamily = `${fontFamily}, 'Microsoft Yahei UI'`;
        }
        return fontFamily;
    }
}

export const markdownEngine: MarkdownEngine = new MarkdownEngine();
