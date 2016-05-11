/* @flow */

export type TokenSubject = string|Function|Object;
export type TokenizerParams = {[id: string]: TokenSubject};
export type TranslateArgs = {[id: string]: string};
export type Translate = (
    message: string,
    params: TranslateArgs
) => string;

export type TokenizedTranslate = (message: string, params: TokenizerParams) => Array<TokenSubject>|string;
export type NeedTranslate = (locale: string, message: string) => void;

export type Translator = {
    add(phrases: Object): void;
    translate(message: string, params: TranslateArgs): string;
    has(message: string): boolean;
}

export type CreateTranslator = (
    locale: string,
    phrases: Object,
    needTranslate?: NeedTranslate
) => Translator;
