import * as vscode from "vscode";
import { MipsyCompletionItemProvider } from "./completion";
import { MipsyDefinitionProvider, MipsyReferenceProvider } from "./definitions";
import { MipsyHoverProvider } from "./hover";
import { MipsySemanticTokensProvider, tokensLegend } from "./semanticTokens";
import * as commands from './commands';
import formatter from './formatter';

var languageID = "MIPS";
vscode.languages.registerHoverProvider(languageID, new MipsyHoverProvider());
vscode.languages.registerCompletionItemProvider(
    languageID,
    new MipsyCompletionItemProvider(),
    ...MipsyCompletionItemProvider.triggerCharacters
);
vscode.languages.registerDefinitionProvider(languageID, new MipsyDefinitionProvider());
vscode.languages.registerReferenceProvider(languageID, new MipsyReferenceProvider());
vscode.languages.registerDocumentSemanticTokensProvider(languageID, new MipsySemanticTokensProvider(), tokensLegend);

export function activate(context: vscode.ExtensionContext) {
    commands.registerCommands(context);
    vscode.languages.registerDocumentFormattingEditProvider(languageID, {
        provideDocumentFormattingEdits: formatter
    });
}
export function deactivate() { }
